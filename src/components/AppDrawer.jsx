// ------------------- Import Required Modules -------------------

import React, { useContext, useState, useReducer } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

// Import Axios Config

import { host, origin } from "../settings/settings.js";

// Axios Cancel Token

const { CancelToken } = axios;
const source = CancelToken.source();

// ------------------- Import Context -------------------

import { GlobalContext } from "../context/GlobalContext.js";

// ------------------- Import Material UI Components -------------------

import {
  Box,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Hidden,
  Card,
  CardContent,
  CardActions,
  Button,
  Avatar,
  Badge,
  Typography,
  CircularProgress,
  Snackbar,
  Slide,
} from "@material-ui/core";

import { Alert } from "@material-ui/lab";

import {
  Home,
  Person,
  Chat,
  ArrowForwardIos,
  LockOpen,
  Create,
  AddCircle,
  ExitToApp,
  GroupAdd,
  Settings,
  Help,
  Info,
} from "@material-ui/icons";

import drawerStyles from "../styles/drawer.styles.js";

// ------------------- Create Drawer Component -------------------

const AppDrawer = (props) => {
  // Invoke JSS Classes

  const classes = drawerStyles();

  // Get Profile and Authentication Status

  const { loggedIn, setLoggedIn, profile, setProfile, drawerOpen, setDrawerOpen } = useContext(
    GlobalContext
  );

  const { firstName, lastName, email } = profile;

  // ------------------- Create Methods and Handlers -------------------

  // Disable Button Toggler

  const [buttonDisabled, setButtonDisabled] = useState(false);

  // Get Router History

  const routerHistory = useHistory();

  // Error Schema

  const errorAlertSchema = {
    error: false,
    message: "",
    severity: "",
  };

  const reducer = (state, newState) => ({ ...state, ...newState });

  const [errorAlert, setErrorAlert] = useReducer(reducer, errorAlertSchema);

  // ------------------- Create Form Error Component -------------------

  const FormError = () => {
    const closeError = async () => {
      try {
        return await Object.entries(errorAlert).map((entry) => {
          let newValue;

          if (entry[0] === "error") {
            newValue = false;
          } else newValue = "";

          return setErrorAlert({ [entry[0]]: newValue });
        });
      } catch (error) {
        return console.error(error);
      }
    };
    return (
      <Snackbar
        open={errorAlert.error}
        autoHideDuration={8000}
        onClose={closeError}
        TransitionComponent={Slide}
      >
        <Alert onClose={closeError} severity={errorAlert.severity == "error" ? "error" : "warning"}>
          {errorAlert.message}
        </Alert>
      </Snackbar>
    );
  };

  const logout = async () => {
    try {
      // Disable Button

      await setButtonDisabled(true);

      const loggedOut = await axios.post(
        `${host}/auth/logout`,
        {},
        {
          headers: {
            "Access-Control-Allow-Origin": origin,
          },
          withCredentials: true,
          cancelToken: source.token,
          timeout: 4000,
        }
      );

      if (loggedOut) {
        // Clear Profile Values

        Object.entries(profile).map((entry) => {
          let newValue;

          if (typeof entry[1] === "string") {
            newValue = "";
          } else if (typeof entry[1] === "object") {
            newValue = {};
          } else if (typeof entry[1] === "number") {
            newValue = 0;
          }

          return setProfile({ [entry[0]]: newValue });
        });

        // Enable Button

        await setButtonDisabled(false);

        // Set Logged In Status

        await setLoggedIn(false);

        // Close Drawer

        await setDrawerOpen(false);

        // Re-direct to Landing Page

        return routerHistory.push("/");
      } else {
        // Enable Button

        await setButtonDisabled(false);

        throw new Error("Could not log out.");
      }
    } catch (error) {
      const errorSchema = {
        error: true,
        message: "Oops! We couldn't log you out. Try again in a few moments.",
        severity: "warning",
      };

      // Set Error Schema

      Object.entries(errorSchema).map((entry) => {
        return setErrorAlert({ [entry[0]]: entry[1] });
      });

      // Enable Button

      return setButtonDisabled(false);
    }
  };

  let drawerTiles;

  if (loggedIn) {
    // Drawer Tiles

    drawerTiles = [
      {
        icon: <Home />,
        text: "Home",
      },
      {
        icon: <Chat />,
        text: "Chat",
      },
      {
        icon: <GroupAdd />,
        text: "Friends",
      },
      {
        text: "Divider",
      },
      {
        icon: <Settings />,
        text: "Settings",
      },
      {
        icon: <Help />,
        text: "Support",
      },
      {
        icon: <Info />,
        text: "About",
      },
    ];
  } else {
    // Drawer Tiles

    drawerTiles = [
      {
        icon: <Home />,
        text: "Home",
      },
      {
        icon: <LockOpen />,
        text: "Login",
      },
      {
        icon: <Create />,
        text: "Register",
      },
      {
        text: "Divider",
      },
      {
        icon: <Help />,
        text: "Support",
      },
      {
        icon: <Info />,
        text: "About",
      },
    ];
  }

  const { window } = props;

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    // Persistent Drawer
    <>
      <Hidden smUp>
        <Drawer
          container={container}
          variant="temporary"
          anchor="right"
          open={drawerOpen}
          onClose={async () => {
            try {
              return await setDrawerOpen(false);
            } catch (error) {
              return console.error(error);
            }
          }}
          classes={{
            paper: classes.mobileDrawer,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <Divider />
          <Box
            style={{
              width: "100%",
              display: "flex",
              justifyContent: loggedIn ? "space-between" : "end",
            }}
          >
            <IconButton
              onClick={async () => {
                try {
                  return await setDrawerOpen(false);
                } catch (error) {
                  return console.error(error);
                }
              }}
            >
              <ArrowForwardIos />
            </IconButton>

            {loggedIn && (
              <Button
                variant="text"
                color="primary"
                onClick={logout}
                disabled={buttonDisabled}
                endIcon={buttonDisabled ? null : <ExitToApp />}
                style={{ marginRight: "10px" }}
              >
                {buttonDisabled ? <CircularProgress size="20px" /> : "Logout"}
              </Button>
            )}
          </Box>
          <Divider />

          {loggedIn && (
            <Card
              elevation={0}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CardContent
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  paddingBottom: "0px",
                }}
              >
                <Badge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  badgeContent={
                    <IconButton color="secondary">
                      <AddCircle />
                    </IconButton>
                  }
                  style={{ width: "100px", height: "100px", marginBottom: "10px" }}
                >
                  <Avatar style={{ width: "100%", height: "100%" }}>
                    <Person style={{ width: "70px", height: "70px" }} />
                  </Avatar>
                </Badge>

                <Typography variant="subtitle1">{`${firstName} ${lastName}`}</Typography>
                <Typography variant="caption">{email}</Typography>
              </CardContent>
              <CardActions style={{ alignSelf: "end" }}>
                <Button variant="text" color="secondary" size="small">
                  Edit
                </Button>
              </CardActions>
            </Card>
          )}

          {loggedIn && <Divider />}
          <List>
            {drawerTiles.map((tile) => {
              const { icon, text } = tile;

              if (text === "Divider") {
                return <Divider key={text} />;
              } else {
                return (
                  <ListItem button key={text}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                );
              }
            })}
            <Divider />
          </List>
        </Drawer>
      </Hidden>

      <Hidden xsDown>
        <Drawer
          classes={{
            paper: classes.drawer,
          }}
          variant="persistent"
          open={drawerOpen}
          anchor="right"
        >
          <List style={{ paddingTop: "64px" }}>
            <Divider />

            <Box
              style={{
                width: "100%",
                display: "flex",
                justifyContent: loggedIn ? "space-between" : "end",
              }}
            >
              <IconButton
                onClick={async () => {
                  try {
                    return await setDrawerOpen(false);
                  } catch (error) {
                    return console.error(error);
                  }
                }}
              >
                <ArrowForwardIos />
              </IconButton>

              {loggedIn && (
                <Button
                  variant="text"
                  color="primary"
                  onClick={logout}
                  disabled={buttonDisabled}
                  endIcon={buttonDisabled ? null : <ExitToApp />}
                  style={{ marginRight: "10px" }}
                >
                  {buttonDisabled ? <CircularProgress size="20px" /> : "Logout"}
                </Button>
              )}
            </Box>

            <Divider />

            {loggedIn && (
              <Card
                elevation={0}
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <CardContent
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingBottom: "0px",
                  }}
                >
                  <Badge
                    overlap="circle"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    badgeContent={
                      <IconButton color="secondary">
                        <AddCircle />
                      </IconButton>
                    }
                    style={{ width: "100px", height: "100px", marginBottom: "10px" }}
                  >
                    <Avatar style={{ width: "100%", height: "100%" }}>
                      <Person style={{ width: "70px", height: "70px" }} />
                    </Avatar>
                  </Badge>

                  <Typography variant="subtitle1">{`${firstName} ${lastName}`}</Typography>
                  <Typography variant="caption">{email}</Typography>
                </CardContent>
                <CardActions style={{ alignSelf: "end" }}>
                  <Button variant="text" color="secondary" size="small">
                    Edit
                  </Button>
                </CardActions>
              </Card>
            )}

            {loggedIn && <Divider />}
            {drawerTiles.map((tile) => {
              const { icon, text } = tile;

              if (text === "Divider") {
                return <Divider key={text} />;
              } else {
                return (
                  <ListItem button key={text}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                );
              }
            })}
          </List>
          <Divider />
        </Drawer>
      </Hidden>
      {errorAlert.error && <FormError />}
    </>
  );
};

// ------------------- Props Typechecking -------------------

AppDrawer.propTypes = {
  window: PropTypes.func,
};

export default AppDrawer;
