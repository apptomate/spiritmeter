import * as types from "../../_actions/ActionTypes";
import { arrayInitial } from "../InitialState";

export function getDisplayDetails(state = arrayInitial, action) {
  const { type, payload } = action;
  switch (type) {
    case types.GET_DISPLAY_DETAILS_LOADING:
      return { data: {}, loading: true };
    case types.GET_DISPLAY_DETAILS_SUCCESS:
      return { data: payload, loading: false };
    case types.GET_DISPLAY_DETAILS_ERROR:
      return { data: payload, loading: false };
    default:
      return state;
  }
}
