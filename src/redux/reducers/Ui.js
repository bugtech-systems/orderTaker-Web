import {SET_CREATE_CUSTOMER_DIALOG, SET_NOTIFICATIONS} from "../actions/types";

const INIT_STATE = {
    create_customer: false,
    notifications: []
};

export default (state = INIT_STATE, action) => {
  const {type, payload} = action;

  switch (type) {
    case SET_CREATE_CUSTOMER_DIALOG: {
      return {
        ...state,
        create_customer: payload ? payload : !state.create_customer
      };
    }

    case SET_NOTIFICATIONS: {
      return {
        ...state,
        notifications: payload
      };
    }
  
    default:
      return state;
  }
};
