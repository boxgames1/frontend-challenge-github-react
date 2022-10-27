import { MockedProvider } from '@apollo/client/testing';
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react';

import HomePage from '.';
import { AppContextProvider } from '../../state/AppContext';
import searchMocks from './__mocks__/graphqlMocks';

const renderPage = () =>
  render(
    <AppContextProvider>
      <MockedProvider mocks={searchMocks} addTypename={false}>
        <HomePage />
      </MockedProvider>
    </AppContextProvider>,
  );

/* Test helpers */
const getLoading = () => screen.getByText(/Loading.../i);
const getSearchInput = () => screen.getByTestId('search-repositories').querySelector('input');
const getRows = () => screen.getAllByRole('row', { name: 'repositories-table' });
const getRowCells = (rowIndex: number) =>
  screen.getAllByRole('row', { name: 'repositories-table' })[rowIndex].querySelectorAll('td');

describe('HomePage integration tests', () => {
  describe('loading state', () => {
    beforeEach(() => {
      renderPage();
    });
    it('should show loading spinner initially', () => {
      expect(getLoading()).toBeInTheDocument();
    });
  });

  describe('after loading', () => {
    beforeEach(async () => {
      renderPage();
      await waitForElementToBeRemoved(getLoading());
    });
    it('should show search input', () => {
      expect(getSearchInput()).toBeInTheDocument();
    });
    it('should show 10 items in the table', () => {
      expect(getRows()).toHaveLength(10);
    });
    it('should show react, 1686 stars, 4666 forks in first table row', () => {
      const cells = getRowCells(0);
      // check title
      expect(within(cells[0]).getByText(/react/i)).toBeInTheDocument();
      // check stars and forks
      expect(cells[1].textContent).toBe('1686');
      expect(cells[2].textContent).toBe('4666');
    });
    it('should have react github repo link on first table row', () => {
      const cells = getRowCells(0);
      expect(cells[0].firstChild).toHaveAttribute('href', 'https://github.com/duxianwei520/react');
    });
  });

  describe('search', () => {
    beforeEach(async () => {
      renderPage();
      await waitForElementToBeRemoved(getLoading());
    });
    it("should show redux items after search 'redux'", async () => {
      const input = getSearchInput() as HTMLInputElement;
      // search for redux results
      fireEvent.change(input, { target: { value: 'redux' } });
      // wait for debounce
      await waitForElementToBeRemoved(screen.getAllByText(/react/i)[0], {
        timeout: 5000,
      });
      // wait for search results
      await waitForElementToBeRemoved(getLoading());

      expect(getRows()).toHaveLength(10);
      const cells = getRowCells(0);
      expect(within(cells[0]).getByText(/redux/i)).toBeInTheDocument();
      expect(cells[1].textContent).toBe('15320');
      expect(cells[2].textContent).toBe('58787');
      expect(cells[0].firstChild).toHaveAttribute('href', 'https://github.com/reduxjs/redux');
    });
  });
});

export {};
