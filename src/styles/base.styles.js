// ------------------- Import Required Modules -------------------

import { makeStyles } from "@material-ui/styles";

// ------------------- Create Base Component Styles -------------------

const baseStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "96.7vh",
    paddingBottom: theme.spacing(3),
    backgroundColor: "#f3f3f3",
  },
}));

export default baseStyles;
