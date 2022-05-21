import axios from "axios";
import authHeader from "./auth-header";
import constant from '../utils/commonData'

const getSupporters = () => {
  return axios.get(constant.apiUrl + "/supporters", { headers: authHeader() });
};

const updateSupporter = (id) => {
  return axios.get(constant.apiUrl + `/supporter/${id}`, { headers: authHeader() });
};

const deleteSupporters = (val) => {
  console.log(val)
  return axios.put(constant.apiUrl + `/supporters`, val, { headers: authHeader() });
};

const getSupportersCount = (val) => {
  return axios.get(constant.apiUrl + `/supporters-count`);
};

const submitPost = (data) => {
  return axios.post(constant.apiUrl + `/post`, data, { headers: authHeader() });
};

const updatePost = (data, postId) => {
  return axios.put(constant.apiUrl + `/post/${postId}`, data, { headers: authHeader() });
};

const deletePost = (postId) => {
  return axios.delete(constant.apiUrl + `/post/${postId}`, { headers: authHeader() });
};

const deleteMedia = (id) => {
  return axios.delete(constant.apiUrl + `/media/${id}`, { headers: authHeader() });
};

const getUserPosts = (val) => {
  return axios.get(constant.apiUrl + `/userPosts`, { headers: authHeader() });
};

const sendSms = (val) => {
  return axios.post(constant.apiUrl + `/sms/send`, val, { headers: authHeader() });
};

const resendSms = (id) => {
  return axios.post(constant.apiUrl + `/sms/resend/${id}`, {}, { headers: authHeader() });
};

const getAllSms = (id) => {
  return axios.get(constant.apiUrl + `/sms`, { headers: authHeader() });
};

const getSms = (id) => {
  return axios.get(constant.apiUrl + `/sms/${id}`, { headers: authHeader() });
};

const deleteSms = (id) => {
  return axios.delete(constant.apiUrl + `/sms/delete/${id}`, { headers: authHeader() });
};

const updateSms = (id, val) => {
  return axios.put(constant.apiUrl + `/sms/${id}`, val, { headers: authHeader() });
};


const uploadCsvFile = (val) => {
  return axios.post(constant.apiUrl + `/supporters/upload`, val, { headers: authHeader() });
};

const importCsvFile = (val) => {
  return axios.get(constant.apiUrl + `/supporters/upload`, val, { headers: authHeader() });
};

const getMobtels = (val) => {
  return axios.get(constant.apiUrl + `/mobtels?limit=${val}`, val, { headers: authHeader() });
};

export default {
  updateSupporter,
  deleteSupporters,
  getSupporters,
  getSupportersCount,
  submitPost,
  getUserPosts,
  updatePost,
  deletePost,
  deleteMedia,
  sendSms,
  resendSms,
  getSms,
  deleteSms,
  getAllSms,
  updateSms,
  uploadCsvFile,
  importCsvFile,
  getMobtels
};