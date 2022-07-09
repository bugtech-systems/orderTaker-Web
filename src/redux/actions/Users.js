import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from 'axios';
import {
  ADD_USER,
  DELETE_BULK_USERS,
  DELETE_USER,
  EDIT_USER,
  GET_USERS,
  SET_USER_DETAILS,
} from '../../@jumbo/constants/ActionTypes';
import { SET_SELECTED_USER } from './types';

import CrudService from '../../services/http-api/crud.service';
import commonData from '../../utils/commonData';

export const getUsers = (filterOptions = [], searchTerm = '', callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get(`${commonData.apiUrl}/users`, { params: { filterOptions, searchTerm } })
      .then(data => {
        console.log(data);
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_USERS, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};

export const setCurrentUser = user => {
  return dispatch => {
    dispatch({ type: SET_USER_DETAILS, payload: user });
    dispatch({ type: SET_SELECTED_USER, payload: user });
  };
};

export const addNewUser = (user, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    console.log(user)
    axios
      .post(`${commonData.apiUrl}/auth/signup`, user)
      .then(data => {
        if (data.status === 200) {
          dispatch(getUsers());
          dispatch(fetchSuccess('New user was added successfully.'));
          console.log(data)
          if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};

export const sentMailToUser = () => {
  return dispatch => {
    dispatch(fetchSuccess('Email has been sent to user successfully'));
  };
};

export const updateUser = (user, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('/users', user)
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess('Selected user was updated successfully.'));
          dispatch({ type: EDIT_USER, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};

export const updateUserStatus = (data, callbackFun) => {
  console.log(data)
  let { status, id } = data;
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get(`${commonData.apiUrl}/users/${status === 'suspended' ? 'suspend' : 'activate'}/${id}`)
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess('User status was updated successfully.'));
          dispatch({ type: EDIT_USER, payload: response.data });
          if (callbackFun) callbackFun(response.data);
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};

export const deleteBulkUsers = (userIds, callbackFun) => {
  console.log(userIds)
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put(`${commonData.apiUrl}/users/delete`, { userIds })
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          dispatch(fetchSuccess('Selected users were deleted successfully.'));
          dispatch({ type: DELETE_BULK_USERS, payload: userIds });
          if (callbackFun) callbackFun();
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};

export const deleteUser = (userId, callbackFun) => {
  return dispatch => {
    console.log(userId)
    dispatch(fetchStart());
    axios
      .put(`${commonData.apiUrl}/users/delete`, { userIds: [userId] })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess('Selected user was deleted successfully.'));
          dispatch({ type: DELETE_USER, payload: userId });
          if (callbackFun) callbackFun();
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};
