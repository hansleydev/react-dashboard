// ------------------- Import Required Modules -------------------

import React, { useState, useContext, useReducer } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import axios from "axios";
import { Link, useHistory, Redirect } from "react-router-dom";

// Import Axios Config

import { host, origin } from "../../settings/settings.js";

//

const { CancelToken } = axios;
const source = CancelToken.source();

// ------------------- Import Context -------------------

import { GlobalContext } from "../../context/GlobalContext.js";

// ------------------- Import Material UI Components -------------------

import {
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  TextField,
  Button,
  CircularProgress,
  Zoom,
  Slide,
} from "@material-ui/core";

import { Alert } from "@material-ui/lab";

import { LockOutlined, LockOpenOutlined } from "@material-ui/icons";

// ------------------- Import Custom Components -------------------

// Import Validation Schema

import LoginValidation from "../../Models/LoginValidation.js";

// Import Styles

import loginFormStyles from "../../styles/loginForm.styles.js";

// ------------------- Create Sign Up Form Stepper Component -------------------

const LoginForm = () => {
  // Invoke JSS Classes

  const classes = loginFormStyles();

  // Invoke Context

  const { setProfile, loggedIn, setLoggedIn, drawerOpen } = useContext(GlobalContext);

  // Get Pathname

  const history = useHistory();

  const routerHistory = useHistory();

  const path = history.location.pathname;

  // ------------------- Create Methods and Handlers -------------------

  // Set Form Configuration

  const { handleSubmit, register, errors, reset } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: yupResolver(LoginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Disable Button Toggler

  const [buttonDisabled, setButtonDisabled] = useState(false);

  // Submit Error Schema

  const submitErrorSchema = {
    error: false,
    message: "",
    severity: "",
  };

  const reducer = (state, newState) => ({ ...state, ...newState });

  const [submitError, setSubmitError] = useReducer(reducer, submitErrorSchema);

  const FormAlert = () => {
    return (
      <Zoom in={path == "/" && true} mountOnEnter unmountOnExit>
        <Alert
          severity={submitError.severity == "error" ? "error" : "warning"}
          style={{ borderRadius: "10px" }}
          onClose={async () => {
            try {
              await setSubmitError({
                error: false,
                message: "",
                severity: "",
              });
            } catch (error) {
              console.error(error);
            }
          }}
        >
          {submitError.message}
        </Alert>
      </Zoom>
    );
  };

  // Submit Form Handler

  const submitForm = async (data) => {
    try {
      await setSubmitError({ error: false });
      await setSubmitError({ message: "" });

      await setButtonDisabled(true);

      const { email, password } = data;

      const credentials = {
        email,
        password,
      };

      const loginResult = await axios.post(`${host}/auth/login`, credentials, {
        headers: {
          "Access-Control-Allow-Origin": origin,
        },
        withCredentials: true,
        cancelToken: source.token,
        timeout: 6000,
      });

      if (loginResult.data.message && loginResult.data.message === "User authenticated.") {
        const profileData = loginResult.data.user;

        // Set User Profile

        Object.entries(profileData).map((entry) => {
          return setProfile({ [entry[0]]: entry[1] });
        });

        // Enable Button

        await setButtonDisabled(false);

        await setLoggedIn(true);

        return setTimeout(async () => {
          try {
            // Clear form

            await reset();

            // Redirect to Dashboard

            return routerHistory.push("/home");
          } catch (error) {
            return console.error(error);
          }
        }, 700);
      } else {
        // Enable Button

        await setButtonDisabled(false);

        // Clear form

        await reset();

        throw new Error("Could not authenticate.");
      }
    } catch (error) {
      // Clear form

      reset();

      // Handle Errors

      if (error.response) {
        const responseData = error.response.data;

        if (responseData === "Unauthorized") {
          const errorSchema = {
            error: true,
            message: "Oops! Your email and password don't match or can't be found in our records.",
            severity: "error",
          };

          // Set Error Schema

          Object.entries(errorSchema).map((entry) => {
            return setSubmitError({ [entry[0]]: entry[1] });
          });
        } else {
          const errorSchema = {
            error: true,
            message: "Uh oh! Our server had an issue. Try again in a few moments.",
            severity: "error",
          };

          // Set Error Schema

          Object.entries(errorSchema).map((entry) => {
            return setSubmitError({ [entry[0]]: entry[1] });
          });
        }
      } else {
        const errorSchema = {
          error: true,
          message:
            "Oops! An unexpected error occoured. Please give us a few moments while we work on it.",
          severity: "error",
        };

        // Set Error Schema

        Object.entries(errorSchema).map((entry) => {
          return setSubmitError({ [entry[0]]: entry[1] });
        });
      }

      // Enable Button
      return setButtonDisabled(false);
    }
  };

  if (loggedIn) {
    return <Redirect push to="/home" />;
  } else {
    return (
      <Slide direction="left" in={path == "/" && true} mountOnEnter unmountOnExit>
        <Grid
          container
          justify="center"
          alignItems="center"
          className={clsx(classes.content, {
            [classes.contentShift]: drawerOpen,
          })}
        >
          <Grid item xs={12} sm={10} md={6}>
            <Card elevation={12}>
              <CardContent>
                <form autoComplete="off" autoCapitalize="on" onSubmit={handleSubmit(submitForm)}>
                  <Grid
                    container
                    direction="column"
                    alignItems="center"
                    className={classes.formContainer}
                  >
                    <Grid item>
                      {loggedIn ? (
                        <Avatar className={classes.avatar2}>
                          <LockOpenOutlined />
                        </Avatar>
                      ) : (
                        <Avatar className={classes.avatar}>
                          <LockOutlined />
                        </Avatar>
                      )}
                    </Grid>

                    <Grid item className={classes.formTitle}>
                      <Typography variant="h4">Sign In</Typography>
                    </Grid>

                    <Grid item className={classes.textFieldContainer}>
                      <TextField
                        name="email"
                        type="email"
                        label="Email *"
                        variant="outlined"
                        onFocus={async () => {
                          try {
                            await setSubmitError({
                              error: false,
                              message: "",
                              severity: "",
                            });
                          } catch (error) {
                            console.error(error);
                          }
                        }}
                        inputRef={register}
                        error={errors.email && true}
                        helperText={errors.email && errors.email.message}
                        className={classes.textField}
                      />
                    </Grid>

                    <Grid item className={classes.textFieldContainer}>
                      <TextField
                        name="password"
                        type="password"
                        label="Password *"
                        variant="outlined"
                        onFocus={async () => {
                          try {
                            await setSubmitError({
                              error: false,
                              message: "",
                              severity: "",
                            });
                          } catch (error) {
                            console.error(error);
                          }
                        }}
                        inputRef={register}
                        error={errors.password && true}
                        helperText={errors.password && errors.password.message}
                        className={classes.textField}
                      />
                    </Grid>

                    {submitError.error ? (
                      <Zoom in={submitError.error}>
                        <Grid item xs={12} className={classes.textFieldContainer}>
                          <FormAlert />
                        </Grid>
                      </Zoom>
                    ) : null}

                    <Grid
                      item
                      className={classes.textFieldContainer}
                      style={{ marginBottom: "15px" }}
                    >
                      <Button
                        variant="contained"
                        type="submit"
                        size="large"
                        color="primary"
                        disabled={buttonDisabled}
                        className={classes.button}
                      >
                        {buttonDisabled ? <CircularProgress size="28px" /> : "Sign In"}
                      </Button>
                    </Grid>

                    <Grid item className={classes.textFieldContainer}>
                      <Link to="/register" style={{ textDecoration: "none" }}>
                        <Button
                          variant="outlined"
                          type="button"
                          size="large"
                          color="secondary"
                          disabled={buttonDisabled}
                          className={classes.button}
                        >
                          Register
                        </Button>
                      </Link>
                    </Grid>

                    <Grid
                      item
                      className={classes.textFieldContainer}
                      style={{ marginBottom: "0px" }}
                    >
                      <Grid container justify="center">
                        <Grid item xs={12}>
                          <Link to="/recoverpassword" style={{ textDecoration: "none" }}>
                            Forgot password?
                          </Link>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Slide>
    );
  }
};

export default LoginForm;
