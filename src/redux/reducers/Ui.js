import {SET_CREATE_CUSTOMER_DIALOG, CLEAR_CART, SET_CART_SUCCESS, SET_NOTIFICATIONS, SET_DRAWER_OPEN, SET_ACTIVE_OPTION, SET_ACTION} from "../actions/types";

const INIT_STATE = {
    createCustomerDialog: false,
    notifications: [],
    action: 'cart',
    activeOption: 'cart',
    isDrawerOpen: true,
    cartSuccess: null
};

export default (state = INIT_STATE, action) => {
  const {type, payload} = action;

  switch (type) {
    case SET_CREATE_CUSTOMER_DIALOG: {
      return {
        ...state,
        createCustomerDialog: payload ? true : false
      };
    }

    case SET_NOTIFICATIONS: {
      return {
        ...state,
        notifications: payload
      };
    }

    case SET_DRAWER_OPEN: {
      return {
        ...state,
        isDrawerOpen: payload
      };
    }

    case CLEAR_CART: {
      return {
        ...state,
        action: 'cart',
        activeOption: 'cart',
        cartSuccess: null
      };
    }

    case SET_CART_SUCCESS: {
      return {
        ...state,
        cartSuccess: payload
      };
    }

    case SET_ACTION: {
      return {
        ...state,
        action: payload
      };
    }

    case SET_ACTIVE_OPTION: {
      return {
        ...state,
        activeOption: payload
      };
    }
  
    default:
      return state;
  }
};
