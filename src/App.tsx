import React from 'react';
import {
  createMuiTheme,
  CssBaseline,
  Paper,
  ThemeProvider,
  useMediaQuery,
} from '@material-ui/core';
// import BasicTable from './components/BasicTable';
// import SortableTable from './components/SortableTable';
// import FilterableTable from './components/FilterableTable';
import PaginationTable from './components/PaginationTable';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper>
        <PaginationTable />
      </Paper>
    </ThemeProvider>
  );
}

export default App;
