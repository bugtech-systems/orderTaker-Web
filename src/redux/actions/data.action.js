import {
  SET_ERRORS,
  CLEAR_ERRORS,
  CLEAR_MESSAGE,
  SET_MESSAGE,
  SET_LOADING,
  STOP_LOADING,
  SET_DATA
} from "./types";

import DataService from "../../services/data.service";




export const getData = () => (dispatch) => {

  return DataService.getData().then(
    (response) => {
      console.log(response.data)
      dispatch({
        type: SET_DATA,
        payload: response.data
      });
      dispatch({
        type: STOP_LOADING
      });

      return Promise.resolve();
    },
    (error) => {
      console.log(error.response)
      error.response &&
        error.response.data &&
        error.response.data.message && dispatch({ type: SET_MESSAGE, payload: error.response.data.message })

      dispatch({
        type: STOP_LOADING
      });



      return Promise.reject();
    }
  );
}


