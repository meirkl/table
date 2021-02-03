// interface Column {
//   Header: string;
//   accessor: string;
// }
import { Column } from 'react-table';
import { format } from 'date-fns';

export type Data = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
  age: number;
  country: string;
  phone: string;
};

export const COLUMNS: Column<Data>[] = [
  { Header: 'ID', accessor: 'id', disableFilters: true },
  { Header: 'First Name', accessor: 'first_name' },
  { Header: 'Last Name', accessor: 'last_name' },
  { Header: 'Email', accessor: 'email' },
  {
    Header: 'Date of Birth',
    accessor: 'date_of_birth',
    Cell: ({ value }) => format(new Date(value), 'dd/MM/yyyy'),
  },
  { Header: 'Age', accessor: 'age' },
  { Header: 'Country', accessor: 'country' },
  { Header: 'Phone', accessor: 'phone' },
];

export const COLUMNS_GROUPS: Column<Data>[] = [
  {
    Header: 'ID',
    accessor: 'id',
  },
  {
    Header: 'Name',
    columns: [
      { Header: 'First Name', accessor: 'first_name' },
      { Header: 'Last Name', accessor: 'last_name' },
    ],
  },
  {
    Header: 'Info',
    columns: [
      { Header: 'Date of Birth', accessor: 'date_of_birth' },
      { Header: 'Country', accessor: 'country' },
      { Header: 'Phone', accessor: 'phone' },
    ],
  },
];
