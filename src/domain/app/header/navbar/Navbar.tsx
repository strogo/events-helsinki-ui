import * as React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { ReactComponent as SearchIcon } from "../../../../assets/icons/svg/search.svg";
import { ReactComponent as SmileIcon } from "../../../../assets/icons/svg/smile.svg";
import IconLink from "../../../../common/components/link/IconLink";
import getLocale from "../../../../util/getLocale";
import LanguageDropdown from "./languageDropdown/LanguageDropdown";
import styles from "./navbar.module.scss";

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const locale = getLocale();
  const history = useHistory();

  return (
    <div className={styles.navbarTop}>
      <div className={styles.logoWrapper}>
        <div className={styles.logo} onClick={() => history.push("/")}></div>
        <h1 className={styles.appName}>{t("appName")}</h1>
      </div>
      <div className={styles.linkWrapper}>
        <IconLink
          icon={<SearchIcon />}
          text={t("header.searchEvents")}
          to={`/${locale}/events`}
        />
        <IconLink
          icon={<SmileIcon />}
          text={t("header.searchCollections")}
          to={`/${locale}/collections`}
        />
      </div>
      <LanguageDropdown />
    </div>
  );
};

export default Navbar;