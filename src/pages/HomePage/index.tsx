import { useQuery } from '@apollo/client';
import { Grid } from '@mui/material';
import { useState } from 'react';
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
  const {
    searchQuery,
    itemsPerPage,
    setSearchQuery,
    setItemsPerPage,
    paginationPage,
    setPaginationPage,
  } = useAppContext();

  const [loadingPagination, setLoadingPagination] = useState(false);

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

  const handleChangePage = async (newPage: number) => {
    // guards
    const isNext = newPage - paginationPage === 1;
    const isPrev = paginationPage - newPage === 1;
    if (
      (isNext && !data?.search?.pageInfo?.hasNextPage) ||
      (isPrev && !data?.search?.pageInfo?.hasPreviousPage)
    )
      return;
    setLoadingPagination(true);
    // load direction
    const getVariables = () =>
      isPrev
        ? {
            before: data?.search?.pageInfo?.startCursor,
          }
        : {
            after: data?.search?.pageInfo?.endCursor,
          };
    try {
      await fetchMore({
        variables: getVariables(),
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return previousResult;
          const newNodes = fetchMoreResult.search.nodes;
          const pageInfo = fetchMoreResult.search.pageInfo;
          const repositoryCount = fetchMoreResult.search.repositoryCount;
          return {
            search: {
              nodes: newNodes,
              pageInfo,
              repositoryCount,
            },
          };
        },
      });
      setPaginationPage(newPage);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingPagination(false);
    }
  };

  return (
    <S.Root>
      <QueryResult loading={loading || loadingPagination} error={error} data={data}>
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
              allowedRowsPerPage={[5, 10, 25]}
              itemsPerPage={itemsPerPage}
              page={paginationPage - 1}
              resetPage={() => setPaginationPage(INITIAL_PAGINATION_PAGE)}
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
