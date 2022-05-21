import React from 'react'
import {Snackbar, Alert} from '@mui/material';


//Redux
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_MESSAGE } from '../redux/actions/types';


export default function SnackbarAlert() {
    const dispatch = useDispatch();
    const { message } = useSelector(state => state.ui);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        
        dispatch({type: CLEAR_MESSAGE})
      };


  return (
  <Snackbar open={message.text} autoHideDuration={6000} onClose={handleClose}
  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
  >
    <Alert onClose={handleClose} severity={message.type} sx={{ width: '100%' }}>
      {message.text}
    </Alert>
  </Snackbar>
  )
}
