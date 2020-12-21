import * as Sentry from '@sentry/browser';
import { saveAs } from 'file-saver';
import {
  Button,
  IconAngleRight,
  IconCalendarClock,
  IconGlobe,
  IconGroup,
  IconInfoCircle,
  IconLocation,
  IconTicket,
} from 'hds-react';
import { createEvent, EventAttributes } from 'ics';
import isNil from 'lodash/isNil';
import React from 'react';
import { useTranslation } from 'react-i18next';

import InfoWithIcon from '../../../common/components/infoWithIcon/InfoWithIcon';
import Link from '../../../common/components/link/Link';
import linkStyles from '../../../common/components/link/link.module.scss';
import Visible from '../../../common/components/visible/Visible';
import useLocale from '../../../hooks/useLocale';
import IconDirections from '../../../icons/IconDirections';
import getDateArray from '../../../util/getDateArray';
import getDateRangeStr from '../../../util/getDateRangeStr';
import getDomain from '../../../util/getDomain';
import { translateValue } from '../../../util/translateUtils';
import { ROUTES } from '../../app/routes/constants';
import { getEventFields, getEventPrice, getServiceMapUrl } from '../EventUtils';
import { EventFields, EventType } from '../types';
import styles from './eventInfo.module.scss';
import OrganizationInfo from './OrganizationInfo';
import OtherCourseTimesContainer from './otherEventTimes/OtherCourseTimesContainer';
import OtherEventTimesContainer from './otherEventTimes/OtherEventTimesContainer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDefined = (value: any) => !isNil(value);

interface Props {
  event: EventFields;
  eventType: EventType;
}

