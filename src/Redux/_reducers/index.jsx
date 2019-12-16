import { combineReducers } from "redux";
import { getAllListDisplay } from "./DisplayReducers/GetAllListDisplay";
import { getAllListRoutes } from "./RouteReducers/GetAllListRoutes";
import { getAllListUsers } from "./UsersReducers/GetAllListUsers";
import { getDisplayDetails } from "./DisplayReducers/GetDisplayDetails";
import { authLogin } from "./LoginReducers/AuthLogin";
import { getRouteDetails } from "./RouteReducers/GetRouteDetails";
import { getUserDetails } from "./UsersReducers/GetUserDetails";
import { getUserSpiritMeter } from "./UsersReducers/GetUserSpiritMeter";
import { getUserDisplay } from "./UsersReducers/GetUserDisplay";
import { getUserRoute } from "./UsersReducers/GetUserRoute";
import { uploadFile } from "./FileUploadReducer";
import { addUser } from "./UsersReducers/AddUser";
import { deleteUser } from "./UsersReducers/DeleteUser";

const RootReducer = combineReducers({
  authLogin,
  getAllListDisplay,
  getAllListRoutes,
  getAllListUsers,
  getDisplayDetails,
  getRouteDetails,
  getUserDetails,
  getUserSpiritMeter,
  getUserDisplay,
  getUserRoute,
  uploadFile,
  addUser,
  deleteUser
});

export default RootReducer;
