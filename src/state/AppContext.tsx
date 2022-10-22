import { ReactNode, useContext, useState, createContext } from "react";
import { AppContextValues } from "../types/state";

const defaultAppContextValue: AppContextValues = {
	currentPage: 1,
	currentRepositories: [],
	repositoryCount: 0,
	endCursor: undefined,
	searchQuery: undefined,
	setRepositoryCount: () => {},
	setCurrentRepositories: () => {},
	setCurrentPage: () => {},
	setEndCursor: () => {},
	setSearchQuery: () => {},
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
	const [endCursor, setEndCursor] = useState(defaultAppContextValue.endCursor);
	const [searchQuery, setSearchQuery] = useState(
		defaultAppContextValue.searchQuery
	);

	const appData: AppContextValues = {
		currentPage,
		repositoryCount,
		currentRepositories,
		endCursor,
		searchQuery,
		setRepositoryCount,
		setCurrentRepositories,
		setCurrentPage,
		setEndCursor,
		setSearchQuery,
	};
	return <AppContext.Provider value={appData}>{children}</AppContext.Provider>;
};
