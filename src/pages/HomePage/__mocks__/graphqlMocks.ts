import { SEARCH_REPOSITORIES_PAGINATED } from '../../../infrastructure/github/queries';

import searchResultsReactMock from './searchResultsReact.json';
import searchResultsReact5Mock from './searchResultsReact5.json';
import searchResultsReactPage2Mock from './searchResultsReactPage2.json';
import searchResultsReduxMock from './searchResultsRedux.json';

const searchMocks = [
  {
    request: {
      query: SEARCH_REPOSITORIES_PAGINATED,
      variables: {
        query: 'react',
        first: 10,
      },
    },
    result: {
      data: searchResultsReactMock,
    },
  },
  {
    request: {
      query: SEARCH_REPOSITORIES_PAGINATED,
      variables: {
        query: 'react',
        first: 5,
      },
    },
    result: {
      data: searchResultsReact5Mock,
    },
  },
  {
    request: {
      query: SEARCH_REPOSITORIES_PAGINATED,
      variables: {
        query: 'redux',
        first: 10,
      },
    },
    result: {
      data: searchResultsReduxMock,
    },
  },
  {
    request: {
      query: SEARCH_REPOSITORIES_PAGINATED,
      variables: {
        query: 'react',
        first: 10,
        after: 'Y3Vyc29yOjEw',
      },
    },
    result: {
      data: searchResultsReactPage2Mock,
    },
  },
  {
    request: {
      query: SEARCH_REPOSITORIES_PAGINATED,
      variables: {
        query: 'react',
        first: 10,
        before: 'Y3Vyc29yOjEx',
      },
    },
    result: {
      data: searchResultsReactMock,
    },
  },
];

export default searchMocks;
