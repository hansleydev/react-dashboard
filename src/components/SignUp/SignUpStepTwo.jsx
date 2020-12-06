// ------------------- Import Required Modules -------------------

import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// ------------------- Import Material UI Components -------------------

import {
  Grid,
  FormControl,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Slide,
} from "@material-ui/core";

// Import Styles

import signUpFormStyles from "../../styles/signupForm.styles.js";

// Import Validation Schema

import SignUpValidation from "../../Models/SignUpValidation.js";

// Import Utilities

import States from "../../Models/States.js";

// ------------------- Create Step Two of the Sign Up Component -------------------

const SignUpStepTwo = (props) => {
  // Invoke JSS Classes

  const classes = signUpFormStyles();

  // Get Props

  const { signUpFormValues, setSignUpFormValues, signUpStep, setSignUpStep } = props;

  // ------------------- Create Methods and Handlers -------------------

  // Set Form Configuration

  const { handleSubmit, register, control, errors } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: yupResolver(SignUpValidation.stepTwo),
    defaultValues: {
      street: signUpFormValues.street !== "" ? signUpFormValues.street : "",
      city: signUpFormValues.city !== "" ? signUpFormValues.city : "",
      state: signUpFormValues.state !== "Alabama" ? signUpFormValues.state : "Alabama",
      zip: signUpFormValues.zip !== "" ? signUpFormValues.zip : "",
    },
  });

  // Disable Button Toggler

  const [buttonDisabled, setButtonDisabled] = useState(false);

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
    <Slide direction="left" in={signUpStep == 1 && true} mountOnEnter unmountOnExit>
      <form autoComplete="off" autoCapitalize="on" onSubmit={handleSubmit(submitForm)}>
        <Grid item>
          <Grid container justify="center" alignItems="center">
            <Grid item xs={12} lg={10} className={classes.textFieldContainer}>
              <TextField
                variant="outlined"
                name="street"
                label="Address Line 1 *"
                inputRef={register}
                error={errors.street && true}
                helperText={errors.street && errors.street.message}
                className={classes.textField}
                inputProps={{
                  maxLength: 51,
                }}
              />
            </Grid>

            <Grid item xs={12} lg={10} className={classes.textFieldContainer}>
              <TextField
                variant="outlined"
                name="city"
                label="City *"
                inputRef={register}
                error={errors.city && true}
                helperText={errors.city && errors.city.message}
                className={classes.textField}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container justify="center" alignItems="center">
            <Grid item xs={12} lg={10} className={classes.textFieldContainer}>
              <FormControl variant="outlined" className={classes.textField}>
                <InputLabel id="stateInputLabel">State</InputLabel>
                <Controller
                  as={
                    <Select labelId="stateInputLabel" label="State">
                      {States.map((state) => {
                        return (
                          <MenuItem key={state} value={state}>
                            {state}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  }
                  name="state"
                  type="select"
                  control={control}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} lg={10} className={classes.textFieldContainer}>
              <TextField
                variant="outlined"
                name="zip"
                label="Postal Code *"
                inputRef={register}
                error={errors.zip && true}
                helperText={errors.zip && errors.zip.message}
                className={classes.textField}
                inputProps={{
                  maxLength: 5,
                  minLength: 5,
                }}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container justify="center" alignItems="center" spacing={1}>
            <Grid item xs={12} lg={5} className={classes.specialContainer}>
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

            <Grid item xs={12} lg={5} className={classes.specialContainer}>
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
      </form>
    </Slide>
  );
};

// ------------------- Props Typechecking -------------------

SignUpStepTwo.propTypes = {
  signUpStep: PropTypes.number,
  setSignUpStep: PropTypes.func,
  signUpFormValues: PropTypes.objectOf(PropTypes.any),
  setSignUpFormValues: PropTypes.func,
};

export default SignUpStepTwo;
