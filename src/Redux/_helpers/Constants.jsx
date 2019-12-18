// App Base URL
export const BASE_URL = "https://spiritmeter.azurewebsites.net/api/";

//Login
export const AUTHLOGIN_URL = BASE_URL + "Login/Login";
//Generate OTP
export const GENERATE_OTP_URL = BASE_URL + "User/generateOTP";
//Forget Password
export const FORGET_PASSWORD_URL = BASE_URL + "User/forgetPassword";

//Display
export const ALL_LIST_DISPLAY_URL = BASE_URL + "Display/listDisplay";
export const GET_DISPLAY_DETAILS_URL = BASE_URL + "Display/selectDisplay";

//Routes
export const ALL_LIST_ROUTES_URL = BASE_URL + "Route/listRoutes";
export const GET_ROUTE_DETAILS_URL = BASE_URL + "Route/selectRouteById";

//Users
export const ALL_LIST_USERS_URL = BASE_URL + "User/listUser";
export const GET_USER_DETAILS_URL = BASE_URL + "User/selectUserById";
export const GET_USER_SPIRITMETER_URL = BASE_URL + "User/spiritMeter";
export const GET_USER_DISPLAY_URL = BASE_URL + "Display/listDisplayByUserId";
export const GET_USER_ROUTE_URL = BASE_URL + "Route/listRoutesByUserId";
export const ADD_USER_URL = BASE_URL + "User/createUser";
export const UPDATE_USER_URL = BASE_URL + "User/updateUser";
export const DELETE_USER_URL = BASE_URL + "User/deleteUser";

//Common
//File Upload
export const FILE_UPLOAD_URL = BASE_URL + "UploadFile/UploadFileBase64";
export const GOOGLE_MAPS_API_KEY = "AIzaSyCSTfXlm6bBFV5-o5RawVMKvhOd4foWnw4";

export const CORS_BY_PASS_URL = "https://corsbypass-app.herokuapp.com/";
