const THUMBNAIL_SERVER_URI = "https://thumb.pipl.com/image";
const THUMBNAILS = {
  height: 100,
  width: 100
};

export interface IServiceOptions {
  onInvalidCredentials: Function;
}

/**
 * Helper types that make it easier to just copy and paste from Readme documentation
 */

type String = string;
type GUID = string;
type DateString = string;
type Boolean = boolean;
type Float = number;
type Integer = number;

/**
 * Abstract types
 */

/**
 * @link https://docs.pipl.com/v5.0/reference#response
 */
abstract class Response {
  protected constructor(data: Partial<Response> = {}) {
    Object.assign(this, data);
  }
}

/**
 * Constants
 */

export enum Category {
  personal_profiles = "personal_profiles", // facebook.com, pinterest.com, last.fm.
  media = "media", // picasa.com, flickr.com, youtube.com
  professional_and_business = "professional_and_business", // linkedin.com, spoke.com, zoominfo.com
  public_records = "public_records", // bop.gov, archives.com, ancestry.com
  publications = "publications", // uspto.gov, portal.acm.org, scirus.com
  school_and_classmates = "school_and_classmates", // classmates.com, reunion.com, schoolbank.nl
  email_address = "email_address", // intelius.com, spokeo.com
  background_reports = "background_reports", // peoplefinders.com intelius.com peoplesmart.com
  contact_details = "contact_details", // whitepages.com, addresses.com, anywho.com
  web_pages = "web_pages" // Default category, for sources that don't match any of the above categories.
}

export enum SocialServices {
  facebook = "facebook",
  linkedin = "linkedin",
  twitter = "twitter",
  myspace = "myspace",
  foursquare = "foursquare",
  ebay = "ebay",
  google = "google",
  pinterest = "pinterest",
  instagram = "instagram",
  lastfm = "lastfm",
  flickr = "flickr",
  youtube = "youtube",
  digg_tagged = "digg tagged",
  hi5 = "hi5",
  weeworld = "weeworld",
  delicious = "delicious",
  hyves = "hyves",
  deviantart = "deviantart",
  douban = "douban",
  odnoklassniki = "odnoklassniki",
  quora = "quora",
  xanga = "xanga",
  mylife = "mylife",
  gaia = "gaia",
  stumbleupon = "stumbleupon",
  bebo = "bebo",
  livejournal = "livejournal",
  viadeo = "viadeo",
  ning = "ning",
  myheritage = "myheritage",
  qzone = "qzone",
  vkontakte = "vkontakte",
  flixster = "flixster",
  tumblr = "tumblr",
  myyearbook = "myyearbook",
  badoo = "badoo",
  habbo = "habbo",
  xing = "xing",
  sonico = "sonico",
  friendster = "friendster",
  meetup = "meetup",
  goodreads = "goodreads",
  classmates = "classmates",
  renren = "renren",
  cyworld = "cyworld",
  netlog = "netlog",
  soundcloud = "soundcloud",
  yelp = "yelp",
  orkut = "orkut",
  aboutme = "aboutme",
  flavorsme = "flavorsme",
  freelancer = "freelancer",
  gravatar = "gravatar",
  imgur = "imgur",
  github = "github",
  CPF = "CPF"
}

/**
 * Concrete types
 */

