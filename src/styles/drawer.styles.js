// ------------------- Import Required Modules -------------------

import { makeStyles } from "@material-ui/styles";

// ------------------- Create App Drawer Styles -------------------

const drawerStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("lg")]: {
      width: "210px",
    },
    [theme.breakpoints.down("md")]: {
      width: "180px",
    },
  },
  mobileDrawer: {
    width: "240px",
  },
}));

export default drawerStyles;
