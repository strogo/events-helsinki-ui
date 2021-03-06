import { GraphQLClient } from 'graphql-request';

import { SUPPORT_LANGUAGES } from '../../src/constants';
import {
  EVENT_SORT_OPTIONS,
  PAGE_SIZE,
} from '../../src/domain/eventSearch/constants';
import { getEventSearchVariables } from '../../src/domain/eventSearch/utils';
import { EventFieldsFragment, getSdk } from '../utils/generated/graphql';
import { getGraphQLUrl } from '../utils/settings';
const client = new GraphQLClient(getGraphQLUrl());
const sdk = getSdk(client);

export const getHelsinkiEvents = async (
  count = PAGE_SIZE,
  locale = SUPPORT_LANGUAGES.FI,
  queryParams = ''
): Promise<EventFieldsFragment[]> => {
  return await getEvents(
    count,
    locale,
    `divisions=kunta:helsinki&${queryParams}`
  );
};

export const getEvents = async (
  count = PAGE_SIZE,
  locale = SUPPORT_LANGUAGES.FI,
  queryParams = ''
): Promise<EventFieldsFragment[]> => {
  const searchVariables = getEventSearchVariables({
    params: new URLSearchParams(`?${queryParams}`),
    include: ['keywords', 'location'],
    language: SUPPORT_LANGUAGES.FI,
    pageSize: count,
    sortOrder: EVENT_SORT_OPTIONS.END_TIME,
    superEventType: ['umbrella', 'none'],
  });
  const {
    eventList: { data },
  } = await sdk.EventList(searchVariables);
  return data.filter((event) => Boolean(event.name[locale]));
};
