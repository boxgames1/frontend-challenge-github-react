import { Route, BrowserRouter, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./components/common/Layout";
import { ApolloProvider } from "@apollo/client";
import { githubClient } from "./infrastructure/github/apollo";

function App() {
	return (
		<BrowserRouter>
			<ApolloProvider client={githubClient}>
				<Layout>
					<Routes>
						<Route path="/" element={<HomePage />} />
					</Routes>
				</Layout>
			</ApolloProvider>
		</BrowserRouter>
	);
}

export default App;
