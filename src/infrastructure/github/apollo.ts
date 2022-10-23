import env from "react-dotenv";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { GITHUB_GRAPHQL_API_ENDPOINT } from "../../constants/graphql";
import { setContext } from "@apollo/client/link/context";

const getClientLink = () => {
	const httpLink = createHttpLink({
		uri: GITHUB_GRAPHQL_API_ENDPOINT,
	});

	const authLink = setContext((_, { headers }) => {
		// get the authentication token from dotenv
		const token = env.GITHUB_ACCESS_TOKEN;
		// return the headers to the context so httpLink can read them
		return {
			headers: {
				...headers,
				authorization: token ? `Bearer ${token}` : "",
			},
		};
	});
	return authLink.concat(httpLink);
};
export const githubClient = new ApolloClient({
	uri: GITHUB_GRAPHQL_API_ENDPOINT,
	link: getClientLink(),
	cache: new InMemoryCache(),
});
