import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let newTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#0288d1'
      // main: "#232c39"
    }
    // secondary: '#ffffff'
  }
});

newTheme = responsiveFontSizes(newTheme);

const theme = newTheme;
export default theme;
