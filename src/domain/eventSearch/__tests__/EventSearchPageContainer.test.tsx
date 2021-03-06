/* eslint-disable no-console */
import { MockedResponse } from '@apollo/react-testing';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { advanceTo, clear } from 'jest-date-mock';
import React from 'react';
import routeData from 'react-router';
import { scroller } from 'react-scroll';
import { toast } from 'react-toastify';

import translations from '../../../common/translation/i18n/fi.json';
import {
  EventListDocument,
  NeighborhoodListDocument,
  PlaceListDocument,
} from '../../../generated/graphql';
import {
  fakeEvents,
  fakeNeighborhoods,
  fakePlaces,
} from '../../../util/mockDataUtils';
import { render } from '../../../util/testUtils';
import EventSearchPageContainer from '../EventSearchPageContainer';

const meta = {
  count: 20,
  next:
    // eslint-disable-next-line max-len
    'https://api.hel.fi/linkedevents/v1/event/?division=kunta%3Ahelsinki&include=keywords%2Clocation&language=fi&page=2&page_size=10&sort=end_time&start=2020-08-12T17&super_event_type=umbrella%2Cnone&text=jazz',
  previous: null,
  __typename: 'Meta',
};
const eventsResponse = { data: { eventList: { ...fakeEvents(10), meta } } };
const eventsLoadMoreResponse = {
  data: {
    eventList: {
      ...fakeEvents(10),
      meta: { ...meta, next: null },
    },
  },
};
const eventListVariables = {
  allOngoingAnd: ['jazz'],
  end: '',
  include: ['keywords', 'location'],
  isFree: undefined,
  keyword: [],
  keywordAnd: [],
  keywordNot: [],
  language: 'fi',
  location: [],
  pageSize: 10,
  publisher: null,
  sort: 'end_time',
  start: 'now',
  startsAfter: undefined,
  superEventType: ['umbrella', 'none'],
};

const neighborhoodsResponse = {
  data: {
    neighborhoodList: fakeNeighborhoods(10),
  },
};

const placesResponse = {
  data: {
    placeList: fakePlaces(10),
  },
};

const commonMocks = [
  {
    request: {
      query: EventListDocument,
      variables: {
        ...eventListVariables,
      },
    },
    result: eventsResponse,
  },
  {
    request: {
      query: NeighborhoodListDocument,
    },
    result: neighborhoodsResponse,
  },
  {
    request: {
      query: PlaceListDocument,
      variables: {
        hasUpcomingEvents: true,
        pageSize: 10,
        text: '',
      },
    },
    result: placesResponse,
  },
];

const defaultMocks = [
  ...commonMocks,
  {
    request: {
      query: EventListDocument,
      variables: {
        ...eventListVariables,
        page: 2,
      },
    },
    result: eventsLoadMoreResponse,
  },
];

afterAll(() => {
  clear();
});

const pathname = '/fi/events';
const search = '?text=jazz';
const testRoute = `${pathname}${search}`;
const routes = [testRoute];

const renderComponent = (mocks: MockedResponse[] = defaultMocks) =>
  render(<EventSearchPageContainer />, {
    mocks,
    routes,
  });

it('all the event cards should be visible and load more button should load more events', async () => {
  advanceTo(new Date(2020, 7, 12));
  renderComponent();

  await waitFor(() => {
    expect(
      screen.getByText(eventsResponse.data.eventList.data[0].name.fi)
    ).toBeInTheDocument();
  });

  eventsResponse.data.eventList.data.forEach((event) => {
    expect(screen.getByText(event.name.fi)).toBeInTheDocument();
  });

  userEvent.click(
    screen.getByRole('button', {
      name: translations.eventSearch.buttonLoadMore.replace(
        '{{count}}',
        (
          eventsResponse.data.eventList.meta.count -
          eventsResponse.data.eventList.data.length
        ).toString()
      ),
    })
  );

  await waitFor(() => {
    expect(
      screen.getByText(eventsLoadMoreResponse.data.eventList.data[0].name.fi)
    ).toBeInTheDocument();
  });

  eventsLoadMoreResponse.data.eventList.data.forEach((event) => {
    expect(screen.getByText(event.name.fi)).toBeInTheDocument();
  });
});

it('should show toastr message when loading next event page fails', async () => {
  toast.error = jest.fn();
  const mocks = [
    ...commonMocks,
    {
      request: {
        query: EventListDocument,
        variables: {
          ...eventListVariables,
          page: 2,
        },
      },
      error: new Error('not found'),
    },
  ];

  renderComponent(mocks);

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  userEvent.click(
    screen.getByRole('button', {
      name: translations.eventSearch.buttonLoadMore.replace(
        '{{count}}',
        (
          eventsResponse.data.eventList.meta.count -
          eventsResponse.data.eventList.data.length
        ).toString()
      ),
    })
  );

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  expect(toast.error).toBeCalledWith(translations.eventSearch.errorLoadMode);
});

it('should scroll to event defined in react-router location state', async () => {
  scroller.scrollTo = jest.fn();
  const mockLocation = {
    pathname,
    hash: '',
    search,
    state: { eventId: eventsResponse.data.eventList.data[0].id },
  };
  jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);

  renderComponent();

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  expect(scroller.scrollTo).toBeCalled();
});

it('should not scroll to result list on large screen', async () => {
  scroller.scrollTo = jest.fn();
  const mockLocation = {
    pathname,
    hash: '',
    search,
    state: { scrollToResults: true },
  };
  jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);

  renderComponent();

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  expect(scroller.scrollTo).not.toBeCalled();
});

it('should scroll to result list on mobile screen', async () => {
  global.innerWidth = 500;
  scroller.scrollTo = jest.fn();

  const mockLocation = {
    pathname,
    hash: '',
    search,
    state: { scrollToResults: true },
  };
  jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);

  renderComponent();

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  expect(scroller.scrollTo).toBeCalled();
});

//it('searches events correctly with event place in path, e.g. /fi/annantalo', () => {});
