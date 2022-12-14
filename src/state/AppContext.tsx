import { ReactNode, useContext, useState, createContext } from 'react';
import {
  INITIAL_ITEMS_PER_PAGE,
  INITIAL_PAGINATION_PAGE,
  INITIAL_SEARCH_QUERY,
} from '../constants/graphql';
import { AppContextValues } from '../types/state';

const defaultAppContextValue: AppContextValues = {
  searchQuery: INITIAL_SEARCH_QUERY,
  itemsPerPage: INITIAL_ITEMS_PER_PAGE,
  paginationPage: INITIAL_PAGINATION_PAGE,
  setSearchQuery: () => {},
  setItemsPerPage: () => {},
  setPaginationPage: () => {},
};

const AppContext = createContext<AppContextValues>(defaultAppContextValue);

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [itemsPerPage, setItemsPerPage] = useState(defaultAppContextValue.itemsPerPage);
  const [searchQuery, setSearchQuery] = useState(defaultAppContextValue.searchQuery);
  const [paginationPage, setPaginationPage] = useState(defaultAppContextValue.paginationPage);

  const appData: AppContextValues = {
    itemsPerPage,
    searchQuery,
    paginationPage,
    setPaginationPage,
    setItemsPerPage,
    setSearchQuery,
  };
  return <AppContext.Provider value={appData}>{children}</AppContext.Provider>;
};
