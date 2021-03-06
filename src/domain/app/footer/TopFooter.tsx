import classNames from 'classnames';
import { IconSearch, IconStar } from 'hds-react';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import CategoryFilter from '../../../common/components/category/CategoryFilter';
import IconLink from '../../../common/components/link/IconLink';
import { Category } from '../../../common/types';
import useLocale from '../../../hooks/useLocale';
import scrollToTop from '../../../util/scrollToTop';
import { DEFAULT_SEARCH_FILTERS } from '../../eventSearch/constants';
import { getCategoryOptions, getSearchQuery } from '../../eventSearch/utils';
import Container from '../layout/Container';
import { ROUTES } from '../routes/constants';
import styles from './topFooter.module.scss';

export const testIds = {
  logo: 'top-footer-logo',
};

const TopFooter: FunctionComponent = () => {
  const { t } = useTranslation();
  const locale = useLocale();
  const { push } = useHistory();

  const handleCategoryClick = (category: Category) => {
    const search = getSearchQuery({
      ...DEFAULT_SEARCH_FILTERS,
      categories: [category.value],
    });

    push({ pathname: `/${locale}${ROUTES.EVENTS}`, search });
    scrollToTop();
  };

  const categories = getCategoryOptions(t);

  const logoLang = locale === 'sv' ? 'sv' : 'fi';

  return (
    <div className={styles.topFooterWrapper}>
      <Container>
        <div className={styles.companyInfoWrapper}>
          <div className={styles.logoWrapper}>
            <div
              data-testid={testIds.logo}
              className={classNames(styles.helsinkiLogo, styles[logoLang])}
            ></div>
            <div className={styles.appName}>{t('appName')}</div>
          </div>
          <div className={styles.iconLinkWrapper}>
            <IconLink
              icon={<IconSearch />}
              onClick={scrollToTop}
              text={t('footer.searchEvents')}
              to={`/${locale}${ROUTES.EVENTS}`}
            />
            <IconLink
              icon={<IconStar />}
              onClick={scrollToTop}
              text={t('footer.searchCollections')}
              to={`/${locale}${ROUTES.COLLECTIONS}`}
            />
          </div>
        </div>
        <div className={styles.categoriesWrapper}>
          <h2 className={styles.categoriesTitle}>
            {t('footer.titleCategories')}
          </h2>

          <div className={styles.categoriesInnerWrapper}>
            {categories.map((category) => {
              return (
                <CategoryFilter
                  key={category.value}
                  hasHorizontalPadding={true}
                  icon={category.icon}
                  onClick={handleCategoryClick}
                  text={category.text}
                  value={category.value}
                />
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TopFooter;
