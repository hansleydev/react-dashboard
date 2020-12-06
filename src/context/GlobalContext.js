// ------------------- Import Required Modules -------------------

import React, { useState, useReducer, createContext } from "react";
import PropTypes from "prop-types";

// Create Context

export const GlobalContext = createContext();

// Create Context Provider

export const GlobalProvider = (props) => {
  // Create Reducer

  const reducer = (state, newState) => ({ ...state, ...newState });

  // Set Is User Logged In

  const [loggedIn, setLoggedIn] = useState(false);

  // Create Profile Values and Handlers

  const profileInitialValues = {
    firstName: "",
    lastName: "",
    email: "",
    address: {},
    alertCount: 2,
  };

  const [profile, setProfile] = useReducer(reducer, profileInitialValues);

  // Set Drawer State

  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        profile,
        setProfile,
        drawerOpen,
        setDrawerOpen,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

// ------------------- Props Typechecking -------------------

GlobalProvider.propTypes = {
  children:
    PropTypes.element ||
    PropTypes.arrayOf(PropTypes.element) ||
    PropTypes.objectOf(PropTypes.element),
};
