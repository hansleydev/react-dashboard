// ------------------- Import Required Modules -------------------

import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

// ------------------- Import Context -------------------

import { GlobalContext } from "../context/GlobalContext.js";

// ------------------- Import MUI Components -------------------

import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Button,
  Typography,
  IconButton,
  Badge,
} from "@material-ui/core";

import { Menu, Notifications } from "@material-ui/icons";

// Import Styles

import navbarStyles from "../styles/navbar.styles.js";

// ------------------- Create Main Navbar Component -------------------

const Navbar = () => {
  // Invoke JSS Classes

  const classes = navbarStyles();

  // Invoke Context

  const { loggedIn, profile, drawerOpen, setDrawerOpen } = useContext(GlobalContext);

  // Get Notification Count

  const { alertCount } = profile;

  // Get Router History

  const routerHistory = useHistory();

  // ------------------- Create Button Group Child Component -------------------

  const ButtonGroup = () => {
    if (!loggedIn) {
      return (
        <Box className={classes.buttonGroupRoot}>
          <IconButton
            color="inherit"
            onClick={async () => {
              try {
                return await setDrawerOpen(!drawerOpen);
              } catch (error) {
                return console.error(error);
              }
            }}
          >
            <Menu />
          </IconButton>
        </Box>
      );
    } else {
      return (
        <Box className={classes.buttonGroupRoot}>
          <IconButton color="inherit">
            <Badge badgeContent={alertCount} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton
            color="inherit"
            onClick={async () => {
              try {
                return await setDrawerOpen(!drawerOpen);
              } catch (error) {
                return console.error(error);
              }
            }}
          >
            <Menu />
          </IconButton>
        </Box>
      );
    }
  };

  return (
    <AppBar position="sticky" className={classes.root}>
      <Toolbar>
        <Container className={classes.container}>
          <Button
            variant="text"
            color="inherit"
            onClick={async () => {
              try {
                if (loggedIn) {
                  return await routerHistory.push("/home");
                } else {
                  return await routerHistory.push("/");
                }
              } catch (error) {
                return console.error(error);
              }
            }}
          >
            <Typography variant="h6" className={classes.brand}>
              Pluviose
            </Typography>
          </Button>
          <ButtonGroup />
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