const EventInfo: React.FC<Props> = ({ event, eventType }) => {
  const { t } = useTranslation();
  const locale = useLocale();

  const {
    addressLocality,
    district,
    email,
    endTime,
    externalLinks,
    googleDirectionsLink,
    hslDirectionsLink,
    infoUrl,
    languages,
    locationName,
    name,
    offerInfoUrl,
    shortDescription,
    startTime,
    streetAddress,
    telephone,
    audience,
    maximumAttendeeCapacity,
    minimumAttendeeCapacity,
    remainingAttendeeCapacity,
  } = getEventFields(event, locale);
  const eventPriceText = getEventPrice(
    event,
    locale,
    t('event.info.offers.isFree')
  );

  const courseInfoRows = [
    {
      value: minimumAttendeeCapacity,
      label: t('event.info.labelMinAttendeeCapacity'),
    },
    {
      value: maximumAttendeeCapacity,
      label: t('event.info.labelMaxAttendeeCapacity'),
    },
    {
      value: remainingAttendeeCapacity,
      label: t('event.info.labelSeatsLeft'),
    },
  ].filter(({ value }) => isDefined(value));

  const showOtherInfo = Boolean(
    email ||
      externalLinks.length ||
      infoUrl ||
      telephone ||
      courseInfoRows.length
  );

  const moveToBuyTicketsPage = () => {
    window.open(offerInfoUrl);
  };

  const downloadIcsFile = () => {
    if (startTime) {
      const domain = getDomain();
      const icsEvent: EventAttributes = {
        description: t('event.info.textCalendarLinkDescription', {
          description: shortDescription,
          link: `${domain}/${locale}${ROUTES.EVENT.replace(':id', event.id)}`,
        }),
        end: endTime ? getDateArray(endTime) : getDateArray(startTime),
        location: [locationName, streetAddress, district, addressLocality]
          .filter((e) => e)
          .join(', '),
        productId: domain,
        start: getDateArray(startTime),
        startOutputType: 'local',
        title: name,
      };
      createEvent(icsEvent, (error: Error | undefined, value: string) => {
        if (error) {
          Sentry.captureException(error);
        } else {
          const blob = new Blob([value], { type: 'text/calendar' });
          saveAs(blob, `event_${event.id.replace(/:/g, '')}.ics`);
        }
      });
    }
  };

  return (
    <div className={styles.eventInfo}>
      <div className={styles.contentWrapper}>
        {/* Date info */}
        <InfoWithIcon
          icon={<IconCalendarClock aria-hidden />}
          title={t('event.info.labelDateAndTime')}
        >
          {!!startTime && (
            <>
              {getDateRangeStr({
                start: startTime,
                end: endTime,
                locale,
                includeTime: true,
                timeAbbreviation: t('commons.timeAbbreviation'),
              })}
              <button className={linkStyles.link} onClick={downloadIcsFile}>
                {t('event.info.buttonAddToCalendar')}
                <IconAngleRight aria-hidden />
              </button>
            </>
          )}
        </InfoWithIcon>

        {/* Other event times */}
        {eventType === EventType.EVENT ? (
          <OtherEventTimesContainer event={event} />
        ) : eventType === EventType.COURSE ? (
          <OtherCourseTimesContainer event={event} />
        ) : null}

        {/* Location info */}
        <InfoWithIcon
          icon={<IconLocation aria-hidden />}
          title={t('event.info.labelLocation')}
        >
          <Visible below="sm">
            {[locationName, streetAddress, district, addressLocality]
              .filter((e) => e)
              .join(', ')}
          </Visible>
          <Visible above="sm">
            {[locationName, streetAddress, district, addressLocality]
              .filter((e) => e)
              .map((item) => {
                return <div key={item}>{item}</div>;
              })}
          </Visible>
          <Link isExternal={true} to={getServiceMapUrl(event, locale, false)}>
            {t('event.info.openMap')}
          </Link>
        </InfoWithIcon>

        {/* Audience */}
        {!!audience.length && (
          <InfoWithIcon
            icon={<IconGroup />}
            title={t('event.info.labelAudience')}
          >
            {audience.map((item) => (
              <div key={item.id}>{item.name}</div>
            ))}
          </InfoWithIcon>
        )}

        {/* Languages */}
        {!!languages.length && (
          <InfoWithIcon
            icon={<IconGlobe aria-hidden />}
            title={t('event.info.labelLanguages')}
          >
            <div>{languages.join(', ')}</div>
          </InfoWithIcon>
        )}

        {/* Other info */}
        {showOtherInfo && (
          <InfoWithIcon
            icon={<IconInfoCircle aria-hidden />}
            title={t('event.info.labelOtherInfo')}
          >
            {[email, telephone]
              .filter((e) => e)
              .map((item) => (
                <div key={item}>{item}</div>
              ))}

            {infoUrl && (
              <Link isExternal={true} to={infoUrl}>
                {t('event.info.linkWebPage')}
              </Link>
            )}
            {courseInfoRows.map((row) => (
              <div key={row.label}>
                {row.label}: {row.value}
              </div>
            ))}
            {externalLinks.map((externalLink, index) => {
              return (
                !!externalLink.link && (
                  <Link key={index} isExternal={true} to={externalLink.link}>
                    {translateValue(
                      'event.info.',
                      externalLink.name as string,
                      t
                    )}
                  </Link>
                )
              );
            })}
          </InfoWithIcon>
        )}

        {/* Directions */}
        <InfoWithIcon
          icon={<IconDirections aria-hidden />}
          title={t('event.info.labelDirections')}
        >
          <Link isExternal={true} to={googleDirectionsLink}>
            {t('event.info.directionsGoogle')}
          </Link>
          <Link isExternal={true} to={hslDirectionsLink}>
            {t('event.info.directionsHSL')}
          </Link>
        </InfoWithIcon>

        {/* Organization info */}
        <OrganizationInfo event={event} eventType={eventType} />

        {/* Price info */}
        <Visible below="sm">
          <InfoWithIcon
            icon={<IconTicket aria-hidden />}
            title={t('event.info.labelPrice')}
          >
            {eventPriceText || '-'}
          </InfoWithIcon>
        </Visible>

        {offerInfoUrl && (
          <Visible below="sm" className={styles.buyButtonWrapper}>
            <Button
              aria-label={t('event.info.ariaLabelBuyTickets')}
              fullWidth={true}
              onClick={moveToBuyTicketsPage}
              variant="success"
            >
              {t('event.info.buttonBuyTickets')}
            </Button>
          </Visible>
        )}
      </div>
    </div>
  );
};

export default EventInfo;
