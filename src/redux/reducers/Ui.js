import {SET_CREATE_CUSTOMER_DIALOG, SET_NOTIFICATIONS, SET_DRAWER_OPEN, SET_ACTIVE_OPTION, SET_ACTION} from "../actions/types";

const INIT_STATE = {
    createCustomerDialog: false,
    notifications: [],
    action: 'payment',
    activeOption: 'cart',
    isDrawerOpen: true
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
