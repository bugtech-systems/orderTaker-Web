//For expanding sidebar
import {
  ADD_LABEL,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  DELETE_LABEL_ITEM,
  GET_PRODUCT_COUNTS,
  GET_PRODUCTS_LIST,
  GET_LABELS_LIST,
  SET_CURRENT_PRODUCT,
  SET_FILTER_TYPE,
  TOGGLE_SIDEBAR_COLLAPSED,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_LABEL,
  UPDATE_LABEL_ITEM,
  UPDATE_STARRED_STATUS,
} from './types';
import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from 'axios';
import commonData from 'utils/commonData';

//For expanding sidebar
export const toggleExpandSidebar = value => {
  return dispatch => {
    dispatch({
      type: TOGGLE_SIDEBAR_COLLAPSED,
      payload: value,
    });
  };
};

//For setting Filtertype
export const setFilterType = filterType => {
  return {
    type: SET_FILTER_TYPE,
    payload: filterType,
  };
};

//for getting labels list
export const getLabelsList = () => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get(`${commonData.apiUrl}/products/labels`)
      .then(data => {
        console.log(data)
          dispatch(fetchSuccess());
          dispatch({ type: GET_LABELS_LIST, payload: data.data });
      })
      .catch(error => {
        dispatch(fetchError('Something went wrong'));
      });
  };
};

//for adding new label
export const addNewLabel = label => {
  console.log(label)
  return dispatch => {
    dispatch(fetchStart());
    axios
      .post(`${commonData.apiUrl}/products/labels`, label)
      .then(({data}) => {
          dispatch(fetchSuccess(data.message));
          dispatch(getLabelsList());
      })
      .catch(error => {
        dispatch(fetchError('Something went wrong'));
      });
  };
};

//For Deleting Label
export const deleteLabel = labelId => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('/product/labels/delete', { labelId })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: DELETE_LABEL_ITEM, payload: labelId });
        } else {
          dispatch(fetchError('Something went wrong'));
        }
      })
      .catch(error => {
        dispatch(fetchError('Something went wrong'));
      });
  };
};

//For Editing Label
export const updateLabel = label => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('/product/labels', { label })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: UPDATE_LABEL_ITEM, payload: label });
        } else {
          dispatch(fetchError('Something went wrong'));
        }
      })
      .catch(error => {
        dispatch(fetchError('Something went wrong'));
      });
  };
};

//for getting products list
export const getProductsList = params => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get(`${commonData.apiUrl}/products`, { params })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_PRODUCTS_LIST, payload: data.data });
        } else {
          dispatch(fetchError('Something went wrong'));
        }
      })
      .catch(error => {
        dispatch(fetchError('Something went wrong'));
      });
  };
};


export const getInventoryList = params => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get(`${commonData.apiUrl}/products`, { params })
      .then(data => {
        console.log(data.data)
          dispatch(fetchSuccess());
          dispatch({ type: GET_PRODUCTS_LIST, payload: data.data });
      })
      .catch(error => {
        console.log(error)
        dispatch(fetchError('Something went wrong'));
      });
  };
};


export const setCurrentProduct = product => {
  return dispatch => {
    dispatch({
      type: SET_CURRENT_PRODUCT,
      payload: product,
    });
  };
};

//for creating new product
export const createProduct = product => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .post('/product', { product })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: CREATE_PRODUCT, payload: data.data });
        } else {
          dispatch(fetchError('Something went wrong'));
        }
      })
      .catch(error => {
        dispatch(fetchError('Something went wrong'));
      });
  };
};

//for updating product through detail page
export const onUpdateProduct = product => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('/product', { product })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: UPDATE_PRODUCT, payload: product });
        } else {
          dispatch(fetchError('Something went wrong'));
        }
      })
      .catch(error => {
        dispatch(fetchError('Something went wrong'));
      });
  };
};

//for updating products starred status(through listing)
export const updateStarredStatus = (productIds, status) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('/product/update-starred', { productIds, status })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({
            type: UPDATE_STARRED_STATUS,
            payload: { productIds, status },
          });
        } else {
          dispatch(fetchError('Something went wrong'));
        }
      })
      .catch(error => {
        dispatch(fetchError('Something went wrong'));
      });
  };
};

//for updating mails folder(through listing)
export const deleteProduct = productIds => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('/product/delete', { productIds })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: DELETE_PRODUCT, payload: productIds });
        } else {
          dispatch(fetchError('Something went wrong'));
        }
      })
      .catch(error => {
        dispatch(fetchError('Something went wrong'));
      });
  };
};

//for updating products label(through listing)
export const updateProductsLabel = (productIds, label) => {
  console.log('Wawa');
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('/product/update-label', { productIds, label })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: UPDATE_PRODUCT_LABEL, payload: data.data });
        } else {
          dispatch(fetchError('Something went wrong'));
        }
      })
      .catch(error => {
        console.log(error);
        dispatch(fetchError('Something went wrong'));
      });
  };
};

//for getting product categories(in sidebar) count
export const getProductCounts = () => {
  return dispatch => {
    axios
      .get('/product/counter')
      .then(data => {
        if (data.status === 200) {
          dispatch({ type: GET_PRODUCT_COUNTS, payload: data.data });
        }
      })
      .catch(error => {
        dispatch(fetchError('Something went wrong'));
      });
  };
};
