import axios from "axios";
import constant from '../utils/commonData'
import authHeader from "./auth-header";

const getData = () => {
  return axios.get(constant.apiUrl + "/data");
};


export default {
    getData
};