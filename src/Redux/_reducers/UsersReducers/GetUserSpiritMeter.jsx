import * as types from "../../_actions/ActionTypes";
import { arrayInitial } from "../InitialState";

export function getUserSpiritMeter(state = arrayInitial, action) {
  const { type, payload } = action;
  switch (type) {
    case types.GET_USER_SPIRITMETER_SUCCESS:
      return { data: payload };
    case types.GET_USER_SPIRITMETER_ERROR:
      return { data: payload };
    default:
      return state;
  }
}
