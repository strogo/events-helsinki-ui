/* eslint-disable @typescript-eslint/no-explicit-any */
import faker from 'faker';
import merge from 'lodash/merge';

import {
  AboutPagesResponse,
  AccessibilityPagesResponse,
  CmsImage,
  CollectionDetails,
  CollectionListResponse,
  EventDetails,
  EventListResponse,
  Image,
  InLanguage,
  Keyword,
  KeywordListResponse,
  LandingPage,
  LandingPagesResponse,
  LocalizedCmsImage,
  LocalizedObject,
  Neighborhood,
  NeighborhoodListResponse,
  Offer,
  Place,
  PlaceListResponse,
  StaticPage,
} from '../generated/graphql';

export const fakeEvents = (
  count = 1,
  events?: Partial<EventDetails>[]
): EventListResponse => ({
  data: generateNodeArray((i) => fakeEvent(events?.[i]), count),
  meta: {
    __typename: 'Meta',
    count: count,
    next: '',
    previous: '',
  },
  __typename: 'EventListResponse',
});

export const fakeEvent = (overrides?: Partial<EventDetails>): EventDetails => {
  return merge(
    {
      id: `hel:${faker.random.uuid()}`,
      internalId: faker.random.uuid(),
      name: fakeLocalizedObject(faker.name.title()),
      publisher: 'provider:123',
      provider: fakeLocalizedObject(),
      shortDescription: fakeLocalizedObject(),
      description: fakeLocalizedObject(),
      images: [fakeImage()],
      infoUrl: fakeLocalizedObject(),
      inLanguage: [fakeInLanguage()],
      audience: [],
      keywords: [fakeKeyword()],
      location: fakePlace(),
      startTime: '2020-07-13T05:51:05.761000Z',
      endTime: null,
      datePublished: null,
      externalLinks: [] as any,
      offers: [] as any,
      subEvents: [] as any,
      eventStatus: 'EventScheduled',
      superEvent: null,
      dataSource: 'hel',
      __typename: 'EventDetails',
    },
    overrides
  );
};

export const fakeImage = (overrides?: Partial<Image>): Image =>
  merge(
    {
      id: faker.random.uuid(),
      internalId: 'https://api.hel.fi/linkedevents-test/v1/image/48566/',
      license: 'cc_by',
      name: faker.random.words(),
      url: 'https://api.hel.fi/linkedevents-test/media/images/test.png',
      cropping: '59,0,503,444',
      photographerName: faker.name.firstName(),
      __typename: 'Image',
    },
    overrides
  );

export const fakeInLanguage = (overrides?: InLanguage): InLanguage =>
  merge(
    {
      id: 'fi',
      internalId: 'https://api.hel.fi/linkedevents-test/v1/language/fi/',
      name: {
        en: null,
        fi: 'suomi',
        sv: null,
        __typename: 'LocalizedObject',
      },
      __typename: 'InLanguage',
    },
    overrides
  );

export const fakePlaces = (
  count = 1,
  places?: Partial<Place>[]
): PlaceListResponse => ({
  data: generateNodeArray((i) => fakePlace(places?.[i]), count),
  meta: {
    count: count,
    next: '',
    previous: '',
    __typename: 'Meta',
  },
  __typename: 'PlaceListResponse',
});

export const fakePlace = (overrides?: Partial<Place>): Place =>
  merge(
    {
      id: faker.random.uuid(),
      internalId: 'https://api.hel.fi/linkedevents-test/v1/place/tprek:15376/',
      name: fakeLocalizedObject(),
      streetAddress: fakeLocalizedObject(),
      addressLocality: fakeLocalizedObject(),
      postalCode: faker.address.zipCode(),
      hasUpcomingEvents: true,
      telephone: fakeLocalizedObject(),
      email: faker.internet.email(),
      infoUrl: fakeLocalizedObject(faker.internet.url()),
      position: null,
      divisions: [],
      __typename: 'Place',
    },
    overrides
  );

export const fakeKeywords = (
  count = 1,
  keywords?: Partial<Keyword>[]
): KeywordListResponse => ({
  data: generateNodeArray((i) => fakeKeyword(keywords?.[i]), count),
  meta: {
    __typename: 'Meta',
    count: count,
    next: '',
    previous: '',
  },
  __typename: 'KeywordListResponse',
});

export const fakeKeyword = (overrides?: Partial<Keyword>): Keyword =>
  merge(
    {
      id: faker.random.uuid(),
      dataSource: 'yso',
      hasUpcomingEvents: true,
      name: {
        en: 'families',
        fi: 'perheet',
        sv: 'familjer',
        __typename: 'LocalizedObject',
      },
      internalId: 'https://api.hel.fi/linkedevents-test/v1/keyword/yso:p4363/',
      __typename: 'Keyword',
    },
    overrides
  );

export const fakeOffer = (overrides?: Partial<Offer>): Offer =>
  merge(
    {
      description: fakeLocalizedObject(),
      infoUrl: fakeLocalizedObject(faker.internet.url()),
      isFree: false,
      price: fakeLocalizedObject(),
      __typename: 'Offer',
    },
    overrides
  );

