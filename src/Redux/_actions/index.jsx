import API from "./API";
import { authHeader } from "../_helpers/AuthHeaders";
//URL
import {
  LOGIN_URL,
  ALL_LIST_DISPLAY_URL,
  ALL_LIST_ROUTES_URL,
  ALL_LIST_USERS_URL,
  GET_DISPLAY_DETAILS_URL,
  GET_ROUTE_DETAILS_URL
} from "../_helpers/Constants";
//Action Types
import {
  AUTHLOGIN_SUCCESS,
  AUTHLOGIN_ERROR,
  ALL_LIST_DISPLAY_LOADING,
  ALL_LIST_DISPLAY_SUCCESS,
  ALL_LIST_DISPLAY_ERROR,
  ALL_LIST_ROUTES_LOADING,
  ALL_LIST_ROUTES_SUCCESS,
  ALL_LIST_ROUTES_ERROR,
  ALL_LIST_USERS_LOADING,
  ALL_LIST_USERS_SUCCESS,
  ALL_LIST_USERS_ERROR,
  GET_DISPLAY_DETAILS_LOADING,
  GET_DISPLAY_DETAILS_SUCCESS,
  GET_DISPLAY_DETAILS_ERROR,
  GET_ROUTE_DETAILS_LOADING,
  GET_ROUTE_DETAILS_SUCCESS,
  GET_ROUTE_DETAILS_ERROR
} from "./ActionTypes";

import { message } from "antd";

//Authentication
//Login
export function authLogin(formData) {
  return dispatch => {
    API.post(LOGIN_URL, formData)
      .then(response => {
        const {
          token,
          user: { userId, firstName, profileImage, role }
        } = response.data;
        if (role === "Admin") {
          let loggedUserData = { userId, firstName, profileImage };
          localStorage.setItem("authToken", token);
          localStorage.setItem("loggedUser", JSON.stringify(loggedUserData));
          dispatch({
            type: AUTHLOGIN_SUCCESS,
            payload: response.data
          });
          message.success("Login Success");
        } else {
          message.warning("You are not an admin");
        }
      })
      .catch(error => {
        if (error.response) {
          let { data } = error.response;
          dispatch({
            type: AUTHLOGIN_ERROR,
            payload: data
          });
          message.error(data.errorMessage);
        }
      });
  };
}

//Display
//Get All List Category
export function getAllListDisplay() {
  return dispatch => {
    dispatch({
      type: ALL_LIST_DISPLAY_LOADING
    });
    API.get(ALL_LIST_DISPLAY_URL, { headers: authHeader() })
      .then(response => {
        dispatch({
          type: ALL_LIST_DISPLAY_SUCCESS,
          payload: response.data
        });
      })
      .catch(error => {
        if (error.response) {
          dispatch({
            type: ALL_LIST_DISPLAY_ERROR,
            payload: error.response.data
          });
        }
      });
  };
}
//Get Display Details
export function getDisplayDetails(displayId) {
  return dispatch => {
    dispatch({
      type: GET_DISPLAY_DETAILS_LOADING
    });
    API.get(GET_DISPLAY_DETAILS_URL + "/" + displayId, {
      headers: authHeader()
    })
      .then(response => {
        dispatch({
          type: GET_DISPLAY_DETAILS_SUCCESS,
          payload: response.data
        });
      })
      .catch(error => {
        if (error.response) {
          dispatch({
            type: GET_DISPLAY_DETAILS_ERROR,
            payload: error.response.data
          });
        }
      });
  };
}

//Routes
//Get All List Routes
export function getAllListRoutes() {
  return dispatch => {
    dispatch({
      type: ALL_LIST_ROUTES_LOADING
    });
    API.get(ALL_LIST_ROUTES_URL, { headers: authHeader() })
      .then(response => {
        dispatch({
          type: ALL_LIST_ROUTES_SUCCESS,
          payload: response.data
        });
      })
      .catch(error => {
        if (error.response) {
          dispatch({
            type: ALL_LIST_ROUTES_ERROR,
            payload: error.response.data
          });
        }
      });
  };
}

//Get Route Details
export function getRouteDetails(routeParam) {
  return dispatch => {
    dispatch({
      type: GET_ROUTE_DETAILS_LOADING
    });
    API.get(GET_ROUTE_DETAILS_URL, {
      headers: authHeader(),
      params: routeParam
    })
      .then(response => {
        dispatch({
          type: GET_ROUTE_DETAILS_SUCCESS,
          payload: response.data
        });
      })
      .catch(error => {
        if (error.response) {
          dispatch({
            type: GET_ROUTE_DETAILS_ERROR,
            payload: error.response.data
          });
        }
      });
  };
}

//Users
//Get All List Users
export function getAllListUsers() {
  return dispatch => {
    dispatch({
      type: ALL_LIST_USERS_LOADING
    });
    API.get(ALL_LIST_USERS_URL, { headers: authHeader() })
      .then(response => {
        dispatch({
          type: ALL_LIST_USERS_SUCCESS,
          payload: response.data
        });
      })
      .catch(error => {
        if (error.response) {
          dispatch({
            type: ALL_LIST_USERS_ERROR,
            payload: error.response.data
          });
        }
      });
  };
}
