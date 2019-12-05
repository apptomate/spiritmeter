import { combineReducers } from "redux";
import { getAllListDisplay } from "./DisplayReducers/GetAllListDisplay";

const RootReducer = combineReducers({
  getAllListDisplay
});

export default RootReducer;
