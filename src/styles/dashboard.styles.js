// ------------------- Import Required Modules -------------------

import { makeStyles } from "@material-ui/styles";

// ------------------- Create Dashboard Styles -------------------

const dashboardStyles = makeStyles((theme) => ({
  content: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up("lg")]: {
      marginRight: "210px",
    },
    [theme.breakpoints.down("md")]: {
      marginRight: "180px",
    },
  },
}));

export default dashboardStyles;
