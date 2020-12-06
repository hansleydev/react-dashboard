// ------------------- Import Required Modules -------------------

import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";

// ------------------- Import Material UI Components -------------------

import {
  Grid,
  TextField,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@material-ui/core";

import { Visibility, VisibilityOff } from "@material-ui/icons";

// Import Styles

import signUpFormStyles from "../../styles/signupForm.styles.js";

// Import Validation Schema

import SignUpValidation from "../../Models/SignUpValidation.js";

// ------------------- Create Step One of the Sign Up Component -------------------

const SignUpStepOne = (props) => {
  // Invoke JSS Classes

  const classes = signUpFormStyles();

  // Get Props

  const { signUpFormValues, setSignUpFormValues, signUpStep, setSignUpStep } = props;

  // ------------------- Create Methods and Handlers -------------------

  // Set Form Configuration

  const { handleSubmit, register, errors } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: yupResolver(SignUpValidation.stepOne),
    defaultValues: {
      firstName: signUpFormValues.firstName !== "" ? signUpFormValues.firstName : "",
      lastName: signUpFormValues.lastName !== "" ? signUpFormValues.lastName : "",
      email: signUpFormValues.email !== "" ? signUpFormValues.email : "",
      password: signUpFormValues.password !== "" ? signUpFormValues.password : "",
    },
  });

  // Disable Button Toggler

  const [buttonDisabled, setButtonDisabled] = useState(false);

  // Show Password Toggler

  const [showPassword, setShowPassword] = useState(false);

  // Show Passowrd Handler

  const togglePassword = async () => {
    try {
      return await setShowPassword(!showPassword);
    } catch (error) {
      return console.error(error);
    }
  };

  // Form Submit Handler

  const submitForm = async (data) => {
    try {
      // Disable Button

      await setButtonDisabled(true);

      // Set Form Values

      Object.entries(data).map((entry) => {
        return setSignUpFormValues({ [entry[0]]: entry[1] });
      });

      await setButtonDisabled(false);

      return await setSignUpStep(signUpStep + 1);
    } catch (error) {
      console.error(error);
      return console.error("Could not submit form");
    }
  };

  return (
    <form autoComplete="off" autoCapitalize="on" onSubmit={handleSubmit(submitForm)}>
      <Grid item>
        <Grid container justify="center" alignItems="center" spacing={1}>
          <Grid item xs={12} lg={5} className={classes.specialContainer}>
            <TextField
              variant="outlined"
              name="firstName"
              label="First Name *"
              inputRef={register}
              error={errors.firstName && true}
              helperText={errors.firstName && errors.firstName.message}
              className={classes.textField}
            />
          </Grid>

          <Grid item xs={12} lg={5} className={classes.textFieldContainer}>
            <TextField
              variant="outlined"
              name="lastName"
              label="Last Name *"
              inputRef={register}
              error={errors.lastName && true}
              helperText={errors.lastName && errors.lastName.message}
              className={classes.textField}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12} lg={10} className={classes.textFieldContainer}>
            <TextField
              variant="outlined"
              name="email"
              label="Email *"
              type="email"
              inputRef={register}
              error={errors.email && true}
              helperText={errors.email && errors.email.message}
              className={classes.textField}
            />
          </Grid>

          <Grid item xs={12} lg={10} className={classes.textFieldContainer}>
            <TextField
              variant="outlined"
              name="password"
              label="Password *"
              type={showPassword ? "text" : "password"}
              inputRef={register}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton onClick={togglePassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={errors.password && true}
              helperText={errors.password && errors.password.message}
              className={classes.textField}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container justify="center" alignItems="center">
          <Grid
            item
            xs={12}
            lg={5}
            className={classes.textFieldContainer}
            style={{ marginBottom: "0px" }}
          >
            <Button
              variant="contained"
              type="submit"
              size="large"
              color="primary"
              disabled={buttonDisabled}
              className={classes.button}
            >
              {buttonDisabled ? <CircularProgress size="28px" /> : "Next"}
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item style={{ marginTop: "20px" }}>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              Already have an account?
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

// ------------------- Props Typechecking -------------------

SignUpStepOne.propTypes = {
  signUpStep: PropTypes.number,
  setSignUpStep: PropTypes.func,
  signUpFormValues: PropTypes.objectOf(PropTypes.any),
  setSignUpFormValues: PropTypes.func,
};

export default SignUpStepOne;
