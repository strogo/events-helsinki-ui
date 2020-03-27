import { IconAngleRight, ImageWithCard } from "hds-react";
import React from "react";

import bgImage from "../../../assets/images/png/collection-background.png";
import { CollectionDetailsQuery } from "../../../generated/graphql";
import useLocale from "../../../hooks/useLocale";
import getLocalisedString from "../../../util/getLocalisedString";
import CollectionShareLinks from "../collectionShareLinks/CollectionShareLinks";
import styles from "./collectionHero.module.scss";

interface Props {
  collectionData: CollectionDetailsQuery;
}

const CollectionHero: React.FC<Props> = ({ collectionData }) => {
  const locale = useLocale();

  const title = getLocalisedString(
    collectionData.collectionDetails.title,
    locale
  );

  const subtitles = getLocalisedString(
    collectionData.collectionDetails.subtitles,
    locale
  );

  const description = getLocalisedString(
    collectionData.collectionDetails.description,
    locale
  );

  const linkUrl = getLocalisedString(
    collectionData.collectionDetails.linkUrl,
    locale
  );

  const linkText = getLocalisedString(
    collectionData.collectionDetails.linkText,
    locale
  );

  return (
    <div className={styles.collectionHero}>
      <ImageWithCard
        className={styles.imageWithCard}
        src={bgImage}
        cardLayout="hover"
        color="tertiary"
      >
        <h1>{title}</h1>
        {!!subtitles && <div className={styles.subTitle}>{subtitles}</div>}
        {!!description && <p>{description}</p>}
        {!!linkText && !!linkText && (
          <a href={linkUrl} target="_blank" rel="noopener noreferrer">
            {linkText}
            <IconAngleRight className={styles.linkIcon} />
          </a>
        )}

        <CollectionShareLinks />
      </ImageWithCard>
    </div>
  );
};

export default CollectionHero;
