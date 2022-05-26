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
export const createUser = (data) => async (dispatch) => {
  return await CrudService.createUser(data).then(
    ({ data }) => {
      console.log('Create RESPONSE')
      console.log(data)
      return Promise.resolve(data);
    },
    (error) => {
      console.log('CREATE ERROR')
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

export const getUsers = () => async (dispatch) => {
  return await CrudService.getUsers().then(
    ({ data }) => {
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

export const getUserById = (id) => async (dispatch) => {
  return await CrudService.getUserById(id).then(
    ({ data }) => {
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

export const updateUserById = (id, data) => async (dispatch) => {
  return await CrudService.updateUserById(id, data).then(
    ({ data }) => {
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

export const deleteUserById = (id) => async (dispatch) => {
  return await CrudService.deleteUserById(id).then(
    ({ data }) => {
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
//Customer actions
export const createCustomer = (data) => async (dispatch) => {
  return await CrudService.createCustomer(data).then(
    ({ data }) => {
      console.log('Create RESPONSE')
      console.log(data)
      return Promise.resolve(data);
    },
    (error) => {
      console.log('CREATE ERROR')
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

export const getCustomers = () => async (dispatch) => {
  return await CrudService.getCustomers().then(
    ({ data }) => {
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

export const getCustomerById = (id) => async (dispatch) => {
  return await CrudService.getCustomerById(id).then(
    ({ data }) => {
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

export const updateCustomerById = (id, data) => async (dispatch) => {
  return await CrudService.updateCustomerById(id, data).then(
    ({ data }) => {
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

export const deleteCustomerById = (id) => async (dispatch) => {
  return await CrudService.deleteCustomerById(id).then(
    ({ data }) => {
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


//Purchases actions
export const createPurchases = (data) => async (dispatch) => {
  return await CrudService.createPurchases(data).then(
    ({ data }) => {
      console.log('Create RESPONSE')
      console.log(data)
      return Promise.resolve(data);
    },
    (error) => {
      console.log('CREATE ERROR')
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

export const getPurchases = () => async (dispatch) => {
  return await CrudService.getPurchases().then(
    ({ data }) => {
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

export const getPurchaseById = (id) => async (dispatch) => {
  return await CrudService.getPurchaseById(id).then(
    ({ data }) => {
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

export const updatePurchaseById = (id, data) => async (dispatch) => {
  return await CrudService.updatePurchaseById(id, data).then(
    ({ data }) => {
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

export const deletePurchaseById = (id) => async (dispatch) => {
  return await CrudService.deletePurchaseById(id).then(
    ({ data }) => {
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


//Product Actions
export const createProduct = (data) => async (dispatch) => {
  return await CrudService.createProduct(data).then(
    ({ data }) => {
      console.log('Create RESPONSE')
      console.log(data)
      return Promise.resolve(data);
    },
    (error) => {
      console.log('CREATE ERROR')
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

export const getProducts = () => async (dispatch) => {
  return await CrudService.getProducts().then(
    ({ data }) => {
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

export const getProductById = (id) => async (dispatch) => {
  return await CrudService.getProductById(id).then(
    ({ data }) => {
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

export const updateProductById = (id, data) => async (dispatch) => {
  return await CrudService.updateProductById(id, data).then(
    ({ data }) => {
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

export const deleteProductById = (id) => async (dispatch) => {
  return await CrudService.deleteProductById(id).then(
    ({ data }) => {
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

//Payment actions
export const createPayment = (data) => async (dispatch) => {
  return await CrudService.createPayment(data).then(
    ({ data }) => {
      console.log('Create RESPONSE')
      console.log(data)
      return Promise.resolve(data);
    },
    (error) => {
      console.log('CREATE ERROR')
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

export const getPayments = () => async (dispatch) => {
  return await CrudService.getPayments().then(
    ({ data }) => {
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

export const getPaymentById = (id) => async (dispatch) => {
  return await CrudService.getPaymentById(id).then(
    ({ data }) => {
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

export const updatePaymentById = (id, data) => async (dispatch) => {
  return await CrudService.updatePaymentById(id, data).then(
    ({ data }) => {
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

export const deletePaymentById = (id) => async (dispatch) => {
  return await CrudService.deletePaymentById(id).then(
    ({ data }) => {
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
