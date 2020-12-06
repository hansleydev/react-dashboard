// ------------------- Import Required Modules -------------------

import React, { useContext, useState, useReducer } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useHistory } from "react-router-dom";

// Import Axios Config

import { host, origin } from "../../settings/settings.js";

// Axios Cancel Token

const { CancelToken } = axios;
const source = CancelToken.source();

// ------------------- Import Context -------------------

import { GlobalContext } from "../../context/GlobalContext.js";

// ------------------- Import Material UI Components -------------------

import { Grid, Button, CircularProgress, Typography, Slide } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

// Import Styles

import signUpFormStyles from "../../styles/signupForm.styles.js";

// ------------------- Create Step Three of the Sign Up Component -------------------

const SignUpStepThree = (props) => {
  // Invoke JSS Classes

  const classes = signUpFormStyles();

  // Get Props

  const { signUpFormValues, setSignUpFormValues, signUpStep, setSignUpStep } = props;

  // Invoke Context

  const { setProfile, setLoggedIn } = useContext(GlobalContext);

  // ------------------- Create Methods and Handlers -------------------

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
    );
  };

  // Router History

  const routerHistory = useHistory();

  // Form Submit Handler

  const submitForm = async () => {
    try {
      // Disable Button

      await setButtonDisabled(true);

      await setSubmitError({ error: false });
      await setSubmitError({ message: "" });

      const { firstName, lastName, email, password, street, city, state, zip } = signUpFormValues;

      const newUser = { firstName, lastName, email, password, street, city, state, zip };

      // Create New User

      const createdUser = await axios.post(`${host}/api/users`, newUser, {
        headers: {
          "Access-Control-Allow-Origin": origin,
        },
        withCredentials: true,
        cancelToken: source.token,
        timeout: 6000,
      });

      // Automatic Login

      if (createdUser) {
        const credentials = {
          email: newUser.email,
          password: newUser.password,
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

          // Set Form Values

          Object.entries(profileData).map((entry) => {
            return setProfile({ [entry[0]]: entry[1] });
          });

          // Clear Signup Form Values

          Object.entries(signUpFormValues).map((entry) => {
            let newValue;
            if (typeof entry[1] === "string") {
              newValue = "";
            } else if (typeof entry[1] === "object") {
              newValue = {};
            }
            return setSignUpFormValues({ [entry[0]]: newValue });
          });

          // Enable Button

          await setButtonDisabled(false);

          // Reset Form Step

          await setSignUpStep(0);

          await setLoggedIn(true);

          // Redirect to Dashboard

          return routerHistory.push("/home");
        } else {
          // Enable Button

          await setButtonDisabled(false);

          // Re-direct to Landing Page

          routerHistory.push("/");

          throw new Error("Could not authenticate.");
        }
      } else {
        // Enable Button

        await setButtonDisabled(false);

        throw new Error("Could not create profile.");
      }
    } catch (error) {
      // Handle Errors

      if (error.response) {
        const { message } = error.response.data;

        if (message === "User already exist.") {
          const errorSchema = {
            error: true,
            message: "Uh oh! A user with this email already exists.",
            severity: "warning",
          };

          // Set Error Schema

          Object.entries(errorSchema).map((entry) => {
            return setSubmitError({ [entry[0]]: entry[1] });
          });
        } else {
          const errorSchema = {
            error: true,
            message: "Uh oh! We had an issue connecting you. Try again in a few moments.",
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

  return (
    <Slide direction="left" in={signUpStep == 2 && true} mountOnEnter unmountOnExit>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Grid container direction="column" justify="center" alignContent="center">
            {Object.entries(signUpFormValues).map((entry) => {
              const field = entry[0];
              const value = entry[1];
              let name;

              if (field !== "password" && field !== "confirmPassword") {
                switch (field) {
                  case "firstName":
                    name = "First Name";
                    break;

                  case "lastName":
                    name = "Last Name";
                    break;

                  case "street":
                    name = "Street Address";
                    break;

                  case "city":
                    name = "City";
                    break;

                  case "state":
                    name = "State";
                    break;

                  case "zip":
                    name = "Zip Code";
                    break;

                  case "email":
                    name = "Email";
                    break;

                  default:
                    break;
                }
              }

              if (field !== "password") {
                return (
                  <Grid item key={field} className={classes.fieldContainer}>
                    <Typography variant="h5" className={classes.fieldTitle}>
                      {name}
                    </Typography>
                    <Typography variant="body1" className={classes.fieldValue}>
                      {value}
                    </Typography>
                  </Grid>
                );
              } else return null;
            })}
          </Grid>
        </Grid>

        {submitError.error ? (
          <Grid item className={classes.errorContainer}>
            <Grid container justify="center" alignItems="center">
              <Grid item xs={12}>
                <FormAlert />
              </Grid>
            </Grid>
          </Grid>
        ) : null}

        <Grid
          item
          className={classes.specialContainer}
          style={{ marginTop: submitError.error ? "0px" : "20px", marginBottom: "0px" }}
        >
          <Grid container justify="center" alignItems="center" spacing={2}>
            <Grid item xs={10} lg={6}>
              <Button
                variant="outlined"
                color="primary"
                type="button"
                size="large"
                onClick={async () => {
                  try {
                    return await setSignUpStep(signUpStep - 1);
                  } catch (error) {
                    console.error(error);
                    return console.error("Cannot set previous step.");
                  }
                }}
                disabled={buttonDisabled}
                className={classes.button}
              >
                {buttonDisabled ? <CircularProgress size="28px" /> : "Back"}
              </Button>
            </Grid>

            <Grid item xs={10} lg={6}>
              <Button
                variant="contained"
                type="submit"
                size="large"
                color="primary"
                onClick={submitForm}
                disabled={buttonDisabled}
                className={classes.button}
              >
                {buttonDisabled ? <CircularProgress size="28px" /> : "Submit"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Slide>
  );
};

// ------------------- Props Typechecking -------------------

SignUpStepThree.propTypes = {
  signUpStep: PropTypes.number,
  setSignUpStep: PropTypes.func,
  signUpFormValues: PropTypes.objectOf(PropTypes.any),
  setSignUpFormValues: PropTypes.func,
};

export default SignUpStepThree;
