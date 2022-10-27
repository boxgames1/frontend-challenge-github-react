import { gql } from '@apollo/client';

export const SEARCH_REPOSITORIES_PAGINATED = gql`
  query searchRepositoriesPaginated(
    $query: String!
    $first: Int
    $last: Int
    $before: String
    $after: String
  ) {
    search(
      query: $query
      type: REPOSITORY
      first: $first
      last: $last
      before: $before
      after: $after
    ) {
      nodes {
        ... on Repository {
          id
          name
          url
          forkCount
          stargazerCount
        }
      }
      repositoryCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
    }
  }
`;
