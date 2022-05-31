import axios from "axios";
import constant from '../utils/commonData'
import authHeader from "./auth-header";


const register = (data) => {
  return axios.post(constant.apiUrl + "/auth/signup", data);
};

const login = ({ username, password }) => {
  return axios
    .post(constant.apiUrl + "/auth/signin", {
      username,
      password,
    })
    .then((response) => {
      console.log(response)
      if (response.data.accessToken) {
        localStorage.setItem("idToken", response.data.accessToken);
      }

      return response.data;
    });
};

const logout = () => {
    localStorage.clear();
};


const getAuthUser = () => {
  return axios.get(constant.apiUrl + "/auth", { headers: authHeader() });
};


export default {
  register,
  login,
  logout,
  getAuthUser,
};