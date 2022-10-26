import axios from 'axios';
import { SEND_FORGET_PASSWORD_EMAIL, UPDATE_AUTH_USER, UPDATE_AUTH_STORE, UPDATE_LOAD_USER, CLEAR_USER } from './types';
import { fetchError, fetchStart, fetchSuccess } from './Common';

import commonData from '../../utils/commonData';
import { authHeader } from '../../services/auth-header';


export const setAuthUser = user => {
  return dispatch => {
    dispatch({
      type: UPDATE_AUTH_USER,
      payload: user,
    });
  };
};

export const setAuthStore = store => {
  return dispatch => {
    dispatch({
      type: UPDATE_AUTH_STORE,
      payload: store,
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
  return dispatch => {
    dispatch(fetchStart());
    const ot = setTimeout(() => {
      dispatch(fetchError('Connection timeout!'));
    }, 30000);

    axios
      .post(`${commonData.apiUrl}/auth/signin`, user)
      .then(data => {
        let { accessToken} = data.data;
          localStorage.setItem('idToken', accessToken);
          dispatch(getUserData());
          clearTimeout(ot);
          if (callbackFun) callbackFun(data.data);
      })
      .catch(error => {
        console.log(error)
        clearTimeout(ot);
        let { message } = error?.response?.data;
        dispatch(fetchError(message.text));
      });
  };
};


export const getUserData = () => { 
  return (dispatch) => {

  axios.get(`${commonData.apiUrl}/auth`, { headers: authHeader() }).then(
    (res) => {
      let { email, id, roles, name, address, dpUrl } = res.data;
      localStorage.setItem('user', JSON.stringify({email, id, roles, name, address, dpUrl}));

      dispatch(setAuthUser(res.data))
      dispatch(fetchSuccess());
    },
    (err) => {
      console.log(err.response)
      dispatch(fetchError('Something went wrong!'));
      dispatch(logout())
    }
  );
};
}

export const getStoreData = () => { 
  return (dispatch) => {

  axios.get(`${commonData.apiUrl}/store`,)
  .then(
    (res) => {
      let { email, id, name, address, phone, title } = res.data;
      localStorage.setItem('store', JSON.stringify({email, id, name, phone, address, title}));

      dispatch(setAuthStore(res.data))
      dispatch(fetchSuccess());
    },
    (err) => {
      console.log(err.response)
      dispatch(fetchError('Something went wrong!'));
      dispatch(logout())
    }
  );
};
}

export const logout = () => {
  return (dispatch) => {
  axios.get(`${commonData.apiUrl}/auth/logout`)
  .then(() => {
    localStorage.removeItem('idToken');
    localStorage.removeItem('user');
    dispatch({
      type: CLEAR_USER
    });
    window.location.href = "/";
  })
  .catch(() => {
    localStorage.removeItem('idToken');
    localStorage.removeItem('user');
    dispatch({
      type: CLEAR_USER
    });
    window.location.href = "/";
  });
  }
};