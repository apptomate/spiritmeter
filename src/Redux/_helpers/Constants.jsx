import React from "react";
import { Avatar } from "antd";
import DefaultPlace from "../../assets/img/defaultPlace.png";

export const BASE_URL = "https://spiritmeter.azurewebsites.net/api/";

//Login
export const LOGIN_URL = BASE_URL + "Login/Login";

//Display
export const ALL_LIST_DISPLAY_URL = BASE_URL + "Display/listDisplay";
export const GET_DISPLAY_DETAILS_URL = BASE_URL + "Display/selectDisplay";

//Routes
export const ALL_LIST_ROUTES_URL = BASE_URL + "Route/listRoutes";

//Users
export const ALL_LIST_USERS_URL = BASE_URL + "User/listUser";

//Default Avatar
export const defaultAvatar = () => <Avatar icon='user' />;

//Default Place
export const defaultPlace = DefaultPlace;
