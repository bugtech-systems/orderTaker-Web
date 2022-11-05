import { SET_ORDERS, SET_UNPAID_ORDERS, CLEAR_ORDERS, UPDATE_CART } from './types';
import { fetchError, fetchStart, fetchSuccess } from './Common';
import { authHeader } from '../../services/auth-header';

import commonData from '../../utils/commonData';
import axios from 'axios';

import { getAdminDashboard } from './Dashboard';
import { getProductsList } from './ProductApp';

export const getOrders = () => {
    return dispatch => {
        dispatch(fetchStart());
        dispatch({type: CLEAR_ORDERS});
        return axios
          .get(`${commonData.apiUrl}/orders`, { headers: authHeader() })
          .then(({data}) => {
            dispatch({type: SET_ORDERS, payload: data.orders})
            dispatch({type: SET_UNPAID_ORDERS, payload: data.unpaid_orders})
            // return data
          }).catch(err => {
            console.log(err)
            // return null;
          });
    };
  };

  export const getCartOrderById = (id) => dispatch => {
    return axios
      .get(`${commonData.apiUrl}/orders/${id}`, { headers: authHeader() })
      .then(({data}) => {
        dispatch({type: UPDATE_CART, payload: data})
      })
      .catch(err => {
        console.log(err)
        throw err;
      });
};

  export const getOrderById = (id) => dispatch => {
        return axios
          .get(`${commonData.apiUrl}/orders/${id}`, { headers: authHeader() })
          .catch(err => {
            console.log(err)
            throw err;
          });
    };



  export const payOrder = (data) => dispatch => {
      dispatch(fetchStart());
      return axios
        .post(`${commonData.apiUrl}/payments`, data, { headers: authHeader() })
        .then(({data}) => {
          dispatch(getOrders());
          dispatch(getAdminDashboard())
          dispatch(getProductsList());
          return data
        })
        .catch(err => {
          console.log(err)
          throw err;
        });
  };


  export const generateNumber = () => {
        return axios
          .get(`${commonData.apiUrl}/generateNumber`, { headers: authHeader() })
          .then(({data}) => {
            return data
          }).catch(err => {
            console.log(err)
            return null;
          });
    };
