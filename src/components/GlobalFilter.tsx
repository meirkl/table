import React from 'react';
import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { useAsyncDebounce } from 'react-table';

type Props = {
  filter: string;
  setFilter: (filterValue: any) => void;
};

const GlobalFilter: React.FC<Props> = ({ filter, setFilter }) => {
  const [value, setValue] = React.useState(filter);

  const onChange = useAsyncDebounce(
    value => setFilter(value || undefined),
    400
  );

  return (
    <TextField
      type="search"
      placeholder="Search..."
      fullWidth
      variant="outlined"
      value={value || ''}
      onChange={e => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
      InputProps={{
        'aria-labelledby': 'search',
        startAdornment: (
          <InputAdornment position="start">
            <IconButton>
              <Search />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default GlobalFilter;
