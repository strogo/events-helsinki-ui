import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type EventDetails = {
   __typename?: 'EventDetails',
  id: Scalars['ID'],
  location?: Maybe<Location>,
  keywords: Array<Keyword>,
  superEvent?: Maybe<InternalIdObject>,
  eventStatus?: Maybe<Scalars['String']>,
  externalLinks: Array<ExternalLink>,
  offers: Array<Offer>,
  dataSource?: Maybe<Scalars['String']>,
  publisher?: Maybe<Scalars['ID']>,
  subEvents: Array<InternalIdObject>,
  images: Array<Image>,
  inLanguage: Array<InLanguage>,
  audience: Array<InternalIdObject>,
  createdTime?: Maybe<Scalars['String']>,
  lastModifiedTime?: Maybe<Scalars['String']>,
  datePublished?: Maybe<Scalars['String']>,
  startTime?: Maybe<Scalars['String']>,
  endTime?: Maybe<Scalars['String']>,
  customData?: Maybe<Scalars['String']>,
  audienceMinAge?: Maybe<Scalars['String']>,
  audienceMaxAge?: Maybe<Scalars['String']>,
  superEventType?: Maybe<Scalars['String']>,
  extensionCourse?: Maybe<ExtensionCourse>,
  name: LocalizedObject,
  locationExtraInfo?: Maybe<LocalizedObject>,
  shortDescription?: Maybe<LocalizedObject>,
  provider?: Maybe<LocalizedObject>,
  infoUrl?: Maybe<LocalizedObject>,
  providerContactInfo?: Maybe<Scalars['String']>,
  description?: Maybe<LocalizedObject>,
  internalId?: Maybe<Scalars['String']>,
  internalContext?: Maybe<Scalars['String']>,
  internalType?: Maybe<Scalars['String']>,
};

export type EventListResponse = {
   __typename?: 'EventListResponse',
  meta: Meta,
  data: Array<EventDetails>,
};

export type ExtensionCourse = {
   __typename?: 'ExtensionCourse',
  enrolmentStartTime?: Maybe<Scalars['String']>,
  enrolmentEndTime?: Maybe<Scalars['String']>,
  maximumAttendeeCapacity?: Maybe<Scalars['Int']>,
  minimumAttendeeCapacity?: Maybe<Scalars['Int']>,
  remainingAttendeeCapacity?: Maybe<Scalars['Int']>,
};

export type ExternalLink = {
   __typename?: 'ExternalLink',
  name?: Maybe<Scalars['String']>,
  link?: Maybe<Scalars['String']>,
  language?: Maybe<Scalars['String']>,
};

export type Image = {
   __typename?: 'Image',
  id: Scalars['ID'],
  license?: Maybe<Scalars['String']>,
  createdTime?: Maybe<Scalars['String']>,
  lastModifiedTime?: Maybe<Scalars['String']>,
  name: Scalars['String'],
  url: Scalars['String'],
  cropping?: Maybe<Scalars['String']>,
  photographerName?: Maybe<Scalars['String']>,
  dataSource?: Maybe<Scalars['String']>,
  publisher?: Maybe<Scalars['String']>,
  internalId?: Maybe<Scalars['String']>,
  internalContext?: Maybe<Scalars['String']>,
  internalType?: Maybe<Scalars['String']>,
};

export type InLanguage = {
   __typename?: 'InLanguage',
  id: Scalars['ID'],
  translationAvailable?: Maybe<Scalars['Boolean']>,
  name?: Maybe<LocalizedObject>,
  internalId?: Maybe<Scalars['String']>,
  internalContext?: Maybe<Scalars['String']>,
  internalType?: Maybe<Scalars['String']>,
};

export type InternalIdObject = {
   __typename?: 'InternalIdObject',
  internalId?: Maybe<Scalars['String']>,
};

export type Keyword = {
   __typename?: 'Keyword',
  id: Scalars['String'],
  altLabels: Array<Scalars['String']>,
  createdTime?: Maybe<Scalars['String']>,
  lastModifiedTime: Scalars['String'],
  aggregate?: Maybe<Scalars['Boolean']>,
  deprecated?: Maybe<Scalars['Boolean']>,
  nEvents: Scalars['Int'],
  image?: Maybe<Image>,
  dataSource: Scalars['String'],
  publisher?: Maybe<Scalars['ID']>,
  name: LocalizedObject,
  internalId?: Maybe<Scalars['String']>,
  internalContext?: Maybe<Scalars['String']>,
  internalType?: Maybe<Scalars['String']>,
};