export interface ISearchConfigurationParams {
  email?: String; // Ex: clark.kent@example.com - Email address
  phone?: String; // Ex: +1 (999) 888-777 - Home/work/mobile phone number. We'll try to parse the number using https://github.com/google/libphonenumber.
  username?: String; // Ex: superman - Username/screen-name, minimum 3 characters. There's an advanced option to search by username or user-id at a specific service like superman@facebook.
  user_id?: String; // Ex: 11231@facebook - Unique ID in a supported service, must include the service name.
  url?: String; // Ex: https://www.linkedin.com/pub/superman/20/7a/365 - Profile URL in a supported service. This URL will be parsed to a username or user_id object.
  first_name?: String; // Ex: Clark - First name, minimum 2 characters.
  last_name?: String; // Ex: Kent - Last name, minimum 2 characters.
  middle_name?: String; // Ex: Joseph - Middle name or middle initial.
  raw_name?: String; // Ex: Clark Joseph Kent - Full Name. Use this parameter if the accurate name parts (first/middle/last) are not available, this parameter will only be used in absence of first_name and last_name.
  country?: String; // Ex: US - A two-letter, Alpha-2 ISO-3166 country code.
  state?: String; // Ex: KS - A United States, Canada, Great Britain or Australia state code. If a US state is provided and no country specified, we'll assume the country to be US.
  city?: String; // Ex: Smallville - City.
  street?: String; // Ex: Hickory Lane - Street.
  house?: String; // Ex: 10 - House number.
  zipcode?: String; // Ex: 66605 - ZIP Code.
  raw_address?: String; // Ex: 10-1 Hickory Lane, Smallville, Kansas - Full Address. Use this parameter if the accurate address parts (country/state/city…) are not available.
  age?: String; // Ex: 26-29 - String, an exact (YY) or approximate (YY-YY) age.
  // key: String; // Default: null - Your API key, this is our way to identify you and authorize your call.
  pretty?: Boolean; // Default: true - Indicates whether you want the response to be “pretty-printed” (with indentation).
  minimum_probability?: Float; // Default: 0.9 - 0 – 1. The minimum acceptable probability for inferred data.
  infer_persons?: Boolean; // Default: false - whether the API should return persons made up solely from data inferred by statistical analysis from your search query.
  minimum_match?: Float; // Default: 0.0 - 0 – 1. The minimum required match score for possible persons to be returned.
  show_sources?: String; // Default: false - true/false/all/matching. all - all sources are shown. matching or true - only sources from the person. false - don't show sources.
  hide_sponsored?: Boolean; // Default: false - Whether to omit results marked "sponsored" (when additional data from this source is available behind a website paywall).
  live_feeds?: Boolean; // Default: true - Whether to use live data sources.
  match_requirements?: String; // Default: none - A condition to specify what fields you must get back. Responses not meeting the criteria will return empty and won't be charged.
  source_category_requirements?: String; // Default: none - A condition to specify what source categories you must get back. Responses with no persons that meet the criteria will return empty and won't be charged.
  callback?: String; // Default: none - For JSONP support in JavaScript applications. Only alphanumeric characters and underscores are allowed
  top_match?: Boolean; // Default: false - "top_match=true" returns the best high-ranking Person match to your search. The API will only return a highly probable Person OR a No Match (when no highly probable profile is found). It never returns a Possible Persons' response. For more details, click here.
}

export interface IPersonCall {
  "@id"?: GUID;
  names?: Partial<Name>[];
  emails?: Partial<Email>[];
  usernames?: Partial<Username>[];
  phones?: Partial<Phone>[];
  gender?: Partial<Gender>;
  dob?: Partial<DOB>;
  languages?: Partial<Language>[];
  ethnicities?: Partial<Ethinicity>[];
  origin_countries?: Partial<OriginCountry>[];
  addresses?: Partial<Address>[];
  jobs?: Partial<Job>[];
  educations?: Partial<Education>[];
  relationships?: Partial<Relationship>[];
  user_ids?: Partial<UserID>[];
  images?: Partial<Image>[];
  urls?: Partial<Url>[];
}

export class SearchResponse extends Response {
  public "@http_status_code": Integer = 0; // The HTTP status code of the response. Successful calls will be 200.
  public "@visible_sources": Integer = 0; // The number of sources returned in the sources array (if show_sources is not false).
  public "@available_sources": Integer = 0; // The number of sources we know of that are relevant to the search.
  public "@persons_count": Integer = 0; // The number of persons returned in this API response
  public "@search_id": String = ""; // An internal ID which identifies the search on our systems. Useful for debugging.
  public query: Partial<Person> = {}; // A person object representing your search parameters. Useful to see how we understood your search
  public match_requirements: String = ""; // The canonical way to express the match requirement you've sent. Useful to see how we've parsed your criteria.
  public available_data: AvailableData = new AvailableData(); // An available_data object. A summary of the data we have for this search.
  public error: String = ""; // An error message, explaining an error that prevented your search from being run.
  public warnings: string[] = []; // An array of warning strings.
  public person?: Person; // A person object containing the data about the person you are searching for - if a single person was matched to your query.
  public possible_persons?: Person[]; // An array of person objects containing possible matches.
  public sources: string[] = []; // An array of source objects, in case you need to see where the data came from.

