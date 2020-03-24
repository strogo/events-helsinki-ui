import { format as formatDateStr, utcToZonedTime } from "date-fns-tz";
import isAfter from "date-fns/isAfter";
import isValid from "date-fns/isValid";
import { enGB as en, fi } from "date-fns/locale";
import parse from "date-fns/parse";
import get from "lodash/get";

import sv from "./date-fns/locale/sv";

const locales = { en, fi, sv };
/**
 * Format date string
 * @param date
 * @param format
 * @returns {string}
 */
export const formatDate = (
  date: Date | null,
  format = "dd.MM.yyyy",
  locale = "fi"
): string => {
  if (!date) {
    return "";
  }

  const timeZone = "Europe/Helsinki";
  const d = utcToZonedTime(date, timeZone);

  return formatDateStr(d, format, {
    locale: get(locales, locale),
    timeZone: timeZone
  }).trim();
};

/**
 * Test is date valid
 * @param date
 * @returns {boolean}
 */
const isValidDate = (date: Date): boolean =>
  isValid(date) && isAfter(date, new Date("1000-01-01"));

/**
 * Test is entered string a date string in Finnish format without dots (e.g. 31122019)
 * @param str
 * @returns {boolean}
 */
const isShortDateStr = (str: string) =>
  str.length === 8 && /^[0-9.]+$/.test(str);

/**
 * Convert date string without dots to Finnish date string format (e.g. 31.12.2019)
 * @param str
 * @returns {object}
 */
const getShortDateStr = (str: string): string =>
  [str.substring(0, 2), str.substring(2, 4), str.substring(4, 9)].join(".");

/**
 * Get date object from valid Finnish date string
 * @param value
 * @returns {object}
 */
const getParsedDate = (value: string): Date =>
  parse(value, "dd.MM.yyyy", new Date(), { locale: fi });

/**
 * Convert string in Finnish date format (e.g. 31.12.2019) or in format without dots (e.g. 31122019) to Date object
 * @param value
 * @returns {object}
 */
export const convertFinnishDateStrToDate = (str: string) => {
  let parsedDate = getParsedDate(str);

  if (isValidDate(parsedDate)) {
    return parsedDate;
  } else if (isShortDateStr(str)) {
    const dateStr = getShortDateStr(str);

    parsedDate = getParsedDate(dateStr);

    if (isValidDate(parsedDate)) {
      return parsedDate;
    }
  }
  return null;
};
