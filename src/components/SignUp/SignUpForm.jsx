// ------------------- Import Required Modules -------------------

import React, { useContext, useState, useReducer } from "react";
import { useHistory, Redirect } from "react-router-dom";
import clsx from "clsx";

// ------------------- Import Context -------------------

import { GlobalContext } from "../../context/GlobalContext.js";

// ------------------- Import Material UI Components -------------------

import { Grid, Card, CardContent, Avatar, Typography, Slide } from "@material-ui/core";

import { Create } from "@material-ui/icons";

// ------------------- Import Custom Components -------------------

import SignUpStepOne from "./SignUpStepOne";
import SignUpStepTwo from "./SignUpStepTwo";
import SignUpStepThree from "./SignUpStepThree";

// Import Styles

import signUpFormStyles from "../../styles/signupForm.styles.js";

// ------------------- Create Sign Up Form Stepper Component -------------------

const SignUpForm = () => {
  // Invoke JSS Classes

  const classes = signUpFormStyles();

  // Invoke Context

  const { loggedIn, drawerOpen } = useContext(GlobalContext);

  // Set Current Step In Sign Up Form

  const [signUpStep, setSignUpStep] = useState(0);

  // Create Sign Up Form Values and Handlers

  const signUpFormInitialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  };

  const reducer = (state, newState) => ({ ...state, ...newState });

  const [signUpFormValues, setSignUpFormValues] = useReducer(reducer, signUpFormInitialValues);

  // Get Pathname

  const routerHistory = useHistory();

  const path = routerHistory.location.pathname;

  if (loggedIn) {
    return <Redirect push to="/home" />;
  } else {
    return (
      <Slide direction="left" in={path == "/register" && true} mountOnEnter unmountOnExit>
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
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justify="center"
                  className={classes.formContainer}
                >
                  <Grid item>
                    <Avatar className={classes.avatar}>
                      <Create />
                    </Avatar>
                  </Grid>

                  <Grid item className={classes.formTitle}>
                    <Typography variant="h4">
                      {signUpStep == 2 ? "Create Account" : "Sign Up"}
                    </Typography>
                  </Grid>

                  {signUpStep === 0 && (
                    <SignUpStepOne
                      signUpStep={signUpStep}
                      setSignUpStep={setSignUpStep}
                      signUpFormValues={signUpFormValues}
                      setSignUpFormValues={setSignUpFormValues}
                    />
                  )}

                  {signUpStep === 1 && (
                    <SignUpStepTwo
                      signUpStep={signUpStep}
                      setSignUpStep={setSignUpStep}
                      signUpFormValues={signUpFormValues}
                      setSignUpFormValues={setSignUpFormValues}
                    />
                  )}

                  {signUpStep === 2 && (
                    <SignUpStepThree
                      signUpStep={signUpStep}
                      setSignUpStep={setSignUpStep}
                      signUpFormValues={signUpFormValues}
                      setSignUpFormValues={setSignUpFormValues}
                    />
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Slide>
    );
  }
};

export default SignUpForm;
