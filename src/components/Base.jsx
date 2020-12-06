// ------------------- Import Required Modules -------------------

import React, { useReducer } from "react";
import PropTypes from "prop-types";

// ------------------- Import Material UI Components -------------------

import { Paper, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

// ------------------- Import Custom Components -------------------

import AppDrawer from "./AppDrawer.jsx";

// Import Styles

import baseStyles from "../styles/base.styles.js";

// ------------------- Create Main Content Component -------------------

const Base = (props) => {
  // Invoke JSS Classes

  const classes = baseStyles();

  return (
    <Paper elevation={0} className={classes.root}>
      {props.children}
      <AppDrawer />
    </Paper>
  );
};

Base.propTypes = {
  children:
    PropTypes.element ||
    PropTypes.arrayOf(PropTypes.element) ||
    PropTypes.objectOf(PropTypes.element),
};

export default Base;