  constructor(data: Partial<SearchResponse> = {}) {
    super(data);
    Object.assign(this, data);
    this.query = data.query ? new Person(data.query) : this.query;
    this.available_data = data.available_data
      ? new AvailableData(data.available_data)
      : this.available_data;
    this.person = data.person ? new Person(data.person) : this.person;
    this.possible_persons = data.possible_persons
      ? data.possible_persons.map(person => new Person(person))
      : this.possible_persons;
  }
}

/**
 * @link https://docs.pipl.com/v5.0/reference#available-data
 *
 * This is a summary of the data available for your search. Please note that
 * some available data may not be present in the response due to data package limits.
 * The available data contains two sub-elements, basic and premium (if you're on premium,
 * basic will be None)
 */
export class AvailableData {
  premium?: FieldCount;
  basic?: FieldCount;

  constructor(data: Partial<AvailableData> = {}) {
    this.premium = data.premium ? new FieldCount(data.premium) : this.premium;
    this.basic = data.basic ? new FieldCount(data.basic) : this.basic;
  }
}

/**
 * @link https://docs.pipl.com/v5.0/reference#field-count
 */
export class FieldCount {
  public emails: Integer = 0; // The sum of emails.
  public relationships: Integer = 0; // The sum of relationships.
  public usernames: Integer = 0; // The sum of usernames.
  public user_ids: Integer = 0; // The sum of user ids.
  public jobs: Integer = 0; // The sum of jobs.
  public addresses: Integer = 0; // The sum of addresses.
  public ethnicities: Integer = 0; // The sum of ethnicities.
  public phones: Integer = 0; // The sum of both mobile and landline phones.
  public mobile_phones: Integer = 0; // The sum of mobile phones
  public landline_phones: Integer = 0; // The sum of landline (non-mobile) phones.
  public educations: Integer = 0; // The sum of educations.
  public languages: Integer = 0; // The sum of languages.
  public social_profiles: Integer = 0; // The sum of social profile sources.
  public names: Integer = 0; // The sum of names.
  public dobs: Integer = 0; // The sum of dates of birth.
  public images: Integer = 0; // The sum of images.
  public genders: Integer = 0; // The sum of genders.
  public origin_countries: Integer = 0; // The sum of origin countries.

  constructor(data: Partial<FieldCount> = {}) {
    Object.assign(this, data);
  }
}

/**
 * @link https://docs.pipl.com/v5.0/reference#person
 */
export class Person {
  public "@id"?: GUID; // An identifier of this person in this response. To be used in conjunction with @person_id in the Source object. Only shown if the response includes a single person object.
  public "@inferred"?: Boolean; // Whether this person is made up solely from data inferred by statistical analysis from your search query. You can control inference using the minimum_probability parameter, and inference of persons using the infer_persons parameter.
  public "@search_pointer": String = ""; // A special string crafted by the API for follow up searches.
  public "@match": Float = 0; // 0-1. The level of confidence we have that this is the person you're looking for.
  public names: Name[] = []; // Array of names
  public emails: Email[] = []; // Array of emails
  public usernames: Username[] = []; // Array of usernames
  public phones: Phone[] = []; // Array of phones
  public gender?: Gender; // A gender object
  public dob?: DOB; // A date of birth object
  public languages: Language[] = []; // Array of languages
  public ethnicities: Ethinicity[] = []; // Array of ethinicities
  public origin_countries: OriginCountry[] = []; // Array of origin countries
  public addresses: Address[] = []; // Array of addresses
  public jobs: Job[] = []; // Array of jobs
  public educations: Education[] = []; // Array of educations
  public relationships: Relationship[] = []; // Array of relationships
  public user_ids: UserID[] = []; // Array of user ids
  public images: Image[] = []; // Array of images
  public urls: Url[] = []; // Array of urls

