import { SET_ORDERS, SET_UNPAID_ORDERS, CLEAR_ORDERS } from './types';
import { fetchError, fetchStart, fetchSuccess } from './Common';
import { authHeader } from '../../services/auth-header';

import commonData from '../../utils/commonData';
import axios from 'axios';


export const getOrders = () => {
    return dispatch => {
        dispatch(fetchStart());
        dispatch({type: CLEAR_ORDERS});
        return axios
          .get(`${commonData.apiUrl}/orders`, { headers: authHeader() })
          .then(({data}) => {
            console.log(data)
            dispatch({type: SET_ORDERS, payload: data.orders})
            dispatch({type: SET_UNPAID_ORDERS, payload: data.unpaid_orders})
            // return data
          }).catch(err => {
            console.log(err)
            // return null;
          });
    };
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
