import {
    SET_MESSAGE,
  } from "./types";

import CrudService from "../../services/crud.service";
  

//Roles Actions
export const createRole = (data) => async (dispatch) => {
  return await CrudService.createRole(data).then(
    ({data}) => {
        console.log('Create RESPONSE')
        console.log(data)
      return Promise.resolve(data);
    },
    (error) => {
        console.log('CREAT ERROR')
        console.log(error)
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
    
      return Promise.reject(error);
    }
  );
};

export const getRoles = () => async (dispatch) => {
    return await CrudService.getRoles().then(
      ({data}) => {
          console.log('GET RESPONSE')
          console.log(data)
        return Promise.resolve(data);
      },
      (error) => {
          console.log('GET ERROR')
          console.log(error)
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
      
        return Promise.reject(error);
      }
    );
  };

  export const getRoleById = (id) => async (dispatch) => {
    return await CrudService.getRoleById(id).then(
      ({data}) => {
          console.log('GET RESPONSE')
          console.log(data)
        return Promise.resolve(data);
      },
      (error) => {
          console.log('GET ERROR')
          console.log(error)
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
      
        return Promise.reject(error);
      }
    );
  };

  export const updateRoleById = (id, data) => async (dispatch) => {
    return await CrudService.updateRoleById(id, data).then(
      ({data}) => {
          console.log('Update RESPONSE')
          console.log(data)
        return Promise.resolve(data);
      },
      (error) => {
          console.log('Update ERROR')
          console.log(error)
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
      
        return Promise.reject(error);
      }
    );
  };  

  export const deleteRoleById = (id) => async (dispatch) => {
    return await CrudService.deleteRoleById(id).then(
      ({data}) => {
          console.log('Delete RESPONSE')
          console.log(data)
        return Promise.resolve(data);
      },
      (error) => {
          console.log('Delete ERROR')
          console.log(error)
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
      
        return Promise.reject(error);
      }
    );
  };  



  //Users Actions