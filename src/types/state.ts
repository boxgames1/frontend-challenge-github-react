import { Repository } from "./Repository";

export type AppContextValues = {
	currentRepositories: Repository[];
	currentPage: number;
	searchQuery?: string;
	endCursor?: string;
	repositoryCount?: number;
	setRepositoryCount: (value: number) => void;
	setCurrentRepositories: (value: Repository[]) => void;
	setCurrentPage: (value: number) => void;
	setEndCursor: (value: string) => void;
	setSearchQuery: (value: string) => void;
};
