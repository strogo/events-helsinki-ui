import gql from "graphql-tag";

export const QUERY_EVENT_LIST = gql`
  query EventList(
    $divisions: [String]
    $endDate: String
    $include: [String]
    $inLanguage: String
    $isFree: Boolean
    $keywordNot: [String]
    $keywords: [String]
    $language: String
    $locations: [String]
    $page: Int
    $pageSize: Int
    $publisher: ID
    $sort: String
    $startDate: String
    $superEvent: ID
    $superEventType: [String]
    $text: String
    $translation: String
  ) {
    eventList(
      divisions: $divisions
      endDate: $endDate
      include: $include
      inLanguage: $inLanguage
      isFree: $isFree
      keywordNot: $keywordNot
      keywords: $keywords
      language: $language
      locations: $locations
      page: $page
      pageSize: $pageSize
      publisher: $publisher
      sort: $sort
      startDate: $startDate
      superEvent: $superEvent
      superEventType: $superEventType
      text: $text
      translation: $translation
    ) {
      meta {
        count
        next
        previous
      }
      data {
        id
        eventStatus
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
          id
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
          description {
            fi
            sv
            en
          }
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

  query EventsByIds($ids: [ID!]!, $include: [String]) {
    eventsByIds(ids: $ids, include: $include) {
      id
      eventStatus
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
        id
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
        description {
          fi
          sv
          en
        }
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
`;
