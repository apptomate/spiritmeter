import * as types from "../../_actions/ActionTypes";
import { arrayInitial } from "../InitialState";

export function getAllListRoutes(state = arrayInitial, action) {
  const { type, payload } = action;
  switch (type) {
    case types.ALL_LIST_ROUTES_LOADING:
      return { data: payload, loading: true };
    case types.ALL_LIST_ROUTES_SUCCESS:
      return { data: payload, loading: false };
    case types.ALL_LIST_ROUTES_ERROR:
      return { data: payload, loading: false };
    default:
      return state;
  }
}
