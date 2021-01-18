import i18n from 'i18next';
import React from 'react';

import {
  CollectionListDocument,
  EventListDocument,
  LandingPagesDocument,
  LinkedEventsSource,
  PlaceDetailsDocument,
} from '../../../../generated/graphql';
import {
  fakeCollections,
  fakeEvents,
  fakeLandingPages,
  fakeLocalizedObject,
  fakePlace,
} from '../../../../util/mockDataUtils';
import {
  actWait,
  configure,
  render,
  screen,
  waitFor,
} from '../../../../util/testUtils';
import AppRoutes from '../AppRoutes';

const placeToPlaceString = {
  annantalo: 'Annantalo',
  caisa: 'Caisa',
  espanlava: 'Espanlava',
  kanneltalo: 'Kanneltalo',
  savoyteatteri: 'Savoy-teatteri',
  stoa: 'Stoa',
  vuotalo: 'Vuotalo',
};

const placeIdMap = {
  annantalo: 'tprek:7254',
  caisa: 'tprek:7256',
  espanlava: 'tprek:7265',
  kanneltalo: 'tprek:7255',
  savoyteatteri: 'tprek:7258',
  stoa: 'tprek:7259',
  vuotalo: 'tprek:7260',
};

configure({ defaultHidden: true });

const landingPagesResponse = { data: { landingPages: fakeLandingPages(1) } };
const collectionListResponse = {
  data: { collectionList: fakeCollections(1) },
};
const eventListResponse = { data: { eventList: fakeEvents(3) } };

const eventListBaseVariables = {
  audienceMinAgeGt: '',
  audienceMaxAgeLt: '',
  division: [],
  end: '',
  include: ['keywords', 'location'],
  isFree: undefined,
  keyword: [],
  keywordAnd: [],
  keywordNot: [],
  language: 'fi',
  pageSize: 10,
  publisher: null,
  sort: 'end_time',
  start: 'now',
  startsAfter: undefined,
  superEventType: ['umbrella', 'none'],
};

const mocks = [
  {
    request: {
      query: LandingPagesDocument,
      variables: { visibleOnFrontpage: true },
    },
    result: landingPagesResponse,
  },
  {
    request: {
      query: CollectionListDocument,
      variables: { visibleOnFrontpage: true },
    },
    result: collectionListResponse,
  },
  // generate mock response for each place query
  ...Object.keys(placeIdMap).map((key) => {
    return {
      request: {
        query: EventListDocument,
        variables: {
          ...eventListBaseVariables,
          location: [placeIdMap[key]],
        },
      },
      result: eventListResponse,
    };
  }),
  ...Object.keys(placeIdMap).map((key) => {
    return {
      request: {
        query: PlaceDetailsDocument,
        variables: {
          id: placeIdMap[key],
          source: LinkedEventsSource.Linkedevents,
        },
      },
      result: {
        data: {
          placeDetails: fakePlace({
            name: fakeLocalizedObject(placeToPlaceString[key]),
          }),
        },
      },
    };
  }),
];

const renderComponent = (route: string) =>
  render(<AppRoutes />, { mocks, routes: [route] });

beforeEach(() => {
  i18n.changeLanguage('fi');
});

it('user from supported locale will be redirect to App with that locale', async () => {
  renderComponent('/en');

  await waitFor(() => {
    expect(i18n.language).toEqual('en');
  });
});

it('user from unsupported locale prefix will be redirect to route with support prefix', async () => {
  const { history } = renderComponent('/vi/');
  await actWait();

  expect(i18n.language).toEqual('fi');
  expect(history.location.pathname).toContain('/fi/vi/');
});

it('user without locale prefix will be redirect to route with support prefix', async () => {
  const { history } = renderComponent('/foo-url');
  await actWait();

  expect(i18n.language).toEqual('fi');
  expect(history.location.pathname).toContain('/fi/foo-url');
});

it('user with route with unsupport locale will be redirect to App anyway, with supported locale', async () => {
  const { history } = renderComponent('/dk/foo');
  await actWait();

  expect(i18n.language).toEqual('fi');
  expect(history.location.pathname).toContain('/fi/dk/foo');
});

describe('test each place path /:locale/:place', () => {
  Object.keys(placeIdMap).forEach((place) => {
    it(`renders event search with place from path: ${place}`, async () => {
      renderComponent(`/fi/${place}`);

      const textContentRegex = new RegExp(placeToPlaceString[place], 'ig');

      // make sure place dropdown initializes with the place from path
      await waitFor(() => {
        expect(
          screen.getByRole('button', { name: /etsi tapahtumapaikka/i })
        ).toHaveTextContent(textContentRegex);
      });

      expect(screen.queryByText('Mitä etsit?')).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { name: 'Tapahtumahaku' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { name: '3 hakutulosta' })
      ).toBeInTheDocument();
    });
  });
});
