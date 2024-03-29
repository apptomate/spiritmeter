import API from "./API";
import { authHeader } from "../_helpers/AuthHeaders";
//URL
import {
  ALL_LIST_DISPLAY_URL,
  ALL_LIST_ROUTES_URL,
  ALL_LIST_USERS_URL,
  GET_DISPLAY_DETAILS_URL,
  GET_ROUTE_DETAILS_URL,
  GET_USER_DETAILS_URL,
  GET_USER_SPIRITMETER_URL,
  GET_USER_DISPLAY_URL,
  GET_USER_ROUTE_URL,
  ADD_USER_URL,
  DELETE_USER_URL,
  UPDATE_USER_URL,
  GET_DASHBOARD_DATA_URL
} from "../_helpers/Constants";
//Action Types
import {
  GET_DASHBOARD_DATA_LOADING,
  GET_DASHBOARD_DATA_SUCCESS,
  GET_DASHBOARD_DATA_ERROR,
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
  GET_ROUTE_DETAILS_ERROR,
  GET_USER_DETAILS_LOADING,
  GET_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS_ERROR,
  GET_USER_SPIRITMETER_SUCCESS,
  GET_USER_SPIRITMETER_ERROR,
  GET_USER_DISPLAY_SUCCESS,
  GET_USER_DISPLAY_ERROR,
  GET_USER_ROUTE_SUCCESS,
  GET_USER_ROUTE_ERROR,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR
} from "./ActionTypes";

import { message } from "antd";

//Dashboard
//Get Dashboard Details
export function getDashboardData() {
  return dispatch => {
    dispatch({
      type: GET_DASHBOARD_DATA_LOADING
    });
    API.get(GET_DASHBOARD_DATA_URL, { headers: authHeader() })
      .then(response => {
        dispatch({
          type: GET_DASHBOARD_DATA_SUCCESS,
          payload: response.data
        });
      })
      .catch(error => {
        if (error.response) {
          let { data } = error.response;
          dispatch({
            type: GET_DASHBOARD_DATA_ERROR,
            payload: data
          });
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

//Get User Details
export function getUserDetails(userId) {
  return dispatch => {
    dispatch({
      type: GET_USER_DETAILS_LOADING
    });
    API.get(GET_USER_DETAILS_URL + "/" + userId, {
      headers: authHeader()
    })
      .then(response => {
        dispatch({
          type: GET_USER_DETAILS_SUCCESS,
          payload: response.data
        });
      })
      .catch(error => {
        if (error.response) {
          dispatch({
            type: GET_USER_DETAILS_ERROR,
            payload: error.response.data
          });
        }
      });
  };
}

//Create User
export function addUser(formData) {
  return dispatch => {
    API.post(ADD_USER_URL, formData, { headers: authHeader() })
      .then(response => {
        dispatch(getAllListUsers());
        dispatch({
          type: ADD_USER_SUCCESS,
          payload: response.data
        });
        message.success(response.data);
      })
      .catch(error => {
        if (error.response) {
          let { data } = error.response;
          dispatch({
            type: ADD_USER_ERROR,
            payload: data
          });
          message.error(data.errorMessage);
        }
      });
  };
}

export function updateUser(formData) {
  return dispatch => {
    API.put(UPDATE_USER_URL, formData, { headers: authHeader() })
      .then(response => {
        dispatch(getAllListUsers());
        dispatch({
          type: ADD_USER_SUCCESS,
          payload: response.data
        });
        message.success(response.data);
      })
      .catch(error => {
        if (error.response) {
          let { data } = error.response;
          dispatch({
            type: ADD_USER_ERROR,
            payload: data
          });
          message.error(data.errorMessage);
        }
      });
  };
}

//Delete User
export function deleteUser(paramData) {
  return dispatch => {
    API.delete(DELETE_USER_URL, { headers: authHeader(), params: paramData })
      .then(response => {
        dispatch(getAllListUsers());
        dispatch({
          type: DELETE_USER_SUCCESS,
          payload: response.data
        });
        message.success(response.data);
      })
      .catch(error => {
        if (error.response) {
          let { data } = error.response;
          dispatch({
            type: DELETE_USER_ERROR,
            payload: data
          });
          message.error(data);
        }
      });
  };
}

//Get User Spirit Meter
export function getUserSpiritMeter(userId) {
  return dispatch => {
    API.get(GET_USER_SPIRITMETER_URL + "/" + userId, {
      headers: authHeader()
    })
      .then(response => {
        dispatch({
          type: GET_USER_SPIRITMETER_SUCCESS,
          payload: response.data
        });
      })
      .catch(error => {
        if (error.response) {
          dispatch({
            type: GET_USER_SPIRITMETER_ERROR,
            payload: error.response.data
          });
        }
      });
  };
}

//Get User Display
export function getUserDisplay(userId) {
  return dispatch => {
    API.get(GET_USER_DISPLAY_URL + "/" + userId, {
      headers: authHeader()
    })
      .then(response => {
        dispatch({
          type: GET_USER_DISPLAY_SUCCESS,
          payload: response.data
        });
      })
      .catch(error => {
        if (error.response) {
          dispatch({
            type: GET_USER_DISPLAY_ERROR,
            payload: error.response.data
          });
        }
      });
  };
}

//Get User Route
export function getUserRoute(paramData) {
  return dispatch => {
    API.get(GET_USER_ROUTE_URL, {
      headers: authHeader(),
      params: paramData
    })
      .then(response => {
        dispatch({
          type: GET_USER_ROUTE_SUCCESS,
          payload: response.data
        });
      })
      .catch(error => {
        if (error.response) {
          dispatch({
            type: GET_USER_ROUTE_ERROR,
            payload: error.response.data
          });
        }
      });
  };
}