  constructor(data: Partial<Person> = {}) {
    Object.assign(this, data);

    this.names = data.names ? data.names.map(v => new Name(v)) : this.names;
    this.emails = data.emails
      ? data.emails.map(v => new Email(v))
      : this.emails;
    this.usernames = data.usernames
      ? data.usernames.map(v => new Username(v))
      : this.usernames;
    this.phones = data.phones
      ? data.phones.map(v => new Phone(v))
      : this.phones;
    this.gender = data.gender ? new Gender(data.gender) : this.gender;
    this.dob = data.dob ? new DOB(data.dob) : this.dob;
    this.languages = data.languages
      ? data.languages.map(v => new Language(v))
      : this.languages;
    this.ethnicities = data.ethnicities
      ? data.ethnicities.map(v => new Ethinicity(v))
      : this.ethnicities;
    this.origin_countries = data.origin_countries
      ? data.origin_countries.map(v => new OriginCountry(v))
      : this.origin_countries;
    this.addresses = data.addresses
      ? data.addresses.map(v => new Address(v))
      : this.addresses;
    this.jobs = data.jobs ? data.jobs.map(v => new Job(v)) : this.jobs;
    this.educations = data.educations
      ? data.educations.map(v => new Education(v))
      : this.educations;
    this.relationships = data.relationships
      ? data.relationships.map(v => new Relationship(v))
      : this.relationships;
    this.user_ids = data.user_ids
      ? data.user_ids.map(v => new UserID(v))
      : this.user_ids;
    this.images = data.images
      ? data.images.map(v => new Image(v))
      : this.images;
    this.urls = data.urls ? data.urls.map(v => new Url(v)) : this.urls;
  }

  public getFirstName(): string {
    return this.names[0]?.first ?? "";
  }

  public getLastName(): string {
    return this.names[0]?.last ?? "";
  }

  public getDisplayName(): string {
    return this.names[0]?.display ?? "";
  }

  public getGender(): string {
    return this.gender?.content ?? "";
  }

  public getAge(): string {
    return this.dob?.display ?? "";
  }

  public getDisplayJob(): string {
    return this.jobs[0]?.display ?? "";
  }

  public getDisplayAddress(): string {
    return this.addresses[0]?.display;
  }

  public getImageUrl(): string {
    return this.images[0]?.url ?? "";
  }

  public getThumbnailTokens(): string[] | undefined {
    return this.images?.map(image => image.thumbnail_token);
  }

  public getThumbnailUrl(params: IThumbnailUrlCallParams = { height: 200, width: 200 }): string {
    params.tokens = this.getThumbnailTokens();
    const urlParameters: string = Object.keys(params)
        .map(key => {
          // @ts-ignore
          const value: string = params[key];
          return value ? `${key}=${value}` : "";
        })
        .join("&");
    return THUMBNAIL_SERVER_URI + "?" + urlParameters;
  }
}

/**
 * @link https://docs.pipl.com/v5.0/reference#source
 */
export class Source {
  public "@id": String = ""; // Unique identifier of this source in our systems. Useful for debugging
  public "@name": String = ""; // Data Source name.
  public "@category": Category; // Data Source category.
  public "@domain": String = ""; // Data Source domain.
  public "@person_id": GUID = ""; // The id of the person this source belongs to.
  public "@sponsored"?: Boolean; // Indicating whether additional data from this source is available behind a website paywall. Omitted if false.
  public "@origin_url": String = ""; // The url of the web page holding this information. Only shown if the data is available online.
  public "@match": Float = 0; // 0-1. The match score of the person this source belongs to.
  public "@premium"?: Boolean; // Whether this is a premium data source. Omitted if false.
  public names: Name[] = []; // Array of names
  public emails: Email[] = []; // Array of emails
  public usernames: Username[] = []; // Array of usernames
  public phones: Phone[] = []; // Array of phones
  public gender: Gender = new Gender(); // A gender object
  public dob: DOB = new DOB(); // A date of birth object
  public languages: Language[] = []; // Array of languages
  public ethnicities: Ethinicity[] = []; // Array of ethinicities
  public origin_countries: OriginCountry[] = []; // Array of origin countries
  public addresses: Address[] = []; // Array of addresses
  public jobs: Job[] = []; // Array of jobs
  public educations: Education[] = []; // Array of educations
  public relationships: Relationship[] = []; // Array of relationships
  public user_ids: UserID[] = []; // Array of user ids
  public images: Image[] = []; // Array of images
  public urls: Url[] = []; // Array of urls
  public tags: Tag[] = []; // Array of urls

