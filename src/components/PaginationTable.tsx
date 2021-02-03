import React from 'react';
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useFilters,
  useSortBy,
} from 'react-table';
import MOCK_DATA from '../MOCK_DATA.json';
import { COLUMNS } from './columns';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  TablePagination,
  makeStyles,
  Theme,
  createStyles,
  TableSortLabel,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { TablePaginationActionsProps } from '@material-ui/core/TablePagination/TablePaginationActions';
import ColumnFilter from './ColumnFilter';

const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  })
);

function TablePaginationActions(
  props: TablePaginationActionsProps & {
    nextPage: () => void;
    previousPage: () => void;
    gotoPage: (updater: number | ((pageIndex: number) => number)) => void;
    canNextPage: boolean;
    canPreviousPage: boolean;
  }
) {
  const classes = useStyles1();
  const {
    count,
    previousPage,
    gotoPage,
    nextPage,
    canPreviousPage,
    canNextPage,
  } = props;

  return (
    <div className={classes.root}>
      <IconButton
        onClick={() => gotoPage(0)}
        disabled={!canPreviousPage}
        aria-label="first page"
      >
        <FirstPageIcon />
      </IconButton>
      <IconButton
        onClick={previousPage}
        disabled={!canPreviousPage}
        aria-label="previous page"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={nextPage}
        disabled={!canNextPage}
        aria-label="next page"
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={() => gotoPage(count - 1)}
        disabled={!canNextPage}
        aria-label="last page"
      >
        <LastPageIcon />
      </IconButton>
    </div>
  );
}

const PaginationTable: React.FC = () => {
  const columns = React.useMemo(() => COLUMNS, []) as any[];
  const data = React.useMemo(() => MOCK_DATA, []);
  const defaultColumn = React.useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    gotoPage,
    filteredRows,
    canNextPage,
    canPreviousPage,
    state,
    setPageSize,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: {
        pageSize: 20,
      },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize } = state;
  console.log(state);

  return (
    <Table {...getTableProps()}>
      <TableHead>
        {headerGroups.map(headerGroup => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <TableCell
                {...column.getHeaderProps(column.getSortByToggleProps())}
              >
                <span>
                  {column.render('Header')}
                  <TableSortLabel
                    active={column.isSorted}
                    direction={column.isSortedDesc ? 'desc' : 'asc'}
                  />
                </span>
                <span>{column.canFilter && column.render('Filter')}</span>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()}>
        {page.map(row => {
          prepareRow(row);
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map(cell => (
                <TableCell {...cell.getCellProps()}>
                  {cell.render('Cell')}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[10, 20, 50, 100]}
            count={filteredRows.length}
            rowsPerPage={pageSize}
            page={pageIndex}
            SelectProps={{
              inputProps: { 'aria-label': 'rows per page' },
            }}
            onChangePage={() => {}}
            onChangeRowsPerPage={e => setPageSize(+e.target.value)}
            ActionsComponent={props => (
              <TablePaginationActions
                {...props}
                nextPage={nextPage}
                previousPage={previousPage}
                gotoPage={gotoPage}
                canNextPage={canNextPage}
                canPreviousPage={canPreviousPage}
              />
            )}
          />
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default PaginationTable;
