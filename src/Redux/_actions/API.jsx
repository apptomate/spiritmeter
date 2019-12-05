import Axios from "axios";
import { AuthenticationService } from "../_service/AuthenticationService";
const API = Axios.create();
API.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const { status } = error.response;
    if (status === 401) {
      AuthenticationService.logout();
    }
    return Promise.reject(error);
  }
);
export default API;