export const fakeNeighborhoods = (
  count = 1,
  neighborhoods?: Partial<Neighborhood>[]
): NeighborhoodListResponse => ({
  data: generateNodeArray((i) => fakeNeighborhood(neighborhoods?.[i]), count),
  meta: {
    count: count,
    next: '',
    previous: '',
    __typename: 'Meta',
  },
  __typename: 'NeighborhoodListResponse',
});

export const fakeNeighborhood = (
  overrides?: Partial<Neighborhood>
): Neighborhood =>
  merge(
    {
      id: 'kaupunginosa:aluemeri',
      name: fakeLocalizedObject(),
      __typename: 'Neighborhood',
    },
    overrides
  );

export const fakeLandingPages = (
  count = 1,
  landingPages?: Partial<LandingPage>[]
): LandingPagesResponse => ({
  data: generateNodeArray((i) => fakeLandingPage(landingPages?.[i]), count),
  __typename: 'LandingPagesResponse',
});

export const fakeLandingPage = (
  overrides?: Partial<LandingPage>
): LandingPage =>
  merge(
    {
      id: faker.random.uuid(),
      buttonText: fakeLocalizedObject(),
      buttonUrl: fakeLocalizedObject(faker.internet.url()),
      description: fakeLocalizedObject(),
      heroBackgroundImage: fakeLocalizedCmsImage(),
      heroBackgroundImageColor: fakeLocalizedObject('BLACK'),
      heroBackgroundImageMobile: fakeLocalizedCmsImage(),
      heroTopLayerImage: fakeLocalizedCmsImage(),
      metaInformation: fakeLocalizedObject(),
      pageTitle: fakeLocalizedObject(),
      socialMediaImage: fakeLocalizedCmsImage(),
      title: fakeLocalizedObject(),
      titleAndDescriptionColor: fakeLocalizedObject('BLACK'),
      __typename: 'LandingPage',
    },
    overrides
  );

export const fakeCollections = (
  count = 1,
  collections?: Partial<CollectionDetails>[]
): CollectionListResponse => ({
  data: generateNodeArray((i) => fakeCollection(collections?.[i]), count),
  __typename: 'CollectionListResponse',
});
export const fakeCollection = (
  overrides?: Partial<CollectionDetails>
): CollectionDetails =>
  merge(
    {
      id: faker.random.uuid(),
      boxColor: fakeLocalizedObject('FOG'),
      curatedEvents: [],
      curatedEventsTitle: fakeLocalizedObject(),
      description: fakeLocalizedObject(),
      eventListQuery: fakeLocalizedObject(
        'https://tapahtumat.test.kuva.hel.ninja/fi/events?isFree=true&text=jooga'
      ),
      expired: false,
      eventListTitle: fakeLocalizedObject(),
      heroImage: fakeCmsImage(),
      linkText: fakeLocalizedObject(),
      linkUrl: fakeLocalizedObject(faker.internet.url()),
      slug: faker.random.uuid(),
      socialMediaDescription: fakeLocalizedObject(),
      title: fakeLocalizedObject(),
      __typename: 'CollectionDetails',
    },
    overrides
  );

export const fakeCmsImage = (overrides?: Partial<CmsImage>): CmsImage =>
  merge(
    {
      photographerCredit: faker.name.lastName(),
      url: faker.internet.url(),
      __typename: 'CmsImage',
    },
    overrides
  );

export const fakeLocalizedCmsImage = (
  overrides?: Partial<LocalizedCmsImage>
): LocalizedCmsImage =>
  merge(
    {
      en: fakeCmsImage(),
      fi: fakeCmsImage(),
      sv: fakeCmsImage(),
      __typename: 'LocalizedCmsImage',
    },
    overrides
  );

export const fakeAboutPages = (
  count = 1,
  aboutPages?: Partial<StaticPage>[]
): AboutPagesResponse => ({
  data: generateNodeArray((i) => fakeStaticPage(aboutPages?.[i]), count),
  __typename: 'AboutPagesResponse',
});

export const fakeAccessibilityPages = (
  count = 1,
  accessibilityPages?: Partial<StaticPage>[]
): AccessibilityPagesResponse => ({
  data: generateNodeArray(
    (i) => fakeStaticPage(accessibilityPages?.[i]),
    count
  ),
  __typename: 'AccessibilityPagesResponse',
});

export const fakeStaticPage = (overrides?: Partial<StaticPage>): StaticPage =>
  merge(
    {
      id: faker.random.uuid(),
      expired: false,
      headingSection: fakeLocalizedObject(),
      contentSection: fakeLocalizedObject(),
      __typename: 'StaticPage',
    },
    overrides
  );

export const fakeLocalizedObject = (text?: string): LocalizedObject => ({
  __typename: 'LocalizedObject',
  en: faker.random.words(),
  sv: faker.random.words(),
  fi: text || faker.random.words(),
});

const generateNodeArray = <T extends (...args: any) => any>(
  fakeFunc: T,
  length: number
): ReturnType<T>[] => {
  return Array.from({ length }).map((_, i) => fakeFunc(i));
};
