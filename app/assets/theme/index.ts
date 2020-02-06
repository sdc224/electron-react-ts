import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let newTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#0288D1'
      // main: "#232c39"
    },
    secondary: {
      main: '#E2432A'
    }
  }
});

newTheme = responsiveFontSizes(newTheme);

const theme = newTheme;
export default theme;
