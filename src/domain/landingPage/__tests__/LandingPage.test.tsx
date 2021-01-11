import { act } from '@testing-library/react';
import { axe } from 'jest-axe';
import * as React from 'react';

import translations from '../../../common/translation/i18n/fi.json';
import {
  CollectionListDocument,
  LandingPagesDocument,
} from '../../../generated/graphql';
import * as useMobile from '../../../hooks/useMobile';
import {
  fakeBanner,
  fakeCollections,
  fakeLandingPages,
  fakeLocalizedObject,
} from '../../../util/mockDataUtils';
import { render, screen } from '../../../util/testUtils';
import LandingPage from '../LandingPage';

const topBannerDescription = 'topBanner page description';
const bottomBannerDescription = 'bottomBanner description';
const topBannerTitle = 'topBanner page title';
const bottomBannerTitle = 'bottomBanner page title';
const landingPagesResponse = {
  data: {
    landingPages: fakeLandingPages(1, [
      {
        topBanner: fakeBanner({
          title: fakeLocalizedObject(topBannerTitle),
          description: fakeLocalizedObject(topBannerDescription),
        }),
        bottomBanner: fakeBanner({
          title: fakeLocalizedObject(bottomBannerTitle),
          description: fakeLocalizedObject(bottomBannerDescription),
        }),
      },
    ]),
  },
};

const collections = fakeCollections(1);
const collectionsResponse = {
  data: {
    collectionList: collections,
  },
};

beforeEach(() => {
  jest.spyOn(useMobile, 'useMobile').mockReturnValue(false);
});

const mocks = [
  {
    request: {
      query: CollectionListDocument,
      variables: {
        visibleOnFrontpage: true,
      },
    },
    result: collectionsResponse,
  },
  {
    request: {
      query: LandingPagesDocument,
      variables: {
        visibleOnFrontpage: true,
      },
    },
    result: landingPagesResponse,
  },
];

test('Landing page should be accessible', async () => {
  const { container } = render(<LandingPage />);
  let axeResult = undefined;
  await act(async () => {
    axeResult = await axe(container);
  });
  expect(axeResult).toHaveNoViolations();
});

it('should render landing page correctly', async () => {
  render(<LandingPage />, {
    mocks,
  });

  await screen.findByRole('heading', { name: topBannerTitle });

  expect(screen.getByText(topBannerDescription)).toBeInTheDocument();
  collections.data.forEach((collection) => {
    expect(screen.getByText(collection.title.fi)).toBeInTheDocument();
    expect(screen.getByText(collection.description.fi)).toBeInTheDocument();
  });
  expect(
    screen.getByRole('heading', { name: bottomBannerTitle })
  ).toBeInTheDocument();
  expect(screen.getByText(bottomBannerDescription)).toBeInTheDocument();
});

it('renders different placeholder for inputs in mobile', async () => {
  jest.spyOn(useMobile, 'useMobile').mockReturnValue(true);

  render(<LandingPage />, {
    mocks,
  });

  await screen.findByRole('heading', { name: topBannerTitle });

  expect(
    screen.getAllByPlaceholderText(translations.home.search.placeholder)
  ).toHaveLength(2);
});
