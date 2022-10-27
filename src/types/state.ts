export type AppContextValues = {
  searchQuery: string;
  itemsPerPage: number;
  paginationPage: number;
  setPaginationPage: (page: number) => void;
  setItemsPerPage: (value: number) => void;
  setSearchQuery: (value: string) => void;
};
