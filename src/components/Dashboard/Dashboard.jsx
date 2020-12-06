// ------------------- Import Required Modules -------------------

import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import clsx from "clsx";

// ------------------- Import Context -------------------

import { GlobalContext } from "../../context/GlobalContext.js";

// ------------------- Import Material UI Components -------------------

import { Paper, Typography } from "@material-ui/core";

import dashboardStyles from "../../styles/dashboard.styles.js";

// ------------------- Create Main Content Component -------------------

const Dashboard = () => {
  // Invoke JSS Classes

  const classes = dashboardStyles();

  // Get Profile and Authentication Status

  const { loggedIn, drawerOpen } = useContext(GlobalContext);

  if (loggedIn) {
    return (
      <Paper
        className={clsx(classes.content, {
          [classes.contentShift]: drawerOpen,
        })}
      >
        <Typography variant="h3">Dashboard Component</Typography>
      </Paper>
    );
  } else {
    return <Redirect push to="/" />;
  }
};

export default Dashboard;