  constructor(data: Partial<Source> = {}) {
    Object.assign(this, data);

    this.names = data.names ? data.names.map(v => new Name(v)) : this.names;
    this.emails = data.emails
      ? data.emails.map(v => new Email(v))
      : this.emails;
    this.usernames = data.usernames
      ? data.usernames.map(v => new Username(v))
      : this.usernames;
    this.phones = data.phones
      ? data.phones.map(v => new Phone(v))
      : this.phones;
    this.gender = data.gender ? new Gender(data.gender) : this.gender;
    this.dob = data.dob ? new DOB(data.dob) : this.dob;
    this.languages = data.languages
      ? data.languages.map(v => new Language(v))
      : this.languages;
    this.ethnicities = data.ethnicities
      ? data.ethnicities.map(v => new Ethinicity(v))
      : this.ethnicities;
    this.origin_countries = data.origin_countries
      ? data.origin_countries.map(v => new OriginCountry(v))
      : this.origin_countries;
    this.addresses = data.addresses
      ? data.addresses.map(v => new Address(v))
      : this.addresses;
    this.jobs = data.jobs ? data.jobs.map(v => new Job(v)) : this.jobs;
    this.educations = data.educations
      ? data.educations.map(v => new Education(v))
      : this.educations;
    this.relationships = data.relationships
      ? data.relationships.map(v => new Relationship(v))
      : this.relationships;
    this.user_ids = data.user_ids
      ? data.user_ids.map(v => new UserID(v))
      : this.user_ids;
    this.images = data.images
      ? data.images.map(v => new Image(v))
      : this.images;
    this.urls = data.urls ? data.urls.map(v => new Url(v)) : this.urls;
    this.tags = data.tags ? data.tags.map(v => new Tag(v)) : this.tags;
  }
}

/**
 * @link https://docs.pipl.com/v5.0/reference#data-fields
 */
export abstract class DataField {
  public "@valid_since": DateString = ""; // The date we were first aware of the data in this field. Format is YYYY-MM-DD.
  public "@last_seen"?: DateString; // The date we last saw the data in this field. Format is YYYY-MM-DD.
  public "@current"?: Boolean; // A Boolean indication whether this field holds data valid at the time of the request. Can be True, False, or omitted if unknown.
  public "@inferred"?: Boolean; // A Boolean indication whether this field was inferred using statistical analysis or was explicitly found in one of our data sources. Omitted if false.

  protected constructor(data: Partial<DataField> = {}) {
    Object.assign(this, data);
  }

  public getValidSinceDate(): Date {
    if (!this["@valid_since"]) {
      throw new Error("Valid since date unavailable");
    }

    return new Date(this["@valid_since"]);
  }

  public getLastSeenDate(): Date {
    if (!this["@last_seen"]) {
      throw new Error("Last seen date unavailable");
    }

    return new Date(this["@last_seen"]);
  }
}

type NameType = "present" | "maiden" | "former" | "alias";

/**
 * @link https://docs.pipl.com/v5.0/reference#name
 */
export class Name extends DataField {
  public "@type": NameType = "present";
  public first: String = ""; // First name.
  public middle: String = ""; // Middle name or middle initial.
  public last: String = ""; // Last name.
  public prefix: String = ""; // A person's title.
  public suffix: String = ""; // Additional information about a person.
  public raw: String = ""; // An unparsed person's full name. Request only.
  public display: String = ""; // The full name for display purposes. Response only.

  constructor(data: Partial<Name> = {}) {
    super(data);
    Object.assign(this, data);
  }
}

type AddressType = "home" | "work" | "old";

/**
 * @link https://docs.pipl.com/v5.0/reference#address
 */
export class Address extends DataField {
  public "@type": AddressType = "home";
  public country: String = ""; // Alpha-2 ISO 3166 country code
  public state: String = ""; // 2 letters state code, if country is one of US, Canada or Brazil. 3 letters state code if country is Australia or UK.
  public city: String = ""; // City name
  public street: String = ""; // Street name
  public house: String = ""; // House number
  public apartment: String = ""; // Apartment number
  public zip_code: String = ""; // Postal zip code
  public po_box: String = ""; // Post Office box number
  public raw: String = ""; // An unparsed full address. Request only.
  public display: String = ""; // The full address for display purposes. Response only.

  constructor(data: Partial<Address> = {}) {
    super(data);
    Object.assign(this, data);
  }
}

/**
 * Landline phones are available in all plans, mobile phones in the BUSINESS plan only.
 */
type PhoneType =
  | "mobile"
  | "home_phone"
  | "home_fax"
  | "work_phone"
  | "work_fax"
  | "pager";

