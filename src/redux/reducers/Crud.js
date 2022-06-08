import {
  CLEAR_DATA,
  SET_DATA
} from "../actions/types";


const initialState = {
    roles: []
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CLEAR_DATA:
      return { ...state, ...initialState };
      case SET_DATA:
        return { ...state, ...payload };
    default:
      return state;
  }
}