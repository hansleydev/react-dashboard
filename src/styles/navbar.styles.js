// ------------------- Import Required Modules -------------------

import { makeStyles } from "@material-ui/styles";

// ------------------- Create Navbar Styles -------------------

const navbarStyles = makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.down("xs")]: {
      marginBottom: "0px",
    },
    [theme.breakpoints.up("sm")]: {
      marginBottom: theme.spacing(3),
    },
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brand: {
    textTransform: "capitalize",
  },
  buttonGroupRoot: {
    display: "flex",
    width: "100px",
    justifyContent: "space-evenly",
  },
}));

export default navbarStyles;
