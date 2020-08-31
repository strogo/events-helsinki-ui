import classNames from 'classnames';
import { IconSearch, IconStar } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useLocation } from 'react-router-dom';

import LanguageDropdown from '../../../../common/components/languageDropdown/LanguageDropdown';
import IconLink from '../../../../common/components/link/IconLink';
import { updateLocaleParam } from '../../../../common/route/RouteUtils';
import { getCurrentLanguage } from '../../../../common/translation/TranslationUtils';
import { SUPPORT_LANGUAGES } from '../../../../constants';
import useLocale from '../../../../hooks/useLocale';
import { Language } from '../../../../types';
import scrollToTop from '../../../../util/scrollToTop';
import { ROUTES } from '../../constants';
import styles from './navbar.module.scss';

const Navbar: React.FC = () => {
  const { i18n, t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const locale = useLocale();

  const languageOptions = Object.values(SUPPORT_LANGUAGES).map((language) => {
    return {
      label: t(`header.languages.${language}`),
      value: language,
    };
  });

  const handleChange = (newLanguage: Language) => {
    const currentLanguage = getCurrentLanguage(i18n);
    history.push({
      pathname: updateLocaleParam(
        location.pathname,
        currentLanguage,
        newLanguage
      ),
      search: location.search,
    });
  };

  const logoLang = locale === 'sv' ? 'sv' : 'fi';

  return (
    <div className={styles.navbarTop}>
      <div className={styles.logoWrapper}>
        <Link aria-label={t('header.ariaLabelLogo')} to={'/'}>
          <div className={classNames(styles.logo, styles[logoLang])} />
          <div className={styles.appName}>{t('appName')}</div>
        </Link>
      </div>

      <div className={styles.linkWrapper}>
        <IconLink
          icon={<IconSearch />}
          onClick={scrollToTop}
          text={t('header.searchEvents')}
          to={`/${locale}${ROUTES.EVENTS}`}
        />
        <IconLink
          icon={<IconStar />}
          onClick={scrollToTop}
          text={t('header.searchCollections')}
          to={`/${locale}${ROUTES.COLLECTIONS}`}
        />
      </div>
      <LanguageDropdown
        languageOptions={languageOptions}
        onChange={handleChange}
        value={locale}
      />
    </div>
  );
};

export default Navbar;