export type LocalizedObject = {
   __typename?: 'LocalizedObject',
  fi?: Maybe<Scalars['String']>,
  sv?: Maybe<Scalars['String']>,
  en?: Maybe<Scalars['String']>,
};

export type Location = {
   __typename?: 'Location',
  id: Scalars['ID'],
  divisions?: Maybe<Array<LocationDivision>>,
  createdTime?: Maybe<Scalars['String']>,
  lastModifiedTime?: Maybe<Scalars['String']>,
  customData?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  contactType?: Maybe<Scalars['String']>,
  addressRegion?: Maybe<Scalars['String']>,
  postalCode?: Maybe<Scalars['String']>,
  postOfficeBoxNum?: Maybe<Scalars['String']>,
  addressCountry?: Maybe<Scalars['String']>,
  deleted?: Maybe<Scalars['Boolean']>,
  nEvents?: Maybe<Scalars['Int']>,
  image?: Maybe<Image>,
  dataSource?: Maybe<Scalars['String']>,
  publisher?: Maybe<Scalars['ID']>,
  parent?: Maybe<Scalars['ID']>,
  replacedBy?: Maybe<Scalars['String']>,
  position?: Maybe<LocationPosition>,
  name?: Maybe<LocalizedObject>,
  description?: Maybe<Scalars['String']>,
  telephone?: Maybe<LocalizedObject>,
  addressLocality?: Maybe<LocalizedObject>,
  streetAddress?: Maybe<LocalizedObject>,
  infoUrl?: Maybe<LocalizedObject>,
  internalId?: Maybe<Scalars['String']>,
  internalContext?: Maybe<Scalars['String']>,
  internalType?: Maybe<Scalars['String']>,
};

export type LocationDivision = {
   __typename?: 'LocationDivision',
  type: Scalars['String'],
  ocdId?: Maybe<Scalars['String']>,
  municipality?: Maybe<Scalars['String']>,
  name?: Maybe<LocalizedObject>,
};

export type LocationPosition = {
   __typename?: 'LocationPosition',
  type: Scalars['String'],
  coordinates: Array<Scalars['Float']>,
};

export type Meta = {
   __typename?: 'Meta',
  count: Scalars['Int'],
  next?: Maybe<Scalars['String']>,
  previous?: Maybe<Scalars['String']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  _empty?: Maybe<Scalars['String']>,
};

export type Offer = {
   __typename?: 'Offer',
  isFree?: Maybe<Scalars['Boolean']>,
  description?: Maybe<LocalizedObject>,
  price?: Maybe<LocalizedObject>,
  infoUrl?: Maybe<LocalizedObject>,
};

export type OrganizationDetails = {
   __typename?: 'OrganizationDetails',
  id: Scalars['ID'],
  dataSource?: Maybe<Scalars['String']>,
  classification?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  foundingDate?: Maybe<Scalars['String']>,
  dissolutionDate?: Maybe<Scalars['String']>,
  parentOrganization?: Maybe<Scalars['String']>,
  subOrganizations?: Maybe<Array<Maybe<Scalars['String']>>>,
  affiliatedOrganizations?: Maybe<Array<Maybe<Scalars['String']>>>,
  createdTime?: Maybe<Scalars['String']>,
  lastModifiedTime?: Maybe<Scalars['String']>,
  isAffiliated: Scalars['Boolean'],
  replacedBy?: Maybe<Scalars['String']>,
  internalId?: Maybe<Scalars['String']>,
  internalContext?: Maybe<Scalars['String']>,
  internalType?: Maybe<Scalars['String']>,
};

export type Query = {
   __typename?: 'Query',
  _empty?: Maybe<Scalars['String']>,
  eventDetails: EventDetails,
  eventList: EventListResponse,
  organizationDetails: OrganizationDetails,
};


export type QueryEventDetailsArgs = {
  id?: Maybe<Scalars['ID']>
};


