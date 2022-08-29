import {
    UPDATE_CART,
    UPDATE_CART_ITEMS,
    CLEAR_CART,
    SET_CART_ITEMS_COUNT
  } from '../actions/types';

import { cart } from '../../@fake-db'

  const INIT_STATE = {
        cart_items: cart.cartItems,
        other_amounts: [],
        tax_disc: [], 
        sub_total: 0,
        gross_total: 0,
        grand_total: 0,
        amount_due: 0,
        cart_items_count: 0,
        payment: 0,
        change: 0,
        notes: ''
  };
  
  export default (state = INIT_STATE, action) => {


 
    switch (action.type) {


      case UPDATE_CART: {
        return {
          ...state,
          ...action.payload
        };
      }



      case UPDATE_CART_ITEMS: {
        return {
          ...state,
            cart_items: action.payload
        };
      }

      case CLEAR_CART: {
        return {
            // ...state,
        cart_items: [],
        other_amounts: [],
        tax_disc: [], 
        sub_total: 0,
        gross_total: 0,
        grand_total: 0,
        amount_due: 0,
        payment: 0,
        change: 0,
        total_vatable: 0,
        notes: ''
        };
      }

      
      case SET_CART_ITEMS_COUNT: {
        return {
          ...state,
          cart_items_count: action.payload
        };
      }
  
      default:
        return state;
    }
  };
  