/**
 * @link https://docs.pipl.com/v5.0/reference#phone
 */
export class Phone extends DataField {
  public "@type"?: PhoneType;
  // When the indicator is marked as true, this indicates that the US phone number is listed in the National Do Not Call Registry and should not to be contacted for telemarketing purposes.
  // This indicator can be used solely for the purpose of complying with the US law for preventing phone calls to numbers listed on the DNC list.
  // We constantly update the DNC registry to be current, this indication should only be used at the same day the API response was received.
  public "@do_not_call": Boolean = false;
  public country_code: Integer = 0; // International call country code. See ITU-T Recommendation E.164
  public number: Integer = 0; // Phone number.
  public extension: Integer = 0; // Extension.
  public raw: String = ""; // An unparsed phone. Request only.
  public display: String = ""; // The full national phone for display purposes. Response only.
  public display_international: String = ""; // The full international phone for display purposes. Response only.

  constructor(data: Partial<Phone> = {}) {
    super(data);
    Object.assign(this, data);
  }
}

type EmailType = "personal" | "work";

/**
 * @link https://docs.pipl.com/v5.0/reference#email
 * Available only in the BUSINESS plan.
 */
export class Email extends DataField {
  public "@type"?: EmailType = "personal";
  public address: String = ""; // Valid email address in simple form. No brackets of any kind.
  public address_md5: String = ""; // MD5 hash of the address.
  public "@disposable"?: Boolean; // Whether this is a disposable email (for example guerillamail.com). Response only. Omitted if false.
  public "@email_provider": Boolean = false; // Whether this email came from a public provider (such as gmail.com). Response only.

  public static getEmailMd5(email: string) {
    // The entire email should be in lowercase.
    const lowerEmail = email.toLowerCase();
    // If the username contains a plus (+) character, remove it and any trailing character (so clark.kent+something@example.com will become clark.kent@example.com).
    const [rootEmail] = lowerEmail.split("+");
    // For Gmail addresses only:
    //     If the email domain ends with "googlemail.com", replace this with "gmail.com".
    //     Remove any dots in the username.
    return rootEmail.replace("googlemail.com", "gmail.com");
  }

  constructor(data: Partial<Email> = {}) {
    super(data);
    Object.assign(this, data);
    this.address_md5 = Email.getEmailMd5(data.address);
  }
}

/**
 * @link https://docs.pipl.com/v5.0/reference#username
 * Available only in the SOCIAL plan and up.
 */
export class Username extends DataField {
  // A username search allows for an optional @service suffix similar to the User ID format.
  // The format to be used is username@service, for example superman@facebook.
  // See User ID for a list of known services.
  // By prefixing a username with an @ symbol, the service is considered to be twitter, for example @superman.
  public content: String = ""; // A person's username at one or more online service.

  constructor(data: Partial<Username> = {}) {
    super(data);
    Object.assign(this, data);
  }
}

/**
 * @link https://docs.pipl.com/v5.0/reference#user-id
 * Available only in the SOCIAL plan and up.
 */
export class UserID extends DataField {
  public content: String = ""; // A person's user id in the format of user_id@service.

  constructor(data: Partial<UserID> = {}) {
    super(data);
    Object.assign(this, data);
  }
}

/**
 * @link https://docs.pipl.com/v5.0/reference#date-of-birth
 */
export class DOB extends DataField {
  public date_range: DateRange = new DateRange(); // See Date Range for more details.
  public display: String = ""; // The person's estimated age represented by this DOB for display purposes. For example, '47 years old'. If age > 80 the format is 'Born 1927'. Response only.

  constructor(data: Partial<DOB> = {}) {
    super(data);
    Object.assign(this, data);
    this.date_range = data.date_range
      ? new DateRange(data.date_range)
      : this.date_range;
  }
}

/**
 * @link https://docs.pipl.com/v5.0/reference#image
 * Available only in the SOCIAL plan and up.
 */
export class Image extends DataField {
  public url: String = ""; // Image URL
  public thumbnail_token: String = ""; // A special token that can be used with our thumbnail server.

  constructor(data: Partial<Image> = {}) {
    super(data);
    Object.assign(this, data);
  }

