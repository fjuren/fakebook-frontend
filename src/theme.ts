import { createTheme } from '@mui/material/styles';

// MUI styling docs
// https://mui.com/material-ui/customization/theming/#theme-provider
// https://mui.com/material-ui/customization/how-to-customize/#3-global-theme-overrides

// Define the custom theme type

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // facebook blue
      light: '#42a5f5',
    },
    secondary: {
      main: '#f4f5f9', // light grey
      light: '#ffffff', // white
    },
  },
  typography: {
    body1: {
      color: '#65676b', // light grey
    },
    fontFamily: '"Helvetica", "Arial", "sanss-erif"',
    button: {
      textTransform: 'none',
    },
    body2: {
      color: 'black',
    },
  },
});

export default theme;
