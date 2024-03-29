import { combineReducers } from "redux";
import { getAllListDisplay } from "./DisplayReducers/GetAllListDisplay";
import { getAllListRoutes } from "./RouteReducers/GetAllListRoutes";
import { getAllListUsers } from "./UsersReducers/GetAllListUsers";
import { getDisplayDetails } from "./DisplayReducers/GetDisplayDetails";
import { getRouteDetails } from "./RouteReducers/GetRouteDetails";
import { getUserDetails } from "./UsersReducers/GetUserDetails";
import { getUserSpiritMeter } from "./UsersReducers/GetUserSpiritMeter";
import { getUserDisplay } from "./UsersReducers/GetUserDisplay";
import { getUserRoute } from "./UsersReducers/GetUserRoute";
import { addUser } from "./UsersReducers/AddUser";
import { deleteUser } from "./UsersReducers/DeleteUser";
import { getDashboardData } from "./DashboardReducers/GetDashboardData";

const RootReducer = combineReducers({
  getDashboardData,
  getAllListDisplay,
  getAllListRoutes,
  getAllListUsers,
  getDisplayDetails,
  getRouteDetails,
  getUserDetails,
  getUserSpiritMeter,
  getUserDisplay,
  getUserRoute,
  addUser,
  deleteUser
});

export default RootReducer;
