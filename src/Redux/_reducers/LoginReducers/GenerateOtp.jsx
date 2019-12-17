import * as types from "../../_actions/ActionTypes";
import { arrayInitial } from "../InitialState";

export function generateOtp(state = arrayInitial, action) {
  const { type, payload } = action;
  switch (type) {
    case types.GENERATE_OTP_SUCCESS:
      return { data: payload };
    case types.GENERATE_OTP_ERROR:
      return { data: payload };
    default:
      return state;
  }
}
