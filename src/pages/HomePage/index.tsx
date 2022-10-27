import { useQuery } from '@apollo/client';
import { Grid } from '@mui/material';
import DebounceInput from '../../components/common/DebounceInput';

import QueryResult from '../../components/common/QueryResult';
import TablePagination from '../../components/common/TablePagination';
import { INITIAL_PAGINATION_PAGE } from '../../constants/graphql';
import { SEARCH_REPOSITORIES_PAGINATED } from '../../infrastructure/github/queries';
import { useAppContext } from '../../state/AppContext';
import { Repository } from '../../types/Repository';

import * as S from './styles';

const REPOSITORIES_TABLES_HEADERS = ['Name', '🌟 Stars', '🍴 Forks'];

const HomePage = () => {
  const { searchQuery, itemsPerPage, setSearchQuery, setItemsPerPage } = useAppContext();

  const { loading, error, data, fetchMore } = useQuery(SEARCH_REPOSITORIES_PAGINATED, {
    variables: {
      query: searchQuery,
      first: itemsPerPage,
    },
  });

  // Generate paginated table rows content
  const tableRows: any[] = data?.search?.nodes?.map((node: Repository) => [
    <a href={node.url} target="_blank" rel="noreferrer">
      {node.name}
    </a>,
    node.forkCount,
    node.stargazerCount,
  ]);

  // TODO: Paginate properly, add next, prev, first and last functionality
  const handleChangePage = (newPage: number) => {
    fetchMore({
      variables: { after: data.search.pageInfo.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult;
        const newNodes = fetchMoreResult.search.nodes;
        const pageInfo = fetchMoreResult.search.pageInfo;
        return {
          ...previousResult,
          search: {
            nodes: [...previousResult.search.nodes, ...newNodes],
            pageInfo,
          },
        };
      },
    });
  };

  return (
    <S.Root>
      <QueryResult loading={loading} error={error} data={data}>
        <Grid container gap={4}>
          <Grid xs={12} item>
            <DebounceInput
              onChange={setSearchQuery}
              data-testid="search-repositories"
              placeholder="Search repositories"
            />
          </Grid>
          <Grid xs={12} item>
            <TablePagination
              initialPage={INITIAL_PAGINATION_PAGE}
              itemsPerPage={[5, 10, 25]}
              initialItemsPerPage={itemsPerPage}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={setItemsPerPage}
              rows={tableRows}
              headers={REPOSITORIES_TABLES_HEADERS}
              totalItems={data?.search?.repositoryCount}
              ariaLabel="repositories-table"
            />
          </Grid>
        </Grid>
      </QueryResult>
    </S.Root>
  );
};

export default HomePage;
