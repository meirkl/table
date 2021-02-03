import React from 'react';
import { InputAdornment, TextField, Tooltip } from '@material-ui/core';
import { FilterList } from '@material-ui/icons';
import { ColumnInstance, useAsyncDebounce } from 'react-table';

const ColumnFilter: React.FC<{ column: ColumnInstance }> = ({ column }) => {
  const { filterValue, setFilter } = column;
  const [value, setValue] = React.useState(filterValue);

  const onChange = useAsyncDebounce(
    value => setFilter(value || undefined),
    400
  );

  return (
    <TextField
      type="search"
      value={value || ''}
      onChange={e => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
      InputProps={{
        'aria-labelledby': 'filter',
        startAdornment: (
          <Tooltip title="Filter">
            <InputAdornment position="start">
              <FilterList />
            </InputAdornment>
          </Tooltip>
        ),
      }}
    />
  );
};

export default ColumnFilter;
