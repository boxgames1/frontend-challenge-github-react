export type AppContextValues = {
	searchQuery: string;
	itemsPerPage: number;
	setItemsPerPage: (value: number) => void;
	setSearchQuery: (value: string) => void;
};
