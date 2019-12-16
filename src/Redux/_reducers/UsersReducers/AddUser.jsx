import * as types from "../../_actions/ActionTypes";
import { arrayInitial } from "../InitialState";

export function addUser(state = arrayInitial, action) {
  const { type, payload } = action;
  switch (type) {
    case types.ADD_USER_SUCCESS:
      return { data: payload };
    case types.ADD_USER_ERROR:
      return { data: payload };
    default:
      return state;
  }
}
