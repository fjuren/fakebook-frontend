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
    fontFamily: '"Helvetica", "Arial", "sans-serif"',
    h1: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: 'black',
    },
    h2: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: 'black',
    },
    body1: {
      color: '#65676b', // light grey
    },
    body2: {
      color: 'black',
    },
    button: {
      textTransform: 'none',
    },
  },
});

export default theme;
