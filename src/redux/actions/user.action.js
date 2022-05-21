import {
    SET_BARANGIES,
    SET_MESSAGE,
    SET_USER_MAP,
    SET_ERRORS,
    CLEAR_ERRORS,
    SET_USER_BASIC,
    SET_NEXT,
    SET_CITYMUN,
    SET_PROVINCE,
    SET_LOADING,
    STOP_LOADING,
    SET_USER_CREDENTIALS,
    CLEAR_USER,
    SET_REGIONS,
    SET_POSTS,
    SET_STEPS,
    SET_OPTIONS,
    CLOSE_FORM
  } from "./types";
  
  import UserService from "../../services/user.service";
  import { getSupportersData } from './admin.action';


  const idToken = localStorage.idToken;

  export const getOptions = () => (dispatch) => {
    dispatch({
      type: SET_LOADING
    });
    return UserService.getOptions().then(
      (response) => {
        dispatch({
            type: SET_OPTIONS,
            payload: response.data
          });
          dispatch({
            type: STOP_LOADING
          });

       
        return Promise.resolve();
      },
      (error) => {
        
          error.response &&
            error.response.data &&
            error.response.data.message && dispatch({type: SET_MESSAGE, payload: error.response.data.message})
  
        dispatch({
          type: STOP_LOADING
        });
        
   
        
        return Promise.reject();
      }
    );
  }


  export const getAllPosts = () => (dispatch) => {
    dispatch({
      type: SET_LOADING
    });
    return UserService.getAllPosts().then(
      (response) => {
        dispatch({
            type: SET_POSTS,
            payload: response.data
          });
          dispatch({
            type: STOP_LOADING
          });

       
        return Promise.resolve();
      },
      (error) => {
        
          error.response &&
            error.response.data &&
            error.response.data.message && dispatch({type: SET_MESSAGE, payload: error.response.data.message})
  
        dispatch({
          type: STOP_LOADING
        });
        
   
        
        return Promise.reject();
      }
    );
  }

  export const uploadFile =  (val, type) => (dispatch) => {
   return UserService.uploadFile(val, type).then(
      (response) => {
        console.log('wewew')
        return response.data
      },
      (error) => {
        console.log(error)
        // const message =
        //   (error.response &&
        //     error.response.data &&
        //     error.response.data.message) ||
        //   error.message ||
        //   error.toString();
  
     
        dispatch({type: SET_MESSAGE, payload: 'Something went wrong!'})
  
        return Promise.reject();
      }
    );

  };



  export const postSupporter = (datas, location) => (dispatch) => {
    dispatch({
      type: SET_LOADING
    });
    dispatch({
      type: CLEAR_ERRORS
    });


    return UserService.createSupport(datas, location).then(
      (response) => {
        dispatch({type: SET_NEXT})
        response &&
        response.data &&
        response.data.message && dispatch({type: SET_MESSAGE, payload: response.data.message})
        localStorage.removeItem('form');
        dispatch(getSupportersData());
        dispatch({type: STOP_LOADING});
        if(idToken){
          dispatch({type: CLEAR_USER}) && dispatch({type: CLOSE_FORM}); 
         }
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


  export const validateSupporter = (datas, location) => (dispatch) => {
    dispatch({
      type: SET_LOADING
    });
    dispatch({
      type: CLEAR_ERRORS
    });


    return UserService.validateSupport(datas, location).then(
      (response) => {
        dispatch({type: SET_NEXT})
        response &&
        response.data &&
        response.data.message && dispatch({type: SET_MESSAGE, payload: response.data.message})
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




  export const postLeader = (data, location) => (dispatch) => {
    dispatch({
      type: SET_LOADING
    });
    dispatch({
      type: CLEAR_ERRORS
    });
    return UserService.createLeader(data, location).then(
      (response) => {
        
        dispatch({type: SET_MESSAGE, payload: { text: 'Success, Wait to be verified to login!', type: 'success'}})
        dispatch({type: SET_NEXT})
        dispatch({
          type: STOP_LOADING
        });
        return Promise.resolve();
      },
      (error) => {
        
        dispatch({
          type: SET_ERRORS,
          payload: error.response && error.response.data && error.response.data.errors
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

  
  export const postPinToMap = (data, id) => (dispatch) => {
    dispatch({
      type: SET_LOADING
    });
 
    dispatch({
      type: CLEAR_ERRORS
    });
    return UserService.pinToMap(data, id).then(
      (response) => {
        // let { data } = response;
        // dispatch({type: SET_USER_MAP, payload: data})
        // dispatch({type: SET_NEXT})
        // dispatch({
        //   type: STOP_LOADING
        // });
        return Promise.resolve();
      },
      (error) => {
        dispatch({
          type: SET_ERRORS,
          payload: error.response?.data
        });

        dispatch({
          type: STOP_LOADING
        });
        dispatch({type: SET_MESSAGE, payload: { text: 'Something went wrong!', type: 'error'}})



        return Promise.reject();
      }
    );
  };


  export const updateAddress = (data) => (dispatch) => {
    dispatch({
      type: SET_LOADING
    });
 
    dispatch({
      type: CLEAR_ERRORS
    });
    return UserService.updateAddress(data).then(
      (response) => {
        let { data } = response;
        dispatch({type: SET_USER_MAP, payload: data})
        dispatch({
          type: STOP_LOADING
        });
        return Promise.resolve();
      },
      (error) => {
        dispatch({
          type: SET_ERRORS,
          payload: error.response?.data
        });

        dispatch({
          type: STOP_LOADING
        });
        dispatch({type: SET_MESSAGE, payload: 'Something went wrong!'})

        return Promise.reject();
      }
    );
  };

  export const searchCoordinates = (loc) => (dispatch) => {

    dispatch({
      type: SET_LOADING
    });

      let { lat, lng } = loc
    return UserService.searchCoordinates(loc).then(
      (response) => {
        let { address } = response.data;
        dispatch({
          type: SET_USER_MAP,
          payload: { lat, lng, address },
        });
        
    dispatch({
      type: STOP_LOADING
    });
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
                    
    dispatch({
      type: STOP_LOADING
    });
    dispatch({type: SET_MESSAGE, payload: 'Something went wrong!'})
        return Promise.reject();
      }
    );
  };
  

  export const getBarangies = (val) => (dispatch) => {
    dispatch({
      type: SET_LOADING
    });
    return UserService.getBarangies(val).then(
      (response) => {
     
        dispatch({
            type: SET_BARANGIES,
            payload: response.data
          });
          dispatch({
            type: STOP_LOADING
          });
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: STOP_LOADING
        });
        dispatch({type: SET_MESSAGE, payload: 'Something went wrong!'})
  
        return Promise.reject();
      }
    );

  };

  export const getCityMun = (val) => (dispatch) => {
    dispatch({
      type: SET_LOADING
    });
    return UserService.getCityMun(val).then(
      (response) => {
     
        dispatch({
            type: SET_CITYMUN,
            payload: response.data
          });
          dispatch({
            type: STOP_LOADING
          });
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch({
          type: STOP_LOADING
        });
        dispatch({type: SET_MESSAGE, payload: 'Something went wrong!'})
  
        return Promise.reject();
      }
    );
    
  };

  export const getProvince = (val) => (dispatch) => {
    dispatch({
      type: SET_LOADING
    });


    return UserService.getProvince(val).then(
      (response) => {


        dispatch({
            type: SET_PROVINCE,
            payload: response.data
          });
          dispatch({
            type: STOP_LOADING
          });
        return Promise.resolve();
      },
      (error) => {
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
        

        dispatch({
          type: STOP_LOADING
        });
        dispatch({type: SET_MESSAGE, payload: { text: 'Something went wrong!', type: 'error'}})


        return Promise.reject();
      }
    );
    
  };

  export const getRegions = () => (dispatch) => {
    dispatch({
      type: SET_LOADING
    });
    return UserService.getRegions().then(
      (response) => {
        dispatch({
            type: SET_REGIONS,
            payload: response.data
          });
          dispatch({
            type: STOP_LOADING
          });
        return Promise.resolve();
      },
      (error) => {
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
        

        dispatch({
          type: STOP_LOADING
        });
        dispatch({type: SET_MESSAGE, payload: { text: 'Something went wrong!', type: 'error'}})


        return Promise.reject();
      }
    );
    
  };