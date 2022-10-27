import { styled } from '@mui/system';
import TablePaginationUnstyled, {
  tablePaginationUnstyledClasses as classes,
} from '@mui/base/TablePaginationUnstyled';
import colors from '../../../theme/colors';

export const Root = styled('div')(
  ({ theme }) => `
    table {
      font-family: IBM Plex Sans, sans-serif;
      font-size: 0.875rem;
      border-collapse: collapse;
      width: 100%;
    }
  
    td,
    th {
      border: 1px solid ${theme.palette.mode === 'dark' ? colors.grey[800] : colors.grey[200]};
      text-align: left;
      padding: 6px;
    }
  
    th {
      background-color: ${theme.palette.mode === 'dark' ? colors.grey[900] : colors.grey[100]};
    }
    `,
);

export const CustomTablePagination = styled(TablePaginationUnstyled)(
  ({ theme }) => `
    & .${classes.spacer} {
      display: none;
    }
  
    & .${classes.toolbar}  {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
  
      @media (min-width: 768px) {
        flex-direction: row;
        align-items: center;
      }
    }
  
    & .${classes.selectLabel} {
      margin: 0;
    }
  
    & .${classes.select}{
      padding: 2px;
      border: 1px solid ${theme.palette.mode === 'dark' ? colors.grey[800] : colors.grey[200]};
      border-radius: 50px;
      background-color: transparent;
  
      &:hover {
        background-color: ${theme.palette.mode === 'dark' ? colors.grey[800] : colors.grey[50]};
      }
  
      &:focus {
        outline: 1px solid ${theme.palette.mode === 'dark' ? colors.blue[400] : colors.blue[200]};
      }
    }
  
    & .${classes.displayedRows} {
      margin: 0;
  
      @media (min-width: 768px) {
        margin-left: auto;
      }
    }
  
    & .${classes.actions} {
      padding: 2px;
      border: 1px solid ${theme.palette.mode === 'dark' ? colors.grey[800] : colors.grey[200]};
      border-radius: 50px;
      text-align: center;
    }
  
    & .${classes.actions} > button {
      margin: 0 8px;
      border: transparent;
      border-radius: 2px;
      background-color: transparent;
  
      &:hover {
        background-color: ${theme.palette.mode === 'dark' ? colors.grey[800] : colors.grey[50]};
      }
  
      &:focus {
        outline: 1px solid ${theme.palette.mode === 'dark' ? colors.blue[400] : colors.blue[200]};
      }
    }
    `,
);
