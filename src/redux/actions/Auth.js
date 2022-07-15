import axios from 'axios';
import { SEND_FORGET_PASSWORD_EMAIL, UPDATE_AUTH_USER, UPDATE_LOAD_USER, EDIT_USER } from '../../@jumbo/constants/ActionTypes';
import { fetchError, fetchStart, fetchSuccess } from './Common';

import commonData from '../../utils/commonData';


export const setAuthUser = user => {
  return dispatch => {
    dispatch({
      type: UPDATE_AUTH_USER,
      payload: user,
    });
  };
};

export const updateLoadUser = loading => {

  return dispatch => {
    dispatch({
      type: UPDATE_LOAD_USER,
      payload: loading,
    });
  };
};

export const setForgetPassMailSent = status => {
  return dispatch => {
    dispatch({
      type: SEND_FORGET_PASSWORD_EMAIL,
      payload: status,
    });
  };
};

export const loginUser = (user, callbackFun) => {
  console.log('Logiiiggn')
  return dispatch => {
    dispatch(fetchStart());
    axios
      .post(`${commonData.apiUrl}/auth/signin`, user)
      .then(data => {
        console.log(data)
        let { accessToken, email, id, roles } = data.data;
          localStorage.setItem('user', JSON.stringify({email, id, roles}));
          localStorage.setItem('idToken', JSON.stringify(`Bearer ${accessToken}`));
          dispatch(setAuthUser(data.data));
          dispatch(fetchSuccess());
          if (callbackFun) callbackFun(data.data);
      })
      .catch(error => {
        let { message } = error?.response?.data;
        console.log(message)
        dispatch(fetchError(message.text));
        // dispatch(fetchError(`There was something issue in responding server`));
      });
  };
};
