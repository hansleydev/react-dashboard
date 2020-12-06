// ------------------- Import Required Modules -------------------

import { makeStyles } from "@material-ui/styles";

// ------------------- Create Sign Up Form Styles -------------------

const signUpFormSyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  formContainer: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  avatarContainer: {
    marginBottom: theme.spacing(3),
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  formTitle: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  titleContainer: {
    width: "100%",
  },
  textFieldContainer: {
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up("xs")]: {
      width: "60%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "55%",
    },
    [theme.breakpoints.up("md")]: {
      justifyContent: "center",
    },
    [theme.breakpoints.up("lg")]: {
      width: "400px",
    },
  },
  specialContainer: {
    [theme.breakpoints.up("xs")]: {
      marginBottom: theme.spacing(2),
      width: "80%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "70%",
    },
    [theme.breakpoints.up("md")]: {
      justifyContent: "center",
    },
    [theme.breakpoints.up("lg")]: {
      marginBottom: theme.spacing(3),
      width: "400px",
    },
  },
  errorContainer: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up("xs")]: {
      width: "80%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "70%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "400px",
    },
  },
  button: {
    width: "100%",
  },
  textField: {
    width: "100%",
  },
  fieldContainer: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
  },
  fieldTitle: {
    marginBottom: theme.spacing(1),
    textAlign: "center",
  },
  fieldValue: {
    marginBottom: theme.spacing(1),
    textAlign: "center",
    color: "#5a5a5a",
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

export default signUpFormSyles;
