// ------------------- Import Required Modules -------------------

import * as Yup from "yup";

// ------------------- Create Log In Form Validation Schema -------------------

const LoginValidation = Yup.object().shape({
  email: Yup.string()
    .required("*Required.")
    .email("Enter a valid email.")
    .max(64, "Maximum characters allowed is 64.")
    .trim(),
  password: Yup.string().required("*Required.").max(30, "Maximum characters allowed is 30.").trim(),
});

export default LoginValidation;
