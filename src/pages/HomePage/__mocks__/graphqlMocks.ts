import { SEARCH_REPOSITORIES_PAGINATED } from '../../../infrastructure/github/queries';

import searchResultsReactMock from './searchResultsReact.json';
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
        query: 'redux',
        first: 10,
      },
    },
    result: {
      data: searchResultsReduxMock,
    },
  },
];

export default searchMocks;
