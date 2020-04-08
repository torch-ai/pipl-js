import dotenv from "dotenv";
import PiplService from "./PiplService";
import { TIMINGS } from "./constants";
import {
  Address,
  FieldCount,
  DataField,
  DOB,
  Education,
  Email,
  Ethinicity,
  Gender,
  Image,
  Job,
  Language,
  Name,
  OriginCountry,
  Person,
  Phone,
  Relationship,
  SearchResponse,
  Url,
  UserID,
  Username,
  AvailableData,
  DateRange,
  IPersonCall
} from "./PiplServiceTypes";
import Axios from "axios";

/**
 * An instance of the service
 */
const onInvalidCredentials = jest.fn(() => {});

const expectAvailableData = (data: AvailableData) => {
  expect(data).toBeInstanceOf(AvailableData);
  if (data.premium) {
    expectFieldCount(data.premium);
  }
  if (data.basic) {
    expectFieldCount(data.basic);
  }
};

const expectFieldCount = (fieldCount: FieldCount) => {
  expect(fieldCount).toBeInstanceOf(FieldCount);
  expect(fieldCount.emails).toBeGreaterThanOrEqual(0);
  expect(fieldCount.relationships).toBeGreaterThanOrEqual(0);
  expect(fieldCount.usernames).toBeGreaterThanOrEqual(0);
  expect(fieldCount.user_ids).toBeGreaterThanOrEqual(0);
  expect(fieldCount.jobs).toBeGreaterThanOrEqual(0);
  expect(fieldCount.addresses).toBeGreaterThanOrEqual(0);
  expect(fieldCount.ethnicities).toBeGreaterThanOrEqual(0);
  expect(fieldCount.phones).toBeGreaterThanOrEqual(0);
  expect(fieldCount.mobile_phones).toBeGreaterThanOrEqual(0);
  expect(fieldCount.landline_phones).toBeGreaterThanOrEqual(0);
  expect(fieldCount.educations).toBeGreaterThanOrEqual(0);
  expect(fieldCount.languages).toBeGreaterThanOrEqual(0);
  expect(fieldCount.social_profiles).toBeGreaterThanOrEqual(0);
  expect(fieldCount.names).toBeGreaterThanOrEqual(0);
  expect(fieldCount.dobs).toBeGreaterThanOrEqual(0);
  expect(fieldCount.images).toBeGreaterThanOrEqual(0);
  expect(fieldCount.genders).toBeGreaterThanOrEqual(0);
  expect(fieldCount.origin_countries).toBeGreaterThanOrEqual(0);
};

