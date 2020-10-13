import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router';

import ErrorHero from '../../common/components/error/ErrorHero';
import PreviewBanner from '../../common/components/previewBanner/PreviewBanner';
import LoadingSpinner from '../../common/components/spinner/LoadingSpinner';
import { useLandingPageQuery } from '../../generated/graphql';
import Container from '../app/layout/Container';
import MainContent from '../app/layout/MainContent';
import PageWrapper from '../app/layout/PageWrapper';
import LandingPageHero from './landingPageHero/LandingPageHero';
import LandingPageMeta from './landingPageMeta/LandingPageMeta';
import Search from './landingPageSearch/LandingPageSearch';

interface RouteParams {
  id: string;
}

const LandingPagePreview: React.FC = () => {
  const { t } = useTranslation();
  const { search } = useLocation();
  const params = useParams<RouteParams>();
  const urlSearchParams = new URLSearchParams(search);
  const draft = urlSearchParams.get('draft') === 'true';

  const { data: landingPageData, loading } = useLandingPageQuery({
    variables: { draft, id: params.id },
  });
  const landingPage = landingPageData?.landingPage;

  return (
    <PageWrapper>
      <LoadingSpinner isLoading={loading}>
        {!!landingPage ? (
          <>
            <LandingPageMeta landingPage={landingPage} />

            <PreviewBanner />
            <LandingPageHero landingPage={landingPage} />
            <MainContent offset={-150}>
              <Container>
                <Search />
              </Container>
            </MainContent>
          </>
        ) : (
          <ErrorHero
            text={t('home.notFound.text')}
            title={t('home.notFound.title')}
          ></ErrorHero>
        )}
      </LoadingSpinner>
    </PageWrapper>
  );
};

export default LandingPagePreview;
