import {
    LOGIN,
    SET_USER,
    LOGOUT
  } from "../actions/types";
  
  const token = localStorage.getItem("idToken");
  
  const initialState = {
    isLoggedIn: token ? true : false,
    user: {},
    token: token ? token : ''
  }
    
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
    
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
          ...initialState,
          isLoggedIn: false,
          isVerified: false
        };


      default:
        return state;
    }
  }