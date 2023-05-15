import { createTheme } from '@mui/material';

// MUI styling docs
// https://mui.com/material-ui/customization/theming/#theme-provider
// https://mui.com/material-ui/customization/how-to-customize/#3-global-theme-overrides

const theme = createTheme({
  palette: {
    text: {
      primary: '#1877F2',
      // secondary: {
      // main: teal[300],
      // },
    },
  },
  typography: {
    fontFamily: '"Helvetica", "Arial", "sanss-erif"',
    button: {
      textTransform: 'none',
    },
  },
});

export default theme;
