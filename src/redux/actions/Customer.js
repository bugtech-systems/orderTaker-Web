//For expanding sidebar
import {
  ADD_LABEL,
  CREATE_CUSTOMER,
  DELETE_CUSTOMER,
  DELETE_LABEL_ITEM,
  GET_CUSTOMER_COUNTS,
  GET_CUSTOMERS_LIST,
  GET_LABELS_LIST,
  SET_CURRENT_CUSTOMER,
  SET_FILTER_TYPE,
  TOGGLE_SIDEBAR_COLLAPSED,
  UPDATE_CUSTOMER,
  UPDATE_CUSTOMER_LABEL,
  UPDATE_LABEL_ITEM,
  UPDATE_STARRED_STATUS
} from "./types";
import {fetchError, fetchStart, fetchSuccess} from "./Common";
import axios from "axios";

//For expanding sidebar
export const toggleExpandSidebar = value => {
  return dispatch => {
    dispatch({
      type: TOGGLE_SIDEBAR_COLLAPSED,
      payload: value
    });
  };
};

//For setting Filtertype
export const setFilterType = filterType => {
  return {
    type: SET_FILTER_TYPE,
    payload: filterType
  };
};

//for getting labels list
export const getLabelsList = () => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get("/customers/labels")
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({type: GET_LABELS_LIST, payload: data.data});
        } else {
          dispatch(fetchError("Something went wrong"));
        }
      })
      .catch(error => {
        dispatch(fetchError("Something went wrong"));
      });
  };
};

//for adding new label
export const addNewLabel = label => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .post("/customers/labels", {label})
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({type: ADD_LABEL, payload: data.data});
        } else {
          dispatch(fetchError("Something went wrong"));
        }
      })
      .catch(error => {
        dispatch(fetchError("Something went wrong"));
      });
  };
};

//For Deleting Label
export const deleteLabel = labelId => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put("/customers/labels/delete", {labelId})
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({type: DELETE_LABEL_ITEM, payload: labelId});
        } else {
          dispatch(fetchError("Something went wrong"));
        }
      })
      .catch(error => {
        dispatch(fetchError("Something went wrong"));
      });
  };
};

//For Editing Label
export const updateLabel = label => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put("/customers/labels", {label})
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({type: UPDATE_LABEL_ITEM, payload: label});
        } else {
          dispatch(fetchError("Something went wrong"));
        }
      })
      .catch(error => {
        dispatch(fetchError("Something went wrong"));
      });
  };
};

//for getting customers list
export const getCustomersList = params => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get("/customers", {params})
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({type: GET_CUSTOMERS_LIST, payload: data.data});
        } else {
          dispatch(fetchError("Something went wrong"));
        }
      })
      .catch(error => {
        dispatch(fetchError("Something went wrong"));
      });
  };
};

export const setCurrentCustomer = customer => {
  return dispatch => {
    dispatch({
      type: SET_CURRENT_CUSTOMER,
      payload: customer
    });
  };
};

//for creating new customer
export const createCustomer = customer => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .post("/customers", {customer})
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({type: CREATE_CUSTOMER, payload: data.data});
        } else {
          dispatch(fetchError("Something went wrong"));
        }
      })
      .catch(error => {
        dispatch(fetchError("Something went wrong"));
      });
  };
};

//for updating customer through detail page
export const onUpdateCustomer = customer => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put("/customers", {customer})
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({type: UPDATE_CUSTOMER, payload: customer});
        } else {
          dispatch(fetchError("Something went wrong"));
        }
      })
      .catch(error => {
        dispatch(fetchError("Something went wrong"));
      });
  };
};

//for updating customers starred status(through listing)
export const updateStarredStatus = (customerIds, status) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put("/customers/update-starred", {customerIds, status})
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({
            type: UPDATE_STARRED_STATUS,
            payload: {customerIds, status}
          });
        } else {
          dispatch(fetchError("Something went wrong"));
        }
      })
      .catch(error => {
        dispatch(fetchError("Something went wrong"));
      });
  };
};

//for updating mails folder(through listing)
export const deleteCustomer = customerIds => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put("/customers/delete", {customerIds})
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({type: DELETE_CUSTOMER, payload: customerIds});
        } else {
          dispatch(fetchError("Something went wrong"));
        }
      })
      .catch(error => {
        dispatch(fetchError("Something went wrong"));
      });
  };
};

//for updating customers label(through listing)
export const updateCustomersLabel = (customerIds, label) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put("/customers/update-label", {customerIds, label})
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({type: UPDATE_CUSTOMER_LABEL, payload: data.data});
        } else {
          dispatch(fetchError("Something went wrong"));
        }
      })
      .catch(error => {
        console.log(error);
        dispatch(fetchError("Something went wrong"));
      });
  };
};

//for getting customer categories(in sidebar) count
export const getCustomerCounts = () => {
  return dispatch => {
    axios
      .get("/customers/counter")
      .then(data => {
        if (data.status === 200) {
          dispatch({type: GET_CUSTOMER_COUNTS, payload: data.data});
        }
      })
      .catch(error => {
        dispatch(fetchError("Something went wrong"));
      });
  };
};