const expectPerson = async (person: Person) => {
  expect(person).toBeInstanceOf(Person);
  expect(person["@search_pointer"]).toBeTruthy();
  expect(person["@match"]).toBeGreaterThanOrEqual(0);

  expect(person.getFirstName()).toBeTruthy();
  expect(person.getLastName()).toBeTruthy();
  expect(person.getDisplayName()).toBeTruthy();
  // expect(person.getDisplayAddress()).toBeTruthy(); // This isn't always here
  // expect(person.getDisplayJob()).toBeTruthy(); // This isn't always here
  // expect(person.getGender()).toBeTruthy(); // This isn't always here
  // expect(person.getAge()).toBeTruthy(); // This isn't always here
  expect(person.getImageUrl()).toBeTruthy();

  const name = person.names.shift();
  if (name) {
    expectFieldMetaData(name);
    expect(name).toBeInstanceOf(Name);
    expect(name.display).toBeTruthy();
    expect(name["@type"]).toBeTruthy();
  }

  const email = person.emails.shift();
  if (email) {
    expectFieldMetaData(email);
    expect(email).toBeInstanceOf(Email);
    expect(email.address).toBeTruthy();
    expect(email.address_md5).toBeTruthy();
    expect(email["@type"]).toBeTruthy();
  }

  const username = person.usernames.shift();
  if (username) {
    expectFieldMetaData(username);
    expect(username).toBeInstanceOf(Username);
    expect(username.content).toBeTruthy();
  }

  const phone = person.phones.shift();
  if (phone) {
    expectFieldMetaData(phone);
    expect(phone).toBeInstanceOf(Phone);
    expect(phone.country_code).toBeTruthy();
    expect(phone.display).toBeTruthy();
    expect(phone.display_international).toBeTruthy();
    expect(phone.number).toBeTruthy();
    // expect(phone.raw).toBeTruthy(); // Not always there
  }

  if (person.gender) {
    expectFieldMetaData(person.gender);
    expect(person.gender).toBeInstanceOf(Gender);
    expect(person.gender.content).toBeTruthy();
  }

  if (person.dob) {
    expectFieldMetaData(person.dob);
    expect(person.dob).toBeInstanceOf(DOB);
    expectDateRange(person.dob.date_range);
    expect(person.dob.display).toBeTruthy();
  }

  const language = person.languages.shift();
  if (language) {
    expectFieldMetaData(language);
    expect(language).toBeInstanceOf(Language);
    expect(language.language).toBeTruthy();
    expect(language.display).toBeTruthy();
  }

  const ethinicity = person.ethnicities.shift();
  if (ethinicity) {
    expectFieldMetaData(ethinicity);
    expect(ethinicity).toBeInstanceOf(Ethinicity);
    expect(ethinicity.content).toBeTruthy();
  }

  const originCountry = person.origin_countries.shift();
  if (originCountry) {
    expectFieldMetaData(originCountry);
    expect(originCountry).toBeInstanceOf(OriginCountry);
    expect(originCountry.country).toBeTruthy();
  }

  const address = person.addresses.shift();
  if (address) {
    expectFieldMetaData(address);
    expect(address).toBeInstanceOf(Address);
    expect(address.display).toBeTruthy();
  }

  const job = person.jobs.shift();
  if (job) {
    expectFieldMetaData(job);
    expect(job).toBeInstanceOf(Job);
    expectDateRange(job.date_range);
    expect(job.title).toBeTruthy();
    expect(job.organization).toBeTruthy();
    expect(job.display).toBeTruthy();
  }

  const education = person.educations.shift();
  if (education) {
    expectFieldMetaData(education);
    expect(education).toBeInstanceOf(Education);
    expectDateRange(education.date_range);
    expect(education.school).toBeTruthy();
    // expect(education.degree).toBeTruthy(); // Not always there
    expect(education.display).toBeTruthy();
  }

  const relationship = person.relationships.shift();
  if (relationship) {
    expectFieldMetaData(relationship);
    expect(relationship).toBeInstanceOf(Relationship);
    expect(relationship["@type"]).toBeTruthy();

    expect(relationship.getFirstName()).toBeTruthy();
    expect(relationship.getLastName()).toBeTruthy();
    expect(relationship.getDisplayName()).toBeTruthy();
    // expect(relationship.getImageUrl()).toBeTruthy(); // Not always there
    // expect(relationship.getThumbnailTokens()).toBeTruthy(); // Not always there

    const relationshipName = relationship.names.shift();
    expect(relationshipName).toBeInstanceOf(Name);
    expect(relationshipName.display).toBeTruthy();
  }

  const user_id = person.user_ids.shift();
  if (user_id) {
    expectFieldMetaData(user_id);
    expect(user_id).toBeInstanceOf(UserID);
    expect(user_id.content).toBeTruthy();
  }

  const image = person.images.shift();
  if (image) {
    expectFieldMetaData(image);
    expect(image).toBeInstanceOf(Image);
    expect(image.url).toBeTruthy();
    expect(image.thumbnail_token).toBeTruthy();
    const thumbnailUrl = image.getThumbnailUrl();
    expect(thumbnailUrl).toBeTruthy();
    // Turn it on if you need to be sure. But it gets called 6 times, so it's a bit excessive.
    // const response = await Axios.get(thumbnailUrl);
    // expect(response.status).toBe(200);
  }

  const url = person.urls.shift();
  if (url) {
    expectFieldMetaData(url);
    expect(url).toBeInstanceOf(Url);
    expect(url["@category"]).toBeTruthy();
    expect(url.url).toBeTruthy();
  }
};

