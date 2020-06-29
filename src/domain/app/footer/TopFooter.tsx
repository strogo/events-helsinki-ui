import classNames from "classnames";
import { IconSearch, IconSpeechbubbleText, IconStar } from "hds-react";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

import CategoryFilter from "../../../common/components/category/CategoryFilter";
import IconLink from "../../../common/components/link/IconLink";
import { useMobileMenuContext } from "../../../common/components/mobileMenu/MobileMenu";
import { Category } from "../../../common/types";
import { CATEGORIES } from "../../../constants";
import useLocale from "../../../hooks/useLocale";
import IconCultureAndArts from "../../../icons/IconCultureAndArts";
import IconDance from "../../../icons/IconDance";
import IconFood from "../../../icons/IconFood";
import IconMovies from "../../../icons/IconMovies";
import IconMuseum from "../../../icons/IconMuseum";
import IconMusic from "../../../icons/IconMusic";
import IconSports from "../../../icons/IconSports";
import IconTheatre from "../../../icons/IconTheatre";
import IconTree from "../../../icons/IconTree";
import scrollToTop from "../../../util/scrollToTop";
import { getSearchQuery } from "../../../util/searchUtils";
import { ROUTES } from "../constants";
import Container from "../layout/Container";
import styles from "./topFooter.module.scss";

const TopFooter: FunctionComponent = () => {
  const { isMobileMenuOpen } = useMobileMenuContext();
  const { t } = useTranslation();
  const locale = useLocale();
  const { push } = useHistory();

  const handleCategoryClick = (category: Category) => {
    const search = getSearchQuery({
      categories: [category.value],
      dateTypes: [],
      divisions: [],
      end: null,
      isFree: false,
      keywordNot: [],
      keywords: [],
      places: [],
      publisher: null,
      start: null,
      text: ""
    });

    push({ pathname: `/${locale}${ROUTES.EVENTS}`, search });
    scrollToTop();
  };

  const categories = React.useMemo(() => {
    return [
      {
        icon: <IconMovies />,
        text: t("home.category.movie"),
        value: CATEGORIES.MOVIE
      },
      {
        icon: <IconMusic />,
        text: t("home.category.music"),
        value: CATEGORIES.MUSIC
      },
      {
        icon: <IconSports />,
        text: t("home.category.sport"),
        value: CATEGORIES.SPORT
      },
      {
        icon: <IconMuseum />,
        text: t("home.category.museum"),
        value: CATEGORIES.MUSEUM
      },
      {
        icon: <IconDance />,
        text: t("home.category.dance"),
        value: CATEGORIES.DANCE
      },
      {
        icon: <IconCultureAndArts />,
        text: t("home.category.culture"),
        value: CATEGORIES.CULTURE
      },
      {
        icon: <IconTree />,
        text: t("home.category.nature"),
        value: CATEGORIES.NATURE
      },
      {
        icon: <IconSpeechbubbleText />,
        text: t("home.category.influence"),
        value: CATEGORIES.INFLUENCE
      },
      {
        icon: <IconTheatre />,
        text: t("home.category.theatre"),
        value: CATEGORIES.THEATRE
      },
      {
        icon: <IconFood />,
        text: t("home.category.food"),
        value: CATEGORIES.FOOD
      }
    ];
  }, [t]);

  return (
    <div
      aria-hidden={isMobileMenuOpen}
      className={classNames(styles.topFooterWrapper, {
        [styles.mobileMenuOpen]: isMobileMenuOpen
      })}
    >
      <Container>
        <div className={styles.companyInfoWrapper}>
          <div className={styles.logoWrapper}>
            <div className={styles.helsinkiLogo}></div>
            <div className={styles.appName}>{t("appName")}</div>
          </div>
          <div className={styles.iconLinkWrapper}>
            <IconLink
              icon={<IconSearch />}
              onClick={scrollToTop}
              text={t("footer.searchEvents")}
              to={`/${locale}${ROUTES.EVENTS}`}
            />
            <IconLink
              icon={<IconStar />}
              onClick={scrollToTop}
              text={t("footer.searchCollections")}
              to={`/${locale}${ROUTES.COLLECTIONS}`}
            />
          </div>
        </div>
        <div className={styles.categoriesWrapper}>
          <h2 className={styles.categoriesTitle}>
            {t("footer.titleCategories")}
          </h2>

          <div className={styles.categoriesInnerWrapper}>
            {categories.map(category => {
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