export type QueryEventListArgs = {
  page?: Maybe<Scalars['Int']>,
  pageSize?: Maybe<Scalars['Int']>
};


export type QueryOrganizationDetailsArgs = {
  id?: Maybe<Scalars['ID']>
};

export type Subscription = {
   __typename?: 'Subscription',
  _empty?: Maybe<Scalars['String']>,
};

export type EventDetailsQueryVariables = {
  id: Scalars['ID']
};


export type EventDetailsQuery = (
  { __typename?: 'Query' }
  & { eventDetails: (
    { __typename?: 'EventDetails' }
    & Pick<EventDetails, 'id' | 'endTime' | 'startTime' | 'publisher'>
    & { externalLinks: Array<(
      { __typename?: 'ExternalLink' }
      & Pick<ExternalLink, 'name' | 'link'>
    )>, images: Array<(
      { __typename?: 'Image' }
      & Pick<Image, 'id' | 'name' | 'url'>
    )>, inLanguage: Array<(
      { __typename?: 'InLanguage' }
      & { name: Maybe<(
        { __typename?: 'LocalizedObject' }
        & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
      )> }
    )>, keywords: Array<(
      { __typename?: 'Keyword' }
      & Pick<Keyword, 'id' | 'altLabels' | 'createdTime' | 'lastModifiedTime' | 'nEvents' | 'dataSource'>
      & { name: (
        { __typename?: 'LocalizedObject' }
        & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
      ) }
    )>, location: Maybe<(
      { __typename?: 'Location' }
      & Pick<Location, 'email' | 'postalCode'>
      & { divisions: Maybe<Array<(
        { __typename?: 'LocationDivision' }
        & Pick<LocationDivision, 'type'>
        & { name: Maybe<(
          { __typename?: 'LocalizedObject' }
          & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
        )> }
      )>>, infoUrl: Maybe<(
        { __typename?: 'LocalizedObject' }
        & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
      )>, name: Maybe<(
        { __typename?: 'LocalizedObject' }
        & Pick<LocalizedObject, 'fi' | 'en' | 'sv'>
      )>, addressLocality: Maybe<(
        { __typename?: 'LocalizedObject' }
        & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
      )>, streetAddress: Maybe<(
        { __typename?: 'LocalizedObject' }
        & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
      )>, position: Maybe<(
        { __typename?: 'LocationPosition' }
        & Pick<LocationPosition, 'coordinates'>
      )>, telephone: Maybe<(
        { __typename?: 'LocalizedObject' }
        & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
      )> }
    )>, offers: Array<(
      { __typename?: 'Offer' }
      & Pick<Offer, 'isFree'>
      & { price: Maybe<(
        { __typename?: 'LocalizedObject' }
        & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
      )>, description: Maybe<(
        { __typename?: 'LocalizedObject' }
        & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
      )>, infoUrl: Maybe<(
        { __typename?: 'LocalizedObject' }
        & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
      )> }
    )>, name: (
      { __typename?: 'LocalizedObject' }
      & Pick<LocalizedObject, 'fi' | 'en' | 'sv'>
    ), description: Maybe<(
      { __typename?: 'LocalizedObject' }
      & Pick<LocalizedObject, 'fi' | 'en' | 'sv'>
    )>, shortDescription: Maybe<(
      { __typename?: 'LocalizedObject' }
      & Pick<LocalizedObject, 'fi' | 'en' | 'sv'>
    )>, provider: Maybe<(
      { __typename?: 'LocalizedObject' }
      & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
    )>, infoUrl: Maybe<(
      { __typename?: 'LocalizedObject' }
      & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
    )> }
  ) }
);

export type OrganizationDetailsQueryVariables = {
  id: Scalars['ID']
};


export type OrganizationDetailsQuery = (
  { __typename?: 'Query' }
  & { organizationDetails: (
    { __typename?: 'OrganizationDetails' }
    & Pick<OrganizationDetails, 'id' | 'name'>
  ) }
);

export type EventListQueryVariables = {
  page?: Maybe<Scalars['Int']>,
  pageSize?: Maybe<Scalars['Int']>
};


