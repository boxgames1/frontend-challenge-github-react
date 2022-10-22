import { useQuery } from "@apollo/client";
import { Grid } from "@mui/material";
import DebounceInput from "../components/common/DebounceInput";

import QueryResult from "../components/common/QueryResult";
import TablePagination from "../components/common/TablePagination";
import { SEARCH_REPOSITORIES_PAGINATED } from "../infrastructure/github/queries";
import { useAppContext } from "../state/AppContext";

import * as S from "./styles";

const REPOSITORIES_TABLES_HEADERS = ["Name", "🌟 Stars", "🍴 Forks"];

const HomePage = () => {
	const {
		currentPage,
		setSearchQuery,
		searchQuery,
		endCursor,
		itemsPerPage,
		setCurrentPage,
		setItemsPerPage,
	} = useAppContext();
	console.log({
		query: searchQuery,
		first: currentPage * itemsPerPage,
		...(endCursor ? { after: endCursor } : {}),
	});

	const { loading, error, data, fetchMore } = useQuery(
		SEARCH_REPOSITORIES_PAGINATED,
		{
			variables: {
				query: searchQuery,
				first: currentPage * itemsPerPage,
				...(endCursor ? { after: endCursor } : {}),
			},
		}
	);

	const tableRows: any[] = data?.search?.nodes?.map((node: any) => [
		<a href={node.url} target="_blank" rel="noreferrer">
			{node.name}
		</a>,
		node.forkCount,
		node.stargazerCount,
	]);
	console.log("===========================");
	console.log("data");
	console.log(data);
	console.log("===========================");

	return (
		<S.Root>
			<QueryResult loading={loading} error={error} data={data}>
				<Grid container gap={4}>
					<Grid xs={12}>
						<DebounceInput onChange={setSearchQuery} />
					</Grid>
					<Grid xs={12}>
						<TablePagination
							initialPage={currentPage}
							itemsPerPage={[5, 10, 25]}
							initialItemsPerPage={itemsPerPage}
							onChangePage={setCurrentPage}
							onChangeRowsPerPage={setItemsPerPage}
							rows={tableRows}
							headers={REPOSITORIES_TABLES_HEADERS}
							totalItems={data?.search?.repositoryCount}
						/>
					</Grid>
				</Grid>
			</QueryResult>
		</S.Root>
	);
};

export default HomePage;