  public getThumbnailUrl(
    params: Omit<IThumbnailUrlCallParams, "token" | "tokens"> = {
      width: THUMBNAILS.width,
      height: THUMBNAILS.height
    }
  ): string {
    const urlParameters: string = Object.keys(params)
      .map(key => {
        // @ts-ignore
        const value: string = params[key];
        return value ? `${key}=${value}` : "";
      })
      .join("&");
    return (
      THUMBNAIL_SERVER_URI +
      "?" +
      urlParameters +
      `&token=${this.thumbnail_token}`
    );
  }
}

export interface IThumbnailUrlCallParams {
  token?: String; // The thumbnail token. Send as is, do not url-encode it.
  tokens?: String[]; // Two thumbnail tokens, separated by a comma. Either this or the token parameter is required.
  height: Integer; // Height in pixels. Integer between 100-500.
  width: Integer; // Width in pixels. Integer between 100-500.
  favicon?: Boolean; // Whether to show favicon.
  zoom_face?: Boolean; // Whether to enable face zoom.
}

/**
 * @link https://docs.pipl.com/v5.0/reference#job
 * Available only in the BUSINESS plan.
 */
export class Job extends DataField {
  public title: String = ""; // Job title
  public organization: String = ""; // The name of the employing organization
  public industry: String = ""; // The employing organization industry
  public date_range: DateRange = new DateRange(); // Period of employment. Date ranges might be partial to designate current job or an unknown start date. See Date Range for more details.
  public display: String = ""; // The full job headline for display purposes. Response only.

  constructor(data: Partial<Job> = {}) {
    super(data);
    Object.assign(this, data);
    this.date_range = data.date_range
      ? new DateRange(data.date_range)
      : this.date_range;
  }
}

/**
 * @link https://docs.pipl.com/v5.0/reference#education
 * Available only in the BUSINESS plan.
 */
export class Education extends DataField {
  public degree: String = ""; // Degree. B.Sc, PhD, etc…
  public school: String = ""; // Name of the educational institute.
  public date_range: DateRange = new DateRange(); // Period of study. Date ranges might be partial to designate current study or an unknown start date. See Date Range for more details.
  public display: String = ""; // The full degree headline for display purposes. Response only.

  constructor(data: Partial<Education> = {}) {
    super(data);
    Object.assign(this, data);
    this.date_range = data.date_range
      ? new DateRange(data.date_range)
      : this.date_range;
  }
}

type GenderType = "male" | "female" | "";

/**
 * @link https://docs.pipl.com/v5.0/reference#gender
 */
export class Gender extends DataField {
  public content: GenderType = ""; // Either one of 'male' or 'female'. No default value

  constructor(data: Partial<Gender> = {}) {
    super(data);
    Object.assign(this, data);
  }
}

/**
 * @link https://docs.pipl.com/v5.0/reference#ethinicity
 */
export class Ethinicity extends DataField {
  public content: String = "";

  constructor(data: Partial<Ethinicity> = {}) {
    super(data);
    Object.assign(this, data);
  }
}

/**
 * @link https://docs.pipl.com/v5.0/reference#language
 */
export class Language extends DataField {
  public language: String = ""; // A 2-letter language code
  public region: String = ""; // Country code
  public display: String = ""; // The representation of this language (for example “en_US”)

  constructor(data: Partial<Language> = {}) {
    super(data);
    Object.assign(this, data);
  }
}

/**
 * @link https://docs.pipl.com/v5.0/reference#origin-country
 */
export class OriginCountry extends DataField {
  public country: String = ""; // A country code.

  constructor(data: Partial<OriginCountry> = {}) {
    super(data);
    Object.assign(this, data);
  }
}

/**
 * @link https://docs.pipl.com/v5.0/reference#relationship
 * Available only in the SOCIAL plan and up.
 * This field is a bit different as it is basically a short descriptor of another person
 */
