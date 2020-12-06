// ------------------- Import Required Modules -------------------

import { makeStyles } from "@material-ui/styles";

// ------------------- Create Login Form Styles -------------------

const loginFormStyles = makeStyles((theme) => ({
  formContainer: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  avatar2: {
    backgroundColor: theme.palette.success.main,
  },
  formTitle: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  textFieldContainer: {
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up("xs")]: {
      width: "90%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "65%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "400px",
    },
  },
  textField: {
    width: "100%",
  },
  button: {
    width: "100%",
  },
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

export default loginFormStyles;