const expectFieldMetaData = (field: DataField) => {
  expect(field).toBeInstanceOf(DataField);
  if (field["@valid_since"]) {
    expect(field.getValidSinceDate()).toBeInstanceOf(Date);
  }
  if (field["@last_seen"]) {
    expect(field.getLastSeenDate()).toBeInstanceOf(Date);
  }
};

const expectDateRange = (dateRange: DateRange) => {
  expect(dateRange).toBeInstanceOf(DateRange);
  const dates = dateRange.getDates();
  if (dateRange.start) {
    expect(dates.start).toBeInstanceOf(Date);
  }
  if (dateRange.end) {
    expect(dates.end).toBeInstanceOf(Date);
  }
};

/**
 * The tests
 */
describe("piplService", () => {
  dotenv.config();
  const piplService = new PiplService(process.env.API_KEY, {
    onInvalidCredentials: onInvalidCredentials
  });

  it("should be an instance of PiplService", () => {
    expect(piplService).toBeInstanceOf(PiplService);
  });

  // it('should fire our invalid credentials callback', async done => {
  //     await expect(piplService.search({
  //         name: "Tesla"
  //     })).rejects.toThrowError();
  //     expect(onInvalidCredentials).toBeCalledTimes(1);
  //     done();
  // });

  it("should return a search response from call parameters", async done => {
    const response = await piplService.search({
      first_name: "Warren",
      last_name: "Buffet"
    });

    expect(response).toBeInstanceOf(SearchResponse);
    expect(response.error).toBeFalsy();
    expectAvailableData(response.available_data);
    const possiblePerson = response.possible_persons?.shift();
    if (possiblePerson) {
      await expectPerson(possiblePerson);
      expect(response["@persons_count"]).toBeGreaterThan(0);
    }

    if (response.person) {
      await expectPerson(response.person);
      // Only available for a single person response
      expect(response.person["@id"]).toBeTruthy();
    }
    done();
  });

  it("should return a search response from a partial person object", async done => {
    const partialPerson: IPersonCall = {
      names: [
        {
          first: "Warren",
          last: "Buffet"
        }
      ]
    };
    const response = await piplService.searchByPerson(partialPerson);

    expect(response).toBeInstanceOf(SearchResponse);
    expect(response.error).toBeFalsy();
    expectAvailableData(response.available_data);
    const possiblePerson = response.possible_persons?.shift();
    if (possiblePerson) {
      await expectPerson(possiblePerson);
    }

    if (response.person) {
      await expectPerson(response.person);
      // Only available for a single person response
      expect(response.person["@id"]).toBeTruthy();
    }
    done();
  });

  it(
    "should return a search response from a search pointer",
    async done => {
      const initialResponse = await piplService.search({
        first_name: "Warren",
        last_name: "Buffet"
      });

      expect(initialResponse).toBeInstanceOf(SearchResponse);
      expect(initialResponse.error).toBeFalsy();

      const searchPointer = initialResponse.possible_persons.shift()[
        "@search_pointer"
      ];
      const response = await piplService.getBySearchPointer(searchPointer);
      expectAvailableData(response.available_data);
      const possiblePerson = response.possible_persons?.shift();
      if (possiblePerson) {
        await expectPerson(possiblePerson);
      }

      if (response.person) {
        await expectPerson(response.person);
        // Only available for a single person response
        expect(response.person["@id"]).toBeTruthy();
      }
      done();
    },
    TIMINGS.defaultTimeout * 2
  );

  it(
    "should return a thumbnail url from an image tokens",
    async done => {
      const initialResponse = await piplService.search({
        first_name: "Warren",
        last_name: "Buffet"
      });

      expect(initialResponse).toBeInstanceOf(SearchResponse);
      expect(initialResponse.error).toBeFalsy();

      const tokens = initialResponse.possible_persons
        .shift()
        .getThumbnailTokens();
      if (!tokens) {
        return;
      }

      const thumbnailUrl = PiplService.getThumbnailUrl({
        tokens,
        height: 250,
        width: 250
      });
      expect(thumbnailUrl).toBeTruthy();
      const response = await Axios.get(thumbnailUrl);
      expect(response.status).toBe(200);
      done();
    },
    TIMINGS.defaultTimeout * 2
  );
});
