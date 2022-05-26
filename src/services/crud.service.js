import axios from "axios";
import constant from '../utils/commonData'
import authHeader from "./auth-header";





//Roles
const createRole = (data) => {
  return axios.post(constant.apiUrl + "/roles", data);
};

const getRoles = () => {
    return axios.get(constant.apiUrl + "/roles");
};

const getRoleById = (id) => {
    return axios.get(constant.apiUrl + `/role/${id}`);
};


const updateRoleById = (id, data) => {
    return axios.patch(constant.apiUrl + `/role/${id}`, data);
};

const deleteRoleById = (id) => {
    return axios.delete(constant.apiUrl + `/role/${id}`);
};


//Users



export default {
    //Roles
    createRole,
    getRoles,
    getRoleById,
    updateRoleById,
    deleteRoleById,

    //Users
};