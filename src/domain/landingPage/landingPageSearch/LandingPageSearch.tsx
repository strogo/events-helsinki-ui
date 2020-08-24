import { Button, IconSearch, IconSpeechbubbleText } from 'hds-react';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import CategoryFilter from '../../../common/components/category/CategoryFilter';
import DateSelector from '../../../common/components/dateSelector/DateSelector';
import Link from '../../../common/components/link/Link';
import MobileDateSelector from '../../../common/components/mobileDateSelector/MobileDateSelector';
import SearchAutosuggest from '../../../common/components/search/SearchAutosuggest';
import SearchLabel from '../../../common/components/search/searchLabel/SearchLabel';
import { AutosuggestMenuOption, Category } from '../../../common/types';
import { CATEGORIES } from '../../../constants';
import useLocale from '../../../hooks/useLocale';
import IconCultureAndArts from '../../../icons/IconCultureAndArts';
import IconDance from '../../../icons/IconDance';
import IconFood from '../../../icons/IconFood';
import IconMovies from '../../../icons/IconMovies';
import IconMuseum from '../../../icons/IconMuseum';
import IconMusic from '../../../icons/IconMusic';
import IconSports from '../../../icons/IconSports';
import IconTheatre from '../../../icons/IconTheatre';
import IconTree from '../../../icons/IconTree';
import { ROUTES } from '../../app/constants';
import { DEFAULT_SEARCH_FILTERS } from '../../eventSearch/constants';
import { getSearchQuery } from '../../eventSearch/utils';
import styles from './landingPageSearch.module.scss';

const Search: FunctionComponent = () => {
  const { t } = useTranslation();
  const locale = useLocale();
  const [dateTypes, setDateTypes] = React.useState<string[]>([]);
  const [start, setStart] = React.useState<Date | null>(null);
  const [end, setEnd] = React.useState<Date | null>(null);
  const [isCustomDate, setIsCustomDate] = React.useState<boolean>(false);
  const [autosuggestInput, setAutosuggestInput] = React.useState('');
  const { push } = useHistory();

  const handleCategoryClick = (category: Category) => {
    const search = getSearchQuery({
      ...DEFAULT_SEARCH_FILTERS,
      categories: [category.value],
      dateTypes,
      end,
      start,
    });

    push({ pathname: `/${locale}${ROUTES.EVENTS}`, search });
  };

  const categories = React.useMemo(() => {
    return [
      {
        icon: <IconMovies />,
        text: t('home.category.movie'),
        value: CATEGORIES.MOVIE,
      },
      {
        icon: <IconMusic />,
        text: t('home.category.music'),
        value: CATEGORIES.MUSIC,
      },
      {
        icon: <IconSports />,
        text: t('home.category.sport'),
        value: CATEGORIES.SPORT,
      },
      {
        icon: <IconMuseum />,
        text: t('home.category.museum'),
        value: CATEGORIES.MUSEUM,
      },
      {
        icon: <IconDance />,
        text: t('home.category.dance'),
        value: CATEGORIES.DANCE,
      },
      {
        icon: <IconCultureAndArts />,
        text: t('home.category.culture'),
        value: CATEGORIES.CULTURE,
      },
      {
        icon: <IconTree />,
        text: t('home.category.nature'),
        value: CATEGORIES.NATURE,
      },
      {
        icon: <IconSpeechbubbleText />,
        text: t('home.category.influence'),
        value: CATEGORIES.INFLUENCE,
      },
      {
        icon: <IconTheatre />,
        text: t('home.category.theatre'),
        value: CATEGORIES.THEATRE,
      },
      {
        className: styles.categoryFood,
        icon: <IconFood />,
        text: t('home.category.food'),
        value: CATEGORIES.FOOD,
      },
    ];
  }, [t]);

  const handleChangeDateTypes = (value: string[]) => {
    setDateTypes(value);
  };

  const toggleIsCustomDate = () => {
    setIsCustomDate(!isCustomDate);
  };

  const moveToSearchPage = React.useCallback(() => {
    const search = getSearchQuery({
      ...DEFAULT_SEARCH_FILTERS,
      dateTypes,
      end,
      start,
      text: autosuggestInput ? [autosuggestInput] : [],
    });

    push({ pathname: `/${locale}${ROUTES.EVENTS}`, search });
  }, [autosuggestInput, dateTypes, end, locale, push, start]);

  const handleMenuOptionClick = (option: AutosuggestMenuOption) => {
    const value = option.text;

    const search = getSearchQuery({
      ...DEFAULT_SEARCH_FILTERS,
      dateTypes,
      end,
      start,
      text: value ? [value] : [],
    });

    push({ pathname: `/${locale}${ROUTES.EVENTS}`, search });
  };

  return (
    <>
      <div className={styles.landingPageSearch}>
        {/* Hide Suprise me button on MVP version */}
        {/* <SupriseMeButton onClick={handleClickSupriseMe} /> */}
        <div className={styles.searchRow}>
          <div className={styles.titleWrapper}>
            <h2>{t('home.search.title')}</h2>
          </div>
          <div className={styles.autosuggestWrapper}>
            <SearchLabel htmlFor={'search'}>
              {t('home.search.labelSearchField')}
            </SearchLabel>
            <SearchAutosuggest
              name="search"
              onChangeSearchValue={setAutosuggestInput}
              onOptionClick={handleMenuOptionClick}
              placeholder={t('home.search.placeholder')}
              searchValue={autosuggestInput}
            />
          </div>
          <div className={styles.dateAndButtonWrapper}>
            <div className={styles.dateSelectorWrapper}>
              <SearchLabel color="black" htmlFor="date" srOnly={true}>
                {t('home.search.labelDateRange')}
              </SearchLabel>
              <div className={styles.desktopDateSelector}>
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
              <MobileDateSelector
                dateTypes={dateTypes}
                endDate={end}
                name={'mobile_date'}
                onChangeDateTypes={handleChangeDateTypes}
                onChangeEndDate={setEnd}
                onChangeStartDate={setStart}
                startDate={start}
              />
            </div>
            <div className={styles.buttonWrapper}>
              <Button
                fullWidth={true}
                iconLeft={<IconSearch />}
                onClick={moveToSearchPage}
                variant="success"
              >
                {t('home.search.buttonSearch')}
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.linkRow}>
          <Link color="white" size="small" to={`/${locale}${ROUTES.EVENTS}`}>
            {t('home.search.linkAdvancedSearch')}
          </Link>
        </div>
      </div>
      <div className={styles.categoriesWrapper}>
        {categories.map(category => {
          return (
            <CategoryFilter
              className={category.className}
              key={category.value}
              icon={category.icon}
              onClick={handleCategoryClick}
              text={category.text}
              value={category.value}
            />
          );
        })}
      </div>
    </>
  );
};

export default Search;