export type EventListQuery = (
  { __typename?: 'Query' }
  & { eventList: (
    { __typename?: 'EventListResponse' }
    & { meta: (
      { __typename?: 'Meta' }
      & Pick<Meta, 'count' | 'next' | 'previous'>
    ), data: Array<(
      { __typename?: 'EventDetails' }
      & Pick<EventDetails, 'id' | 'startTime' | 'endTime'>
      & { images: Array<(
        { __typename?: 'Image' }
        & Pick<Image, 'id' | 'name' | 'url'>
      )>, keywords: Array<(
        { __typename?: 'Keyword' }
        & Pick<Keyword, 'id'>
        & { name: (
          { __typename?: 'LocalizedObject' }
          & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
        ) }
      )>, location: Maybe<(
        { __typename?: 'Location' }
        & { divisions: Maybe<Array<(
          { __typename?: 'LocationDivision' }
          & Pick<LocationDivision, 'type'>
          & { name: Maybe<(
            { __typename?: 'LocalizedObject' }
            & Pick<LocalizedObject, 'fi' | 'en' | 'sv'>
          )> }
        )>>, name: Maybe<(
          { __typename?: 'LocalizedObject' }
          & Pick<LocalizedObject, 'fi' | 'en' | 'sv'>
        )>, addressLocality: Maybe<(
          { __typename?: 'LocalizedObject' }
          & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
        )>, streetAddress: Maybe<(
          { __typename?: 'LocalizedObject' }
          & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
        )> }
      )>, name: (
        { __typename?: 'LocalizedObject' }
        & Pick<LocalizedObject, 'fi' | 'en' | 'sv'>
      ), offers: Array<(
        { __typename?: 'Offer' }
        & Pick<Offer, 'isFree'>
        & { price: Maybe<(
          { __typename?: 'LocalizedObject' }
          & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
        )>, infoUrl: Maybe<(
          { __typename?: 'LocalizedObject' }
          & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
        )> }
      )> }
    )> }
  ) }
);


export const EventDetailsDocument = gql`
    query EventDetails($id: ID!) {
  eventDetails(id: $id) {
    id
    externalLinks {
      name
      link
    }
    images {
      id
      name
      url
    }
    inLanguage {
      name {
        fi
        sv
        en
      }
    }
    keywords {
      id
      altLabels
      createdTime
      lastModifiedTime
      nEvents
      dataSource
      name {
        fi
        sv
        en
      }
    }
    location {
      divisions {
        type
        name {
          fi
          sv
          en
        }
      }
      email
      infoUrl {
        fi
        sv
        en
      }
      name {
        fi
        en
        sv
      }
      addressLocality {
        fi
        sv
        en
      }
      streetAddress {
        fi
        sv
        en
      }
      postalCode
      position {
        coordinates
      }
      telephone {
        fi
        sv
        en
      }
    }
    offers {
      isFree
      price {
        fi
        sv
        en
      }
      description {
        fi
        sv
        en
      }
      infoUrl {
        fi
        sv
        en
      }
    }
    name {
      fi
      en
      sv
    }
    description {
      fi
      en
      sv
    }
    shortDescription {
      fi
      en
      sv
    }
    endTime
    startTime
    publisher
    provider {
      fi
      sv
      en
    }
    infoUrl {
      fi
      sv
      en
    }
  }
}
    `;
export type EventDetailsProps<TChildProps = {}> = ApolloReactHoc.DataProps<EventDetailsQuery, EventDetailsQueryVariables> | TChildProps;
export function withEventDetails<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  EventDetailsQuery,
  EventDetailsQueryVariables,
  EventDetailsProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, EventDetailsQuery, EventDetailsQueryVariables, EventDetailsProps<TChildProps>>(EventDetailsDocument, {
      alias: 'eventDetails',
      ...operationOptions
    });
};

