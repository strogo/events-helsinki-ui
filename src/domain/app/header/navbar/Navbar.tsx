import { IconSearch } from "hds-react";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import IconLink from "../../../../common/components/link/IconLink";
import useLocale from "../../../../hooks/useLocale";
import IconStar from "../../../../icons/IconStar";
import LanguageDropdown from "./languageDropdown/LanguageDropdown";
import styles from "./navbar.module.scss";

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const locale = useLocale();
  const history = useHistory();

  return (
    <div className={styles.navbarTop}>
      <div className={styles.logoWrapper}>
        <div className={styles.logo} onClick={() => history.push("/")}></div>
        <h1 className={styles.appName}>{t("appName")}</h1>
      </div>
      <div className={styles.linkWrapper}>
        <IconLink
          icon={<IconSearch />}
          text={t("header.searchEvents")}
          to={`/${locale}/events`}
        />
        <IconLink
          icon={<IconStar />}
          text={t("header.searchCollections")}
          to={`/${locale}/collections`}
        />
      </div>
      <LanguageDropdown />
    </div>
  );
};

export default Navbar;
