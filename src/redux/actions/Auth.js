import { fetchError, fetchStart, fetchSuccess } from '../actions';

import { SEND_FORGET_PASSWORD_EMAIL, UPDATE_AUTH_USER, UPDATE_LOAD_USER } from '../../@jumbo/constants/ActionTypes';
import {
  LOGIN,
  LOGOUT,
  SET_MESSAGE,
  SET_LOADING,
  STOP_LOADING,
  SET_ERRORS,
  SET_USER,
  CLEAR_USER,
} from "./types";

import AuthService from "../../services/http-api/auth.service";


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



export const register = (values) => (dispatch) => {
  return AuthService.register(values).then(
    (response) => {

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      console.log(error.response)
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();


      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const login = (values) => (dispatch) => {
  dispatch({
    type: SET_LOADING
  });

  return AuthService.login(values).then(
    (data) => {
      console.log(data)

      dispatch({type: SET_MESSAGE, 
        payload: { text: 'Login Successfully!', type: 'success'}
      })
      dispatch({
        type: LOGIN
      }); 

      dispatch(getUserData());
      // history.push(`${data && !data.isVerified ? '/admin/unverified' : '/admin'}`)
      return Promise.resolve();
    },
    (error) => {

      console.log(error.response)
      error.response?.data?.errors && 
      dispatch({
        type: SET_ERRORS,
        payload: error.response?.data?.errors
      });

      dispatch({
        type: STOP_LOADING
      });

      error.response?.data?.message &&
      dispatch({type: SET_MESSAGE, 
        payload: error.response?.data?.message
      })


      return Promise.reject();
    }
  );
};

export const getUserData = (history) => (dispatch) => {
  dispatch({
    type: SET_LOADING
  });
  return AuthService.getAuthUser().then(
    (res) => {
      let { data, } = res;
      console.log(data)
      dispatch(setAuthUser(data.user))
      dispatch({
        type: SET_USER,
        payload: data
      });
      
      dispatch({
        type: STOP_LOADING
      });
      return Promise.resolve();
    },
    (error) => {
      console.log(error.response)
      error.response?.data?.errors && 
      dispatch({
        type: SET_ERRORS,
        payload: error.response?.data?.errors
      });
    
      dispatch({
        type: STOP_LOADING
      });

      error.response?.data?.message &&
      dispatch({type: SET_MESSAGE, 
        payload: error.response?.data?.message
      })


      return Promise.reject();
    }
  );
};

export const logout = (history) => (dispatch) => {
     localStorage.clear();
     dispatch(fetchSuccess())
     dispatch(setAuthUser(null));
     dispatch({
        type: LOGOUT,
      });
      dispatch({
        type: CLEAR_USER
      });
};