type RelationshipType = "work" | "family" | "friend" | "other";
export class Relationship extends DataField {
  public "@type": RelationshipType = "friend"; // Either one of 'work', 'family', 'friend' or 'other'. Default is 'friend'
  public "@subtype": String = ""; // A free text providing further info on the association. For example, Father.
  public names: Name[] = []; // Array of names
  public emails: Email[] = []; // Array of emails
  public usernames: Username[] = []; // Array of usernames
  public phones: Phone[] = []; // Array of phones
  public gender: Gender = new Gender(); // A gender object
  public dob: DOB = new DOB(); // A date of birth object
  public languages: Language[] = []; // Array of languages
  public ethnicities: Ethinicity[] = []; // Array of ethinicities
  public origin_countries: OriginCountry[] = []; // Array of origin countries
  public addresses: Address[] = []; // Array of addresses
  public jobs: Job[] = []; // Array of jobs
  public educations: Education[] = []; // Array of educations
  public relationships: Relationship[] = []; // Array of relationships
  public user_ids: UserID[] = []; // Array of user ids
  public images: Image[] = []; // Array of images

  constructor(data: Partial<Relationship> = {}) {
    super(data);
    Object.assign(this, data);

    this.names = data.names ? data.names.map(v => new Name(v)) : this.names;
    this.emails = data.emails
      ? data.emails.map(v => new Email(v))
      : this.emails;
    this.usernames = data.usernames
      ? data.usernames.map(v => new Username(v))
      : this.usernames;
    this.phones = data.phones
      ? data.phones.map(v => new Phone(v))
      : this.phones;
    this.gender = data.gender ? new Gender(data.gender) : this.gender;
    this.dob = data.dob ? new DOB(data.dob) : this.dob;
    this.languages = data.languages
      ? data.languages.map(v => new Language(v))
      : this.languages;
    this.ethnicities = data.ethnicities
      ? data.ethnicities.map(v => new Ethinicity(v))
      : this.ethnicities;
    this.origin_countries = data.origin_countries
      ? data.origin_countries.map(v => new OriginCountry(v))
      : this.origin_countries;
    this.addresses = data.addresses
      ? data.addresses.map(v => new Address(v))
      : this.addresses;
    this.jobs = data.jobs ? data.jobs.map(v => new Job(v)) : this.jobs;
    this.educations = data.educations
      ? data.educations.map(v => new Education(v))
      : this.educations;
    this.relationships = data.relationships
      ? data.relationships.map(v => new Relationship(v))
      : this.relationships;
    this.user_ids = data.user_ids
      ? data.user_ids.map(v => new UserID(v))
      : this.user_ids;
    this.images = data.images
      ? data.images.map(v => new Image(v))
      : this.images;
  }

  public getFirstName(): string {
    return this.names[0]?.first ?? "";
  }

  public getLastName(): string {
    return this.names[0]?.last ?? "";
  }

  public getDisplayName(): string {
    return this.names[0]?.display ?? "";
  }

  public getImageUrl(): string {
    return this.images[0]?.url ?? "";
  }

  public getThumbnailTokens(): string[] | undefined {
    return this.images?.map(image => image.thumbnail_token);
  }
}

/**
 * @link https://docs.pipl.com/v5.0/reference#url
 * Available only in the SOCIAL plan and up.
 */
export class Url extends DataField {
  public "@source_id": String = ""; // The source ID (if this URL is a source of data)
  public "@domain": String = ""; // The domain
  public "@name": String = ""; // The site name.
  public "@category"?: Category;
  public url: String = ""; // The actual URL
  public "@sponsored"?: Boolean; // Indicating whether additional data from this source is available behind a website paywall. Omitted if false.

  constructor(data: Partial<Url> = {}) {
    super(data);
    Object.assign(this, data);
  }
}

/**
 * A general purpose field, holds any meaningful text that's related to the person.
 * Used for holding data about the person that either couldn't be clearly classified or was classified as something different than the above fields.
 * Please note, tags are only available within Source objects (not persons).
 */
export class Tag extends DataField {
  public "@classification": String = ""; // What the content is representing.
  public content: String = ""; // The text.

  constructor(data: Partial<Tag> = {}) {
    super(data);
    Object.assign(this, data);
  }
}

/**
 * @link https://docs.pipl.com/v5.0/reference#date-range
 */
export class DateRange {
  public start: String = ""; // Start date of this range in 'YYYY-MM-DD' format.
  public end: String = ""; // End date of this range in 'YYYY-MM-DD' format.

  constructor(data: Partial<DateRange> = {}) {
    Object.assign(this, data);
  }

  getDates(): { start?: Date; end?: Date } {
    return {
      start: this.start ? new Date(this.start) : undefined,
      end: this.end ? new Date(this.end) : undefined
    };
  }
}
