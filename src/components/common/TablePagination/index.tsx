import { ChangeEvent, MouseEvent, ReactNode, useState } from 'react';
import * as S from './styles';

type Cell = string | number | ReactNode;
type Row = Cell[];
type TablePaginationProps = {
  rows: Row[];
  onChangePage: (newPage: number) => void;
  onChangeRowsPerPage: (newAmount: number) => void;
  initialPage: number;
  initialItemsPerPage: number;
  itemsPerPage: number[];
  headers: string[];
  totalItems: number;
  ariaLabel?: string;
};

const TablePagination = ({
  rows = [],
  onChangePage,
  initialPage,
  onChangeRowsPerPage,
  initialItemsPerPage,
  itemsPerPage,
  headers,
  ariaLabel,
  totalItems = 0,
}: TablePaginationProps) => {
  const [page, setPage] = useState(initialPage);
  const [rowsPerPage, setRowsPerPage] = useState(initialItemsPerPage);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 1 ? Math.max(0, page * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
    onChangePage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newAmount = parseInt(event.target.value, 10);
    setRowsPerPage(newAmount);
    onChangeRowsPerPage(newAmount);
    setPage(1);
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

          {emptyRows > 0 && (
            <tr style={{ height: 34 * emptyRows }}>
              <td colSpan={3} />
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <S.CustomTablePagination
              rowsPerPageOptions={itemsPerPage}
              count={totalItems}
              rowsPerPage={rowsPerPage}
              page={page - 1}
              componentsProps={{
                select: {
                  'aria-label': 'rows per page',
                },
                actions: {
                  showFirstButton: true,
                  showLastButton: true,
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
