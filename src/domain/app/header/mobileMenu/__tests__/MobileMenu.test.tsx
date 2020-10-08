import i18n from 'i18next';
import { axe } from 'jest-axe';
import React from 'react';

import translations from '../../../../../common/translation/i18n/fi.json';
import { render, screen, userEvent } from '../../../../../util/testUtils';
import MobileMenu from '../MobileMenu';

const routes = ['/fi/home'];

const getWrapper = () =>
  render(<MobileMenu isMenuOpen={true} onClose={jest.fn()} />, { routes });

beforeEach(() => {
  i18n.changeLanguage('fi');
});

it('component should be accessible', async () => {
  const { container } = getWrapper();

  expect(await axe(container)).toHaveNoViolations();
});

it('matches snapshot', async () => {
  const { container } = getWrapper();

  expect(container.firstChild).toMatchSnapshot();
});

it('should change language', async () => {
  const { history } = getWrapper();

  userEvent.click(
    screen.queryByRole('link', { name: translations.header.languages.sv })
  );

  expect(history.location.pathname).toBe('/sv/home');
});
