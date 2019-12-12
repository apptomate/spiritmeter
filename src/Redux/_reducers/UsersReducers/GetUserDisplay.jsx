import * as types from "../../_actions/ActionTypes";
import { arrayInitial } from "../InitialState";

export function getUserDisplay(state = arrayInitial, action) {
  const { type, payload } = action;
  switch (type) {
    case types.GET_USER_DISPLAY_SUCCESS:
      return { data: payload };
    case types.GET_USER_DISPLAY_ERROR:
      return { data: payload };
    default:
      return state;
  }
}
