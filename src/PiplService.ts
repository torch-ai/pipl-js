import qs from "qs";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from "axios";
import { TIMINGS } from "./constants";
import {
  IPersonCall,
  ISearchConfigurationParams,
  IServiceOptions,
  IThumbnailUrlCallParams,
  SearchResponse
} from "./PiplServiceTypes";

export default class PiplService {
  protected static SERVER_URI = "https://api.pipl.com";
  protected static ENDPOINT_SEARCH = PiplService.SERVER_URI + "/search";

  protected static THUMBNAIL_SERVER_URI = "https://thumb.pipl.com/image";

  protected static DEFAULT_TIMEOUT = TIMINGS.defaultTimeout;

  protected apiKey: string = "";
  protected client: AxiosInstance;
  protected options: IServiceOptions = {
    onInvalidCredentials: () => {}
  };

  public static getThumbnailUrl(params: IThumbnailUrlCallParams): string {
    const urlParameters: string = Object.keys(params)
      .map(key => {
        // @ts-ignore
        const value: string = params[key];
        return value ? `${key}=${value}` : "";
      })
      .join("&");
    return PiplService.THUMBNAIL_SERVER_URI + "?" + urlParameters;
  }

  public constructor(apiKey: string, options: Partial<IServiceOptions> = {}) {
    this.apiKey = apiKey;
    this.setOptions(options);
    this.client = axios.create({
      baseURL: PiplService.SERVER_URI,
      timeout: PiplService.DEFAULT_TIMEOUT
    });

    // Bind to incoming requests
    this.client.interceptors.request.use(this.onRequest.bind(this));
    // Bind to responses
    this.client.interceptors.response.use(
      this.onResponseSuccess.bind(this),
      this.onResponseError.bind(this)
    );
  }

  public setOptions(options: Partial<IServiceOptions>) {
    this.options = { ...this.options, ...options };
    return this;
  }

  /**
   * Modifies the original request adding authorization if required.
   */
  protected onRequest(
    originalRequest: AxiosRequestConfig
  ): Promise<AxiosRequestConfig> {
    return new Promise((resolve, reject) => {
      this.addAuthorization(originalRequest)
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Provides success response handling
   */
  protected onResponseSuccess(response: AxiosResponse): Promise<AxiosResponse> {
    return Promise.resolve(response);
    // A hook for interacting with responses if required.
    // return new Promise((resolve, reject) => {
    //     resolve(response);
    // });
  }

  /**
   * Provides failure response handling
   */
  protected onResponseError(error: AxiosError) {
    return new Promise((resolve, reject) => {
      if (error.response && error.response.status === 401) {
        this.options.onInvalidCredentials();
      }
      reject(error);
    });
  }

  /**
   * Middleware
   */

  /**
   * Provides a method for adding authorization to any outbound requests.
   * This is currently not required as operations execute from within the private network.
   *
   * @param originalRequest
   */
  protected async addAuthorization(
    originalRequest: AxiosRequestConfig
  ): Promise<AxiosRequestConfig> {
    return new Promise(async (resolve, reject) => {
      if (originalRequest.method.toLowerCase() === "get") {
        originalRequest.params = originalRequest.params || {};
        originalRequest.params.key = this.apiKey;
      }

      resolve(originalRequest);
    });
  }

  /**
   * @link https://docs.pipl.com/v5.0/reference#using-search-parameters
   * @param params
   *
   * The golden rule: The more you provide, the better the response.
   */
  public search(
    params: ISearchConfigurationParams = {}
  ): Promise<SearchResponse> {
    return this.client
      .get(PiplService.ENDPOINT_SEARCH, { params })
      .then(response => new SearchResponse(response.data));
  }

  /**
   * @link https://docs.pipl.com/v5.0/reference#full-person
   * @param person
   *
   * The person search allows you to search with multiple data fields of the same type,
   * and also components that are not available in the basic search parameters search.
   * Let’s say, for example, you want to search for a person for which you have two addresses:
   *   Metropolis, KS and Smallville, KS.
   * Using the simple search, you can’t do that.
   * For this kind of situations we allow you to search by a fully fledged person object.
   *
   * The golden rule: The more you provide, the better the response.
   */
  public searchByPerson(person: IPersonCall): Promise<SearchResponse> {
    return this.client
      .get(PiplService.ENDPOINT_SEARCH, {
        params: {
          person: JSON.stringify(person)
        }
      })
      .then(response => new SearchResponse(response.data));
  }

  /**
   * @param searchPointer
   */
  public getBySearchPointer(searchPointer: string): Promise<SearchResponse> {
    const data = {
      search_pointer: searchPointer,
      key: this.apiKey
    };

    return this.client
      .post(PiplService.ENDPOINT_SEARCH, qs.stringify(data))
      .then(response => new SearchResponse(response.data));
  }
}
