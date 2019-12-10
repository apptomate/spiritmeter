import React from "react";
import { Redirect, Route } from "react-router-dom";

//Logout
export function logout() {
  localStorage.clear();
  window.location.href = "/login";
}

//Logged Token Details
export function loggedTokenDetails() {
  let authToken = localStorage.getItem("authToken");
  return authToken;
}

//Logged User Details
export function loggedUserDetails() {
  let sessionData = localStorage.getItem("loggedUser");
  sessionData = JSON.parse(sessionData) || {};
  return sessionData;
}

//Authenticate Public Routes
export function PublicRoute({ component, ...rest }) {
  const authToken = loggedTokenDetails();
  if (!authToken) return <Route {...rest} component={component} />;
  else return <Redirect to={{ pathname: "/" }} />;
}

//Authenticate Admin Routes
export function ProtectedRoute({ component, ...rest }) {
  const authToken = loggedTokenDetails();
  if (authToken) return <Route {...rest} component={component} />;
  else return <Redirect to={{ pathname: "/login" }} />;
}
