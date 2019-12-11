import { combineReducers } from "redux";
import { getAllListDisplay } from "./DisplayReducers/GetAllListDisplay";
import { getAllListRoutes } from "./RouteReducers/GetAllListRoutes";
import { getAllListUsers } from "./UsersReducers/GetAllListUsers";
import { getDisplayDetails } from "./DisplayReducers/GetDisplayDetails";
import { authLogin } from "./LoginReducers/AuthLogin";
import { getRouteDetails } from "./RouteReducers/GetRouteDetails";

const RootReducer = combineReducers({
  authLogin,
  getAllListDisplay,
  getAllListRoutes,
  getAllListUsers,
  getDisplayDetails,
  getRouteDetails
});

export default RootReducer;