/**
 * __useEventDetailsQuery__
 *
 * To run a query within a React component, call `useEventDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEventDetailsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EventDetailsQuery, EventDetailsQueryVariables>) {
        return ApolloReactHooks.useQuery<EventDetailsQuery, EventDetailsQueryVariables>(EventDetailsDocument, baseOptions);
      }
export function useEventDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EventDetailsQuery, EventDetailsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<EventDetailsQuery, EventDetailsQueryVariables>(EventDetailsDocument, baseOptions);
        }
export type EventDetailsQueryHookResult = ReturnType<typeof useEventDetailsQuery>;
export type EventDetailsLazyQueryHookResult = ReturnType<typeof useEventDetailsLazyQuery>;
export type EventDetailsQueryResult = ApolloReactCommon.QueryResult<EventDetailsQuery, EventDetailsQueryVariables>;
export const OrganizationDetailsDocument = gql`
    query OrganizationDetails($id: ID!) {
  organizationDetails(id: $id) {
    id
    name
  }
}
    `;
export type OrganizationDetailsProps<TChildProps = {}> = ApolloReactHoc.DataProps<OrganizationDetailsQuery, OrganizationDetailsQueryVariables> | TChildProps;
export function withOrganizationDetails<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  OrganizationDetailsQuery,
  OrganizationDetailsQueryVariables,
  OrganizationDetailsProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, OrganizationDetailsQuery, OrganizationDetailsQueryVariables, OrganizationDetailsProps<TChildProps>>(OrganizationDetailsDocument, {
      alias: 'organizationDetails',
      ...operationOptions
    });
};

/**
 * __useOrganizationDetailsQuery__
 *
 * To run a query within a React component, call `useOrganizationDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizationDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganizationDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOrganizationDetailsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<OrganizationDetailsQuery, OrganizationDetailsQueryVariables>) {
        return ApolloReactHooks.useQuery<OrganizationDetailsQuery, OrganizationDetailsQueryVariables>(OrganizationDetailsDocument, baseOptions);
      }
export function useOrganizationDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<OrganizationDetailsQuery, OrganizationDetailsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<OrganizationDetailsQuery, OrganizationDetailsQueryVariables>(OrganizationDetailsDocument, baseOptions);
        }
export type OrganizationDetailsQueryHookResult = ReturnType<typeof useOrganizationDetailsQuery>;
export type OrganizationDetailsLazyQueryHookResult = ReturnType<typeof useOrganizationDetailsLazyQuery>;
export type OrganizationDetailsQueryResult = ApolloReactCommon.QueryResult<OrganizationDetailsQuery, OrganizationDetailsQueryVariables>;
export const EventListDocument = gql`
    query EventList($page: Int, $pageSize: Int) {
  eventList(page: $page, pageSize: $pageSize) {
    meta {
      count
      next
      previous
    }
    data {
      id
      images {
        id
        name
        url
      }
      keywords {
        id
        name {
          fi
          sv
          en
        }
      }
      location {
        divisions {
          type
          name {
            fi
            en
            sv
          }
        }
        name {
          fi
          en
          sv
        }
        addressLocality {
          fi
          sv
          en
        }
        streetAddress {
          fi
          sv
          en
        }
      }
      name {
        fi
        en
        sv
      }
      offers {
        isFree
        price {
          fi
          sv
          en
        }
        infoUrl {
          fi
          sv
          en
        }
      }
      startTime
      endTime
    }
  }
}
    `;
export type EventListProps<TChildProps = {}> = ApolloReactHoc.DataProps<EventListQuery, EventListQueryVariables> | TChildProps;
export function withEventList<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  EventListQuery,
  EventListQueryVariables,
  EventListProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, EventListQuery, EventListQueryVariables, EventListProps<TChildProps>>(EventListDocument, {
      alias: 'eventList',
      ...operationOptions
    });
};

/**
 * __useEventListQuery__
 *
 * To run a query within a React component, call `useEventListQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventListQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventListQuery({
 *   variables: {
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useEventListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EventListQuery, EventListQueryVariables>) {
        return ApolloReactHooks.useQuery<EventListQuery, EventListQueryVariables>(EventListDocument, baseOptions);
      }
export function useEventListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EventListQuery, EventListQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<EventListQuery, EventListQueryVariables>(EventListDocument, baseOptions);
        }
export type EventListQueryHookResult = ReturnType<typeof useEventListQuery>;
export type EventListLazyQueryHookResult = ReturnType<typeof useEventListLazyQuery>;
export type EventListQueryResult = ApolloReactCommon.QueryResult<EventListQuery, EventListQueryVariables>;