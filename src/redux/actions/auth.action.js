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
  
  import AuthService from "../../services/auth.service";
  
  export const register = (data) => (dispatch) => {
    return AuthService.register(data).then(
      (response) => {
        console.log(response.data)
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve();
      },
      (error) => {
        console.log(error.response)
        dispatch({
          type: SET_ERRORS,
          payload: error.response?.data?.errors
        });

        error.response?.data?.message &&
        dispatch({type: SET_MESSAGE, 
          payload: error.response?.data?.message
        })


  
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

        // dispatch(getUserData());
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
        let { account } = res.data;
        console.log(data)
       
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
       localStorage.removeItem("idToken");
       localStorage.clear();
        dispatch({
          type: LOGOUT,
        });
        dispatch({
          type: CLEAR_USER
        });
  };