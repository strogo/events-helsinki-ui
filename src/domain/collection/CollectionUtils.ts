import { CollectionDetails } from "../../generated/graphql";
import { Language } from "../../types";
import { COLLECTION_DEFAULT_IMAGE, HERO_BACKGROUND_COLOR } from "./constants";
import { CollectionInList } from "./types";

/**
 * Get hero text content background color
 * @param {object} collection
 * @return {string}
 */
export const getHeroBackgroundColor = (
  collection: CollectionDetails
): string => {
  switch (collection.boxColor) {
    case HERO_BACKGROUND_COLOR.COPPER:
    case HERO_BACKGROUND_COLOR.ENGEL:
    case HERO_BACKGROUND_COLOR.FOG:
    case HERO_BACKGROUND_COLOR.SUOMENLINNA:
      return collection.boxColor.toLowerCase();
    default:
      return HERO_BACKGROUND_COLOR.ENGEL.toLowerCase();
  }
};

/**
 * Get hero text content background image
 * @param {object} collection
 * @return {string}
 */
export const getHeroBackgroundImage = (
  collection: CollectionDetails
): string => {
  return collection.heroImage || COLLECTION_DEFAULT_IMAGE;
};

/**
 * Test is collection supported in selected language
 * @param {object} collection
 * @param {string} language
 * @return {boolean}
 */
export const isLanguageSupported = (
  collection: CollectionInList,
  language: Language
) => {
  return !!collection.title[language];
};