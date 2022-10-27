import { Route, BrowserRouter, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Layout from './components/common/Layout';
import { ApolloProvider } from '@apollo/client';
import { githubClient } from './infrastructure/github/apollo';
import { AppContextProvider } from './state/AppContext';

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={githubClient}>
        <AppContextProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </Layout>
        </AppContextProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
