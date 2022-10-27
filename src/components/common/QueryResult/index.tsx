import { ApolloError } from '@apollo/client';
import { CircularProgress, Typography } from '@mui/material';
import { ReactNode } from 'react';

import * as S from './styles';

type QueryResultProps = {
  children: ReactNode;
  loading: boolean;
  error: ApolloError | undefined;
  data: any;
};

const QueryResult = ({ loading, error, data, children }: QueryResultProps) => {
  if (error) {
    return <p>ERROR: {error.message}</p>;
  }
  if (loading) {
    return (
      <>
        <S.LoadingRoot>
          <S.LoadingInner>
            <CircularProgress size="4rem" />
            <Typography variant="h2" gutterBottom color="royalblue">
              Loading...
            </Typography>
          </S.LoadingInner>
        </S.LoadingRoot>
        {children}
      </>
    );
  }
  if (!data) {
    return <p>Nothing to show...</p>;
  }
  if (data) {
    return <>{children}</>;
  }
  return <></>;
};

export default QueryResult;
