// ------------------- Import Required Modules -------------------

import createMuiTheme from "@material-ui/core/styles/createMuiTheme.js";

// Create Global Theme

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Roboto"],
  },
  palette: {
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#f357aa",
    },
  },
});

export default theme;
