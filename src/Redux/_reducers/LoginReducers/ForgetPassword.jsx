import * as types from "../../_actions/ActionTypes";
import { arrayInitial } from "../InitialState";

export function forgetPassword(state = arrayInitial, action) {
  const { type, payload } = action;
  switch (type) {
    case types.FORGET_PASSWORD_SUCCESS:
      return { data: payload };
    case types.FORGET_PASSWORD_ERROR:
      return { data: payload };
    default:
      return state;
  }
}
