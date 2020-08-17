import { MockedProvider } from '@apollo/react-testing';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import { KeywordDetailsDocument } from '../../../../generated/graphql';
import mockKeyword from '../../../keyword/__mocks__/keyword';
import KeywordFilter from '../KeywordFilter';

const mocks = [
  {
    request: {
      query: KeywordDetailsDocument,
      variables: {
        id: mockKeyword.id,
      },
    },
    result: {
      data: {
        keywordDetails: mockKeyword,
      },
    },
  },
];

test('matches snapshot', async () => {
  const { container } = render(
    <MockedProvider mocks={mocks} addTypename={true}>
      <KeywordFilter id={mockKeyword.id || ''} onRemove={jest.fn()} />
    </MockedProvider>
  );

  await screen.findByText((mockKeyword.name || {})['fi'] || '');
  expect(container.firstChild).toMatchSnapshot();
});

it('calls onRemove callback when remove button is clicked ', async () => {
  const onClickMock = jest.fn();
  render(
    <MockedProvider mocks={mocks} addTypename={true}>
      <KeywordFilter id={mockKeyword.id || ''} onRemove={onClickMock} />
    </MockedProvider>
  );

  await screen.findByText((mockKeyword.name || {})['fi'] || '');

  userEvent.click(screen.getByRole('button'));

  expect(onClickMock).toHaveBeenCalled();
});