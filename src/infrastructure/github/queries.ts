import { gql } from "@apollo/client";

export const SEARCH_REPOSITORIES_PAGINATED = gql`
	query searchRepositoriesPaginated(
		$query: String!
		$first: Int!
		$after: String
	) {
		search(query: $query, type: REPOSITORY, first: $first, after: $after) {
			nodes {
				... on Repository {
					id
					name
					owner {
						login
					}
					forkCount
					stargazerCount
				}
			}
			pageInfo {
				hasNextPage
				endCursor
			}
		}
	}
`;
