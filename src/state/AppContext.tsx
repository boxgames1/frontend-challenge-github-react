import { ReactNode, useContext, useState, createContext } from "react";
import {
	INITIAL_ITEMS_PER_PAGE,
	INITIAL_PAGINATION_PAGE,
	INITIAL_SEARCH_QUERY,
} from "../constants/graphql";
import { AppContextValues } from "../types/state";

const defaultAppContextValue: AppContextValues = {
	currentPage: INITIAL_PAGINATION_PAGE,
	currentRepositories: [],
	repositoryCount: 0,
	endCursor: undefined,
	searchQuery: INITIAL_SEARCH_QUERY,
	itemsPerPage: INITIAL_ITEMS_PER_PAGE,
	setRepositoryCount: () => {},
	setCurrentRepositories: () => {},
	setCurrentPage: () => {},
	setEndCursor: () => {},
	setSearchQuery: () => {},
	setItemsPerPage: () => {},
};

const AppContext = createContext<AppContextValues>(defaultAppContextValue);

export const useAppContext = () => {
	return useContext(AppContext);
};

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
	const [currentPage, setCurrentPage] = useState(
		defaultAppContextValue.currentPage
	);
	const [repositoryCount, setRepositoryCount] = useState(
		defaultAppContextValue.repositoryCount
	);
	const [currentRepositories, setCurrentRepositories] = useState(
		defaultAppContextValue.currentRepositories
	);
	const [itemsPerPage, setItemsPerPage] = useState(
		defaultAppContextValue.itemsPerPage
	);
	const [endCursor, setEndCursor] = useState(defaultAppContextValue.endCursor);
	const [searchQuery, setSearchQuery] = useState(
		defaultAppContextValue.searchQuery
	);

	const appData: AppContextValues = {
		currentPage,
		repositoryCount,
		currentRepositories,
		endCursor,
		itemsPerPage,
		searchQuery,
		setItemsPerPage,
		setRepositoryCount,
		setCurrentRepositories,
		setCurrentPage,
		setEndCursor,
		setSearchQuery,
	};
	return <AppContext.Provider value={appData}>{children}</AppContext.Provider>;
};
