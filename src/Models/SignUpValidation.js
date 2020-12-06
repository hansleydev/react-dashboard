// ------------------- Import Required Modules -------------------

import * as Yup from "yup";

// Set RegEx Values

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/g;

// ------------------- Create Sign Up Form Validation Schema -------------------

const SignUpValidation = {
  stepOne: Yup.object().shape({
    firstName: Yup.string()
      .required("*Required.")
      .min(2, "Must have a minimum of 2 characters.")
      .max(25, "Maximum characters allowed is 25.")
      .matches(/^[a-zA-Z ]*$/g, {
        message: "Only letters allowed.",
        excludeEmptyString: true,
      })
      .trim(),
    lastName: Yup.string()
      .required("*Required.")
      .min(2, "Must have a minimum of 2 characters.")
      .max(25, "Maximum characters allowed is 25.")
      .matches(/^[a-zA-Z ]*$/g, {
        message: "Only letters allowed.",
        excludeEmptyString: true,
      })
      .trim(),
    email: Yup.string()
      .required("*Required.")
      .email("Enter a valid email.")
      .min(8, "Must have a minimum of 8 characters.")
      .max(64, "Maximum characters allowed is 64.")
      .trim(),
    password: Yup.string()
      .required("*Required.")
      .matches(passwordRegex, {
        message: "Try a stronger password.",
        excludeEmptyString: true,
      })
      .min(6)
      .max(30, "Maximum characters allowed is 30.")
      .trim(),
  }),
  stepTwo: Yup.object().shape({
    street: Yup.string()
      .required("*Required.")
      .matches(/^\d+\s[A-z\s\.]+\s[A-z\.)]*$/g, {
        message: "Enter a valid Street Address.",
        excludeEmptyString: true,
      })
      .min(10, "Must have a minimum of 10 characters.")
      .max(50, "Maximum characters allowed is 50.")
      .trim(),
    city: Yup.string()
      .required("*Required.")
      .min(3, "Must have a minimum of 3 characters.")
      .max(40, "Maximum characters allowed is 40.")
      .matches(/^[a-zA-Z ]*$/g, {
        message: "Only letters allowed.",
        excludeEmptyString: true,
      })
      .trim(),
    state: Yup.string()
      .required("*Required.")
      .min(4, "Must have a minimum of 4 characters.")
      .max(14, "Maximum characters allowed is 14.")
      .trim(),
    zip: Yup.string()
      .required("*Required.")
      .min(5, "Enter a valid US Zip Code.")
      .max(5, "Enter a valid US Zip Code.")
      .matches(/\d{5}/g, {
        message: "Enter a valid US Zip Code.",
        excludeEmptyString: true,
      })
      .trim(),
  }),
};

export default SignUpValidation;
