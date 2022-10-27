import { ChangeEvent, MouseEvent, ReactNode, useState } from 'react';
import * as S from './styles';

type Cell = string | number | ReactNode;
type Row = Cell[];
type TablePaginationProps = {
  rows: Row[];
  onChangePage: (newPage: number) => void;
  onChangeRowsPerPage: (newAmount: number) => void;
  page: number;
  allowedRowsPerPage: number[];
  itemsPerPage: number;
  headers: string[];
  totalItems: number;
  ariaLabel?: string;
  resetPage: () => void;
};

const TablePagination = ({
  rows = [],
  onChangePage,
  page,
  onChangeRowsPerPage,
  itemsPerPage,
  headers,
  allowedRowsPerPage,
  ariaLabel,
  totalItems = 0,
  resetPage,
}: TablePaginationProps) => {
  const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    onChangePage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newAmount = parseInt(event.target.value, 10);
    onChangeRowsPerPage(newAmount);
    resetPage();
  };

  return (
    <S.Root sx={{ width: 500, maxWidth: '100%' }}>
      <table aria-label="custom pagination table">
        <thead>
          <tr>
            {headers.map((header, indexHeader) => (
              <th key={`table-pagination-header-${indexHeader}`}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, indexRow) => (
            <tr key={`table-pagination-row-${indexRow}`} role="row" aria-label={ariaLabel}>
              {row.map((cell, indexCell) => (
                <td
                  key={`table-pagination-cell-${indexRow}-${indexCell}`}
                  role="cell"
                  aria-label={ariaLabel}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <S.CustomTablePagination
              rowsPerPageOptions={allowedRowsPerPage}
              count={totalItems}
              rowsPerPage={itemsPerPage}
              page={page}
              componentsProps={{
                select: {
                  'aria-label': 'rows per page',
                  role: 'listbox',
                },
                actions: {
                  showFirstButton: false,
                  showLastButton: false,
                } as any,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </tr>
        </tfoot>
      </table>
    </S.Root>
  );
};

export default TablePagination;
