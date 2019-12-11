import Axios from "axios";
import { logout } from "../_service/AuthenticationService";
const API = Axios.create();
API.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const { status } = error.response;
    if (status === 401) {
      logout();
    }
    return Promise.reject(error);
  }
);
export default API;
