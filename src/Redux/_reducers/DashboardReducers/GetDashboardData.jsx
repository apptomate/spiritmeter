import * as types from "../../_actions/ActionTypes";
import { arrayInitial } from "../InitialState";

export function getDashboardData(state = arrayInitial, action) {
  const { type, payload } = action;
  switch (type) {
    case types.GET_DASHBOARD_DATA_LOADING:
      return { data: {}, loading: true };
    case types.GET_DASHBOARD_DATA_SUCCESS:
      return { data: payload, loading: false };
    case types.GET_DASHBOARD_DATA_ERROR:
      return { data: payload, loading: false };
    default:
      return state;
  }
}
