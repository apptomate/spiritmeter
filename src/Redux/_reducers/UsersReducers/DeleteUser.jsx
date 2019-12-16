import * as types from "../../_actions/ActionTypes";
import { arrayInitial } from "../InitialState";

export function deleteUser(state = arrayInitial, action) {
  const { type, payload } = action;
  switch (type) {
    case types.DELETE_USER_SUCCESS:
      return { data: payload };
    case types.DELETE_USER_ERROR:
      return { data: payload };
    default:
      return state;
  }
}
