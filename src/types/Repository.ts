export type RepositoryOwner = {
	login: string;
};

export type Repository = {
	id: string;
	name: string;
	owner: RepositoryOwner;
	forkCount: number;
	stargazerCount: number;
};
