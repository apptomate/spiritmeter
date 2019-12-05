import * as types from "../../_actions/ActionTypes";
import { arrayInitial } from "../InitialState";

export function getAllListDisplay(state = arrayInitial, action) {
  const { type, payload } = action;
  switch (type) {
    case types.ALL_LIST_DISPLAY_LOADING:
      return { data: payload, loading: true };
    case types.ALL_LIST_DISPLAY_SUCCESS:
      return { data: payload, loading: false };
    case types.ALL_LIST_DISPLAY_ERROR:
      return { data: payload, loading: false };
    default:
      return state;
  }
}
