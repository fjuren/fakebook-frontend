import { createTheme } from '@mui/material';

// MUI styling docs
// https://mui.com/material-ui/customization/theming/#theme-provider
// https://mui.com/material-ui/customization/how-to-customize/#3-global-theme-overrides

const theme = createTheme({
  palette: {
    primary: {
      main: '#5076CC', // facebook blue
    },
    secondary: {
      main: '#f4f5f9', // light grey
      light: '#ffffff', // white
    },
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
