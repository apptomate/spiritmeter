import * as types from "../../_actions/ActionTypes";
import { arrayInitial } from "../InitialState";

export function uploadFile(state = arrayInitial, action) {
  const { type, payload } = action;
  switch (type) {
    case types.FILE_UPLOAD_SUCCESS:
      return { data: payload };
    case types.FILE_UPLOAD_ERROR:
      return { data: payload };
    default:
      return state;
  }
}
