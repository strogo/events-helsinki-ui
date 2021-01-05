import classNames from 'classnames';
import { Button } from 'hds-react';
import capitalize from 'lodash/capitalize';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import SearchAutosuggest from '../../../common/components/search/SearchAutosuggest';
import { AutosuggestMenuOption, Category } from '../../../common/types';
import useLocale from '../../../hooks/useLocale';
import { EVENTS_ROUTE_MAPPER, EventType } from '../../event/types';
import { EVENT_DEFAULT_SEARCH_FILTERS } from '../../eventSearch/constants';
import { getSearchQuery } from '../../eventSearch/utils';
import styles from './landingPageSearchSection.module.scss';

const Search: React.FC<{
  title: string;
  searchPlaceholder: string;
  type: EventType;
  handleCategoryClick?: (category: Category) => void;
}> = ({ type, title, searchPlaceholder, handleCategoryClick }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const [autosuggestInput, setAutosuggestInput] = React.useState('');
  const { push } = useHistory();

  const goToSearchPage = (search: string) => {
    push({
      pathname: `/${locale}${EVENTS_ROUTE_MAPPER[type]}`,
      search,
      state: { scrollToResults: true },
    });
  };

  const handleSubmit = () => {
    const search = getSearchQuery({
      ...EVENT_DEFAULT_SEARCH_FILTERS,
      text: autosuggestInput ? [autosuggestInput] : [],
    });

    goToSearchPage(search);
  };

  const handleMenuOptionClick = (option: AutosuggestMenuOption) => {
    const search = getSearchQuery({
      ...EVENT_DEFAULT_SEARCH_FILTERS,
      text: [option.text],
    });
    goToSearchPage(search);
  };

  // const handleCategoryClick = (category: Category) => {
  //   const search = getSearchQuery({
  //     ...EVENT_DEFAULT_SEARCH_FILTERS,
  //     categories: [category.value],
  //   });

  //   goToSearchPage(search);
  // };

  return (
    <div
      className={classNames(
        styles.landingPageSearchWrapper,
        styles[`type${capitalize(type)}`]
      )}
    >
      <div className={styles.landingPageSearch}>
        <div className={styles.searchRow}>
          <div className={styles.titleWrapper}>
            <h2>{title}</h2>
          </div>
          <div className={styles.autosuggestWrapper}>
            <SearchAutosuggest
              name={`${type}Search`}
              onChangeSearchValue={setAutosuggestInput}
              onOptionClick={handleMenuOptionClick}
              placeholder={searchPlaceholder}
              searchValue={autosuggestInput}
            />
            <Button onClick={handleSubmit} variant="success">
              {t('home.search.buttonSearch')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;