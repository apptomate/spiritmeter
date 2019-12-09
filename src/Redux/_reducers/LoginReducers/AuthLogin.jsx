import * as types from "../../_actions/ActionTypes";
import { arrayInitial } from "../InitialState";

export function authLogin(state = arrayInitial, action) {
  const { type, payload } = action;
  switch (type) {
    case types.AUTHLOGIN_SUCCESS:
      return { data: payload };
    case types.AUTHLOGIN_ERROR:
      return { data: payload };
    default:
      return state;
  }
}
