import { Button, IconArrowLeft, IconLocation, IconTicket } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';

import IconButton from '../../../common/components/iconButton/IconButton';
import InfoWithIcon from '../../../common/components/infoWithIcon/InfoWithIcon';
import Responsive from '../../../common/components/responsive/Responsive';
import { EventFieldsFragment } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import getDateRangeStr from '../../../util/getDateRangeStr';
import testImage from '../../../util/testImage';
import { ROUTES } from '../../app/constants';
import Container from '../../app/layout/Container';
import EventKeywords from '../eventKeywords/EventKeywords';
import LocationText from '../eventLocation/EventLocationText';
import EventName from '../eventName/EventName';
import { getEventFields, getEventPrice } from '../EventUtils';
import styles from './eventHero.module.scss';

interface Props {
  event: EventFieldsFragment;
}

const EventHero: React.FC<Props> = ({ event }) => {
  const { t } = useTranslation();
  const [showBackupImage, setShowBackupImage] = React.useState(false);
  const locale = useLocale();
  const history = useHistory();
  const { search } = useLocation();

  const {
    endTime,
    imageUrl,
    keywords,
    offerInfoUrl,
    placeholderImage,
    shortDescription,
    startTime,
    today,
    thisWeek,
    showBuyButton,
  } = getEventFields(event, locale);
  const eventPriceText = getEventPrice(
    event,
    locale,
    t('event.hero.offers.isFree')
  );

  const showKeywords = Boolean(today || thisWeek || keywords.length);

  const goToEventList = () => {
    history.push({
      pathname: `/${locale}${ROUTES.EVENTS}`,
      search,
      state: { eventId: event.id },
    });
  };

  const goToBuyTicketsPage = () => {
    window.open(offerInfoUrl);
  };

  React.useEffect(() => {
    if (imageUrl) {
      const testThatImageExist = async () => {
        try {
          await testImage(imageUrl);
        } catch {
          setShowBackupImage(true);
        }
      };

      testThatImageExist();
    }
  }, [imageUrl]);

  return (
    <div className={styles.heroWrapper}>
      <Container>
        <div className={styles.contentWrapper}>
          <div className={styles.backButtonWrapper}>
            <IconButton
              ariaLabel={t('event.hero.ariaLabelBackButton')}
              backgroundColor="white"
              icon={<IconArrowLeft />}
              onClick={goToEventList}
              size="default"
            />
          </div>
          <div>
            <div
              className={styles.image}
              style={{
                backgroundImage: `url(${
                  showBackupImage ? placeholderImage : imageUrl
                })`,
              }}
            />
          </div>
          <div className={styles.leftPanel}>
            <div className={styles.textWrapper}>
              <h1 className={styles.title}>
                <EventName event={event} />
              </h1>
              <div className={styles.description}>{shortDescription}</div>
              <Responsive above="sm" className={styles.date}>
                {!!startTime &&
                  getDateRangeStr({
                    start: startTime,
                    end: endTime,
                    locale,
                    includeTime: true,
                    timeAbbreviation: t('commons.timeAbbreviation'),
                  })}
              </Responsive>

              <Responsive above="sm" className={styles.location}>
                <InfoWithIcon icon={<IconLocation />}>
                  <LocationText
                    event={event}
                    showDistrict={false}
                    showLocationName={true}
                  />
                </InfoWithIcon>
              </Responsive>

              <Responsive above="sm" className={styles.price}>
                <InfoWithIcon icon={<IconTicket />}>
                  {eventPriceText || '-'}
                </InfoWithIcon>
              </Responsive>

              {showKeywords && (
                <div className={styles.categoryWrapper}>
                  <EventKeywords
                    blackOnMobile={true}
                    event={event}
                    showIsFree={true}
                  />
                </div>
              )}
              {showBuyButton && (
                <Responsive above="sm" className={styles.buyButtonWrapper}>
                  <Button
                    aria-label={t('event.hero.ariaLabelBuyTickets')}
                    onClick={goToBuyTicketsPage}
                    variant="success"
                  >
                    {t('event.hero.buttonBuyTickets')}
                  </Button>
                </Responsive>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default EventHero;
