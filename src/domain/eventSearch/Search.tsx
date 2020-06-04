import classNames from "classnames";
import { Button, IconLocation, IconSearch } from "hds-react";
import React, { FormEvent, FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router";

import Checkbox from "../../common/components/checkbox/Checkbox";
import DateSelector from "../../common/components/dateSelector/DateSelector";
import MultiSelectDropdown from "../../common/components/multiSelectDropdown/MultiSelectDropdown";
import SearchAutosuggest from "../../common/components/search/SearchAutosuggest";
import SearchLabel from "../../common/components/search/searchLabel/SearchLabel";
import { AutosuggestMenuOption } from "../../common/types";
import { CATEGORIES } from "../../constants";
import { useNeighborhoodListQuery } from "../../generated/graphql";
import useLocale from "../../hooks/useLocale";
import IconRead from "../../icons/IconRead";
import getLocalisedString from "../../util/getLocalisedString";
import getUrlParamAsArray from "../../util/getUrlParamAsArray";
import { getSearchQuery } from "../../util/searchUtils";
import { ROUTES } from "../app/constants";
import Container from "../app/layout/Container";
import PlaceSelector from "../place/placeSelector/PlaceSelector";
import { EVENT_SEARCH_FILTERS } from "./constants";
import FilterSummary from "./filterSummary/FilterSummary";
import styles from "./search.module.scss";

const Search: FunctionComponent = () => {
  const { search } = useLocation();
  const searchParams = React.useMemo(() => new URLSearchParams(search), [
    search
  ]);
  const { t } = useTranslation();
  const locale = useLocale();
  const [searchValue, setSearchValue] = React.useState("");
  const [dateTypes, setDateTypes] = React.useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  );
  const [keywords, setKeywords] = React.useState<string[]>([]);
  const [divisions, setDivisions] = React.useState<string[]>([]);
  const [places, setPlaces] = React.useState<string[]>([]);
  const [start, setStart] = React.useState<Date | null>(null);
  const [end, setEnd] = React.useState<Date | null>(null);
  const [isCustomDate, setIsCustomDate] = React.useState<boolean>(false);

  const publisher = searchParams.get(EVENT_SEARCH_FILTERS.PUBLISHER);
  const isFree =
    searchParams.get(EVENT_SEARCH_FILTERS.IS_FREE) === "true" ? true : false;
  const onlyChildrenEvents =
    searchParams.get(EVENT_SEARCH_FILTERS.ONLY_CHILDREN_EVENTS) === "true"
      ? true
      : false;

  const { push } = useHistory();

  const keywordNot = getUrlParamAsArray(
    searchParams,
    EVENT_SEARCH_FILTERS.KEYWORD_NOT
  );

  const { data: neighborhoodsData } = useNeighborhoodListQuery();

  const divisionOptions = React.useMemo(
    () =>
      neighborhoodsData
        ? neighborhoodsData.neighborhoodList.data
            .map(neighborhood => ({
              text: getLocalisedString(neighborhood.name, locale),
              value: neighborhood.id
            }))
            .sort((a, b) => (a.text >= b.text ? 1 : -1))
        : [],
    [locale, neighborhoodsData]
  );

  const categories = React.useMemo(
    () => [
      {
        text: t("home.category.movie"),
        value: CATEGORIES.MOVIE
      },
      {
        text: t("home.category.music"),
        value: CATEGORIES.MUSIC
      },
      {
        text: t("home.category.sport"),
        value: CATEGORIES.SPORT
      },
      {
        text: t("home.category.museum"),
        value: CATEGORIES.MUSEUM
      },
      {
        text: t("home.category.dance"),
        value: CATEGORIES.DANCE
      },
      {
        text: t("home.category.culture"),
        value: CATEGORIES.CULTURE
      },
      {
        text: t("home.category.nature"),
        value: CATEGORIES.NATURE
      },
      {
        text: t("home.category.influence"),
        value: CATEGORIES.INFLUENCE
      },
      {
        text: t("home.category.theatre"),
        value: CATEGORIES.THEATRE
      },
      {
        text: t("home.category.food"),
        value: CATEGORIES.FOOD
      },
      {
        text: t("home.category.misc"),
        value: CATEGORIES.MISC
      }
    ],
    [t]
  );

  const handleChangeDateTypes = (value: string[]) => {
    setDateTypes(value);
  };

  const toggleIsCustomDate = () => {
    setIsCustomDate(!isCustomDate);
  };

  const moveToSearchPage = React.useCallback(() => {
    const search = getSearchQuery({
      categories: selectedCategories,
      dateTypes,
      divisions,
      end,
      isFree,
      keywordNot: keywordNot,
      keywords,
      onlyChildrenEvents,
      places,
      publisher,
      start,
      text: searchValue
    });

    push({ pathname: `/${locale}${ROUTES.EVENTS}`, search });
  }, [
    dateTypes,
    divisions,
    end,
    isFree,
    keywordNot,
    keywords,
    locale,
    onlyChildrenEvents,
    places,
    publisher,
    push,
    searchValue,
    selectedCategories,
    start
  ]);

  // Initialize fields when page is loaded
  React.useEffect(() => {
    const searchVal = searchParams.get(EVENT_SEARCH_FILTERS.TEXT);
    const endTime = searchParams.get(EVENT_SEARCH_FILTERS.END);
    const startTime = searchParams.get(EVENT_SEARCH_FILTERS.START);
    const dTypes = getUrlParamAsArray(
      searchParams,
      EVENT_SEARCH_FILTERS.DATE_TYPES
    );
    const categories = getUrlParamAsArray(
      searchParams,
      EVENT_SEARCH_FILTERS.CATEGORIES
    );
    const divisions = getUrlParamAsArray(
      searchParams,
      EVENT_SEARCH_FILTERS.DIVISIONS
    );
    const keywords = getUrlParamAsArray(
      searchParams,
      EVENT_SEARCH_FILTERS.KEYWORDS
    );
    const places = getUrlParamAsArray(
      searchParams,
      EVENT_SEARCH_FILTERS.PLACES
    );

    setSearchValue(searchVal || "");

    if (endTime) {
      setEnd(new Date(endTime));
    } else {
      setEnd(null);
    }
    if (startTime) {
      setStart(new Date(startTime));
    } else {
      setStart(null);
    }

    if (endTime || startTime) {
      setIsCustomDate(true);
    } else {
      setDateTypes(dTypes);
    }

    setSelectedCategories(categories);
    setDivisions(divisions);
    setKeywords(keywords);
    setPlaces(places);
  }, [searchParams]);

  const handleMenuOptionClick = async (option: AutosuggestMenuOption) => {
    const type = option.type;
    const value = option.value;

    const newSearchValue = option.type === "search" ? option.text : "";

    // Get new keywords
    const newKeywords = getUrlParamAsArray(
      searchParams,
      EVENT_SEARCH_FILTERS.KEYWORDS
    );
    if (
      (type === "keyword" || type === "yso") &&
      !newKeywords.includes(value)
    ) {
      newKeywords.push(value);
    }

    const search = getSearchQuery({
      categories: selectedCategories,
      dateTypes,
      divisions,
      end,
      isFree,
      keywordNot,
      keywords: newKeywords,
      onlyChildrenEvents,
      places,
      publisher: searchParams.get(EVENT_SEARCH_FILTERS.PUBLISHER),
      start,
      text: newSearchValue
    });
    switch (type) {
      case "keyword":
      case "yso":
        setKeywords(newKeywords);
        break;
    }
    setSearchValue(newSearchValue);
    push({ pathname: `/${locale}${ROUTES.EVENTS}`, search });
  };

  const handleOnlyChildrenEventChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const search = getSearchQuery({
      categories: selectedCategories,
      dateTypes,
      divisions,
      end,
      isFree,
      keywordNot,
      keywords,
      onlyChildrenEvents: e.target.checked,
      places,
      publisher,
      start,
      text: searchValue
    });

    push({ pathname: `/${locale}${ROUTES.EVENTS}`, search });
  };

  const handleIsFreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = getSearchQuery({
      categories: selectedCategories,
      dateTypes,
      divisions,
      end,
      isFree: e.target.checked,
      keywordNot,
      keywords,
      onlyChildrenEvents,
      places,
      publisher,
      start,
      text: searchValue
    });

    push({ pathname: `/${locale}${ROUTES.EVENTS}`, search });
  };

  const handleSubmit = (event?: FormEvent) => {
    if (event) {
      event.preventDefault();
    }

    moveToSearchPage();
  };

  return (
    <>
      <div className={styles.searchContainer}>
        <Container>
          <form onSubmit={handleSubmit}>
            <div className={styles.searchWrapper}>
              <div className={styles.rowWrapper}>
                <div className={classNames(styles.row, styles.autoSuggestRow)}>
                  <div>
                    <SearchLabel color="black" htmlFor="search">
                      {t("eventSearch.search.labelSearchField")}
                    </SearchLabel>
                    <SearchAutosuggest
                      categories={[]}
                      name="search"
                      onChangeSearchValue={setSearchValue}
                      onOptionClick={handleMenuOptionClick}
                      placeholder={t("eventSearch.search.placeholder")}
                      searchValue={searchValue}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.rowWrapper}>
                <div className={styles.row}>
                  <div>
                    <MultiSelectDropdown
                      checkboxName="categoryOptions"
                      icon={<IconRead />}
                      name="category"
                      onChange={setSelectedCategories}
                      options={categories}
                      title={t("eventSearch.search.titleDropdownCategory")}
                      value={selectedCategories}
                    />
                  </div>
                  <div className={styles.dateSelectorWrapper}>
                    <DateSelector
                      dateTypes={dateTypes}
                      endDate={end}
                      isCustomDate={isCustomDate}
                      name="date"
                      onChangeDateTypes={handleChangeDateTypes}
                      onChangeEndDate={setEnd}
                      onChangeStartDate={setStart}
                      startDate={start}
                      toggleIsCustomDate={toggleIsCustomDate}
                    />
                  </div>
                  <div>
                    <MultiSelectDropdown
                      checkboxName="divisionOptions"
                      icon={<IconLocation />}
                      name="division"
                      onChange={setDivisions}
                      options={divisionOptions}
                      selectAllText={t("eventSearch.search.selectAllDivisions")}
                      showSelectAll={true}
                      title={t("eventSearch.search.titleDropdownDivision")}
                      value={divisions}
                    />
                  </div>
                  <div>
                    <PlaceSelector
                      name="places"
                      setPlaces={setPlaces}
                      value={places}
                    />
                  </div>
                </div>
                <div className={styles.buttonWrapper}>
                  <Button
                    fullWidth={true}
                    iconLeft={<IconSearch />}
                    onClick={moveToSearchPage}
                    variant="success"
                  >
                    {t("eventSearch.search.buttonSearch")}
                  </Button>
                </div>
              </div>
              <div className={styles.rowWrapper}>
                <div className={styles.row}>
                  <div>
                    <Checkbox
                      className={styles.checkbox}
                      checked={onlyChildrenEvents}
                      id={EVENT_SEARCH_FILTERS.ONLY_CHILDREN_EVENTS}
                      label={t("eventSearch.search.checkboxOnlyChildrenEvents")}
                      onChange={handleOnlyChildrenEventChange}
                    />
                  </div>
                  <div>
                    <Checkbox
                      className={styles.checkbox}
                      checked={isFree}
                      id={EVENT_SEARCH_FILTERS.IS_FREE}
                      label={t("eventSearch.search.checkboxIsFree")}
                      onChange={handleIsFreeChange}
                    />
                  </div>
                </div>
              </div>
              <FilterSummary />
            </div>
          </form>
        </Container>
      </div>
    </>
  );
};

export default Search;
