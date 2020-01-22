import { IconArrowRight } from "hds-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router";

import Keyword from "../../common/components/keyword/Keyword";
import useLocale from "../../hooks/useLocale";
import getDateRangeStr from "../../util/getDateRangeStr";
import getLocalisedString from "../../util/getLocalisedString";
import getTimeRangeStr from "../../util/getTimeRangeStr";
import EventKeywords from "../event/EventKeywords";
import LocationText from "../event/EventLocationText";
import { getEventPrice, isEventFree } from "../event/EventUtils";
import { EventInList } from "../event/types";
import styles from "./similarEventCard.module.scss";

interface Props {
  event: EventInList;
}

const SimilarEventCard: React.FC<Props> = ({ event }) => {
  const { search } = useLocation();
  const { t } = useTranslation();
  const { push } = useHistory();
  const locale = useLocale();

  const image = event.images.length ? event.images[0] : null;
  const name = event.name;
  const startTime = event.startTime;
  const endTime = event.endTime;

  const moveToEventPage = () => {
    push({ pathname: `/${locale}/event/${event.id}${search}` });
  };

  return (
    <div className={styles.similarEventCard}>
      <div
        className={styles.imageWrapper}
        style={{ backgroundImage: image ? `url(${image.url})` : undefined }}
      >
        <div className={styles.tagWrapperDesktop}>
          <div className={styles.priceWrapper}>
            {isEventFree(event) && (
              <Keyword
                color="tramLight20"
                keyword={t("eventSearch.event.offers.isFree")}
              />
            )}
          </div>

          <div className={styles.categoryWrapper}>
            <EventKeywords event={event} showIsFree={false} />
          </div>
        </div>
      </div>
      <div className={styles.infoWrapper}>
        <div>
          <div className={styles.categoryWrapperMobile}>
            <EventKeywords event={event} showIsFree={true} />
          </div>
          <div className={styles.textWrapper}>
            <div className={styles.eventDateAndTime}>
              {!!startTime &&
                `${getDateRangeStr(
                  startTime,
                  endTime,
                  locale,
                  false
                )} ${getTimeRangeStr(startTime, endTime, locale)}`}
            </div>
            <div className={styles.eventName}>
              {getLocalisedString(name, locale)}
            </div>
            <div className={styles.eventLocation}>
              <LocationText
                event={event}
                showDistrict={false}
                showLocationName={true}
              />
            </div>
            <div className={styles.eventPrice}>
              {getEventPrice(
                event,
                locale,
                t("eventSearch.event.offers.isFree")
              )}
            </div>
          </div>
        </div>
        <div className={styles.buttonWrapper}>
          <button onClick={moveToEventPage}>
            <IconArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimilarEventCard;
