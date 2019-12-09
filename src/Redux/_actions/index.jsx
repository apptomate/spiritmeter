import API from "./API";
import { authHeader } from "../_helpers/AuthHeaders";
//URL
import {
  ALL_LIST_DISPLAY_URL,
  ALL_LIST_ROUTES_URL,
  ALL_LIST_USERS_URL,
  GET_DISPLAY_DETAILS_URL,
  LOGIN_URL
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
  GET_DISPLAY_DETAILS_ERROR
} from "./ActionTypes";

//Authentication
//Login
export function authLogin(formData) {
  return dispatch => {
    API.post(LOGIN_URL, formData)
      .then(response => {
        const {
          token,
          user: { userId, firstName, profileImage }
        } = response.data;
        let loggedUserData = { userId, firstName, profileImage };
        localStorage.setItem("authToken", token);
        localStorage.setItem("loggedUser", JSON.stringify(loggedUserData));
        dispatch({
          type: AUTHLOGIN_SUCCESS,
          payload: response.data
        });
        //Toast.fire({ icon: "success", title: "Login Success" });
      })
      .catch(error => {
        if (error.response) {
          dispatch({
            type: AUTHLOGIN_ERROR,
            payload: error.response.data
          });
          // Swal.fire(getAlertMessage("error", data.errorMessage));
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
            payload: error.response
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
            payload: error.response
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
            payload: error.response
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
            payload: error.response
          });
        }
      });
  };
}
