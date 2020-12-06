// ------------------- Import Required Modules -------------------

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { StylesProvider, ThemeProvider } from "@material-ui/styles";

// ------------------- Import Context & Provider -------------------

import { GlobalProvider } from "../context/GlobalContext.js";

// ------------------- Import Theme -------------------

import theme from "../theme/theme.js";

// ------------------- Import Custom Components -------------------

import Base from "./Base.jsx";
import Navbar from "./Navbar.jsx";
import LoginForm from "./Login/LoginForm.jsx";
import SignUpForm from "./SignUp/SignUpForm.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";

// ------------------- Create Main App Component -------------------

const App = () => {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <GlobalProvider>
          <Router>
            <Base>
              <Switch>
                <Route path="/register">
                  <Navbar />
                  <SignUpForm />
                </Route>

                <Route path="/home">
                  <Navbar />
                  <Dashboard />
                </Route>

                <Route exact path="/">
                  <Navbar />
                  <LoginForm />
                </Route>

                <Route>
                  <Navbar />
                  <h1>Error: 404. Not Found</h1>
                </Route>
              </Switch>
            </Base>
          </Router>
        </GlobalProvider>
      </ThemeProvider>
    </StylesProvider>
  );
};

export default App;
