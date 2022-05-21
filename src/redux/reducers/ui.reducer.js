import { 
  SET_MESSAGE,
  CLEAR_MESSAGE, 
  SET_ERRORS, 
  CLEAR_ERRORS, 
  SET_LOADING, 
  STOP_LOADING,
  CLEAR_USER,
  SET_USERMANAGEMENT_TAB,
  SET_HEADER_TITLE,
  LOGOUT
} from "../actions/types";

const initialState = {
    message: {
      text: "",
      type: ""
    },
    errors: {},
    loading: false,
    headerTitle: 'Dashboard',
    userManagementTab: 0
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
 
    case SET_MESSAGE:
      return { ...state, message: payload };
    case CLEAR_MESSAGE:
      return {  ...state, message: { text: "", type: "" } };
    case SET_ERRORS:
      return { ...state, errors: { ...state.errors, ...payload} };
    case CLEAR_ERRORS:
      return { ... state, errors: {} };
      case SET_LOADING:
        return { ...state, loading: true };
      case STOP_LOADING:
        return { ... state, loading: false };
            case CLEAR_USER:
                return { ...state, ...initialState }; 
                case LOGOUT:
                  return {...state, homeTab: payload};     
                  case SET_USERMANAGEMENT_TAB:
                    return {...state, userManagementTab: payload};
                    case SET_HEADER_TITLE:
                      return {...state, headerTitle: payload};                         

    default:
      return state;
  }
}