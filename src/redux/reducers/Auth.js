import {
  LOGIN,
  SET_USER,
  LOGOUT
} from "../actions/types";
import { SEND_FORGET_PASSWORD_EMAIL, UPDATE_AUTH_USER, UPDATE_LOAD_USER } from '../../@jumbo/constants/ActionTypes';

const token = localStorage.getItem("idToken");


const INIT_STATE = {
  authUser: null,
  loadUser: false,
  send_forget_password_email: false,
  isLoggedIn: token ? true : false,
  user: {},
  token: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_AUTH_USER: {
      return {
        ...state,
        authUser: action.payload,
        loadUser: true,
      };
    }
    case UPDATE_LOAD_USER: {
      return {
        ...state,
        loadUser: action.payload,
      };
    }
    case SEND_FORGET_PASSWORD_EMAIL: {
      return {
        ...state,
        send_forget_password_email: action.payload,
      };
    }

    case LOGIN:
      return {
        isLoggedIn: true
      };

      case SET_USER:
        return {
          ...state,
          isLoggedIn: true
        };   
    case LOGOUT:
      return {
        ...state,
        ...INIT_STATE,
        isLoggedIn: false,
        isVerified: false
      };

    default:
      return state;
  }
};
