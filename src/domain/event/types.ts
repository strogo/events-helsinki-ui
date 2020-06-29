import {
  Division,
  EventDetails,
  Image,
  Keyword,
  LocalizedObject,
  Maybe,
  Offer
} from "../../generated/graphql";

type OfferInList = Pick<Offer, "isFree"> & {
  description: Maybe<LocalizedObject>;
  price: Maybe<LocalizedObject>;
  infoUrl: Maybe<LocalizedObject>;
};

type KeywordInList = Pick<Keyword, "id"> & {
  name: Maybe<LocalizedObject>;
};

type LocationInList = {
  addressLocality: Maybe<LocalizedObject>;
  divisions: Maybe<
    Array<
      Pick<Division, "type"> & {
        name: Maybe<LocalizedObject>;
      }
    >
  >;
  name: Maybe<LocalizedObject>;
  streetAddress: Maybe<LocalizedObject>;
};

export type EventUiKeyword = {
  id: string;
  name: string;
};
