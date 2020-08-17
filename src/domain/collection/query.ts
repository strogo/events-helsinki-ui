import gql from 'graphql-tag';

export const QUERY_COLLECTION_DETAILS = gql`
  fragment collectionFields on CollectionDetails {
    id
    heroImage
    boxColor
    curatedEvents
    curatedEventsTitle {
      ...localizedFields
    }
    description {
      ...localizedFields
    }
    eventListQuery {
      ...localizedFields
    }
    eventListTitle {
      ...localizedFields
    }
    linkText {
      ...localizedFields
    }
    linkUrl {
      ...localizedFields
    }
    slug
    socialMediaDescription {
      ...localizedFields
    }
    title {
      ...localizedFields
    }
  }
  query CollectionDetails($draft: Boolean, $slug: ID!) {
    collectionDetails(draft: $draft, slug: $slug) {
      ...collectionFields
    }
  }
  query CollectionList($visibleOnFrontpage: Boolean) {
    collectionList(visibleOnFrontpage: $visibleOnFrontpage) {
      data {
        ...collectionFields
      }
    }
  }
`;
