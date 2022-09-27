import {
    SET_ORDERS,
    SET_UNPAID_ORDERS,
    CLEAR_ORDERS
  } from '../actions/types';

  const INIT_STATE = {
        orders: [],
        unpaid_orders: []
  };
  
  export default (state = INIT_STATE, action) => {


 
    switch (action.type) {


      case SET_ORDERS: {
        return {
          ...state,
            orders: action.payload
        };
      }

      case SET_UNPAID_ORDERS: {
        return {
          ...state,
            unpaid_orders: action.payload
        };
      }


      case CLEAR_ORDERS: {
        return {
          ...state,
            orders: [],
            unpaid_orders: []
        };
      }

   
      default:
        return state;
    }
  };
  