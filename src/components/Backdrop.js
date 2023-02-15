import * as React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector } from 'react-redux';

export default function SimpleBackdrop() {
    const { loading } = useSelector(({ uiReducer }) => uiReducer);

 

  return (
    <div 
      style={{zIndex: 10000000}}
    >
      <Backdrop
        sx={{ color: '#fff', zIndex: 10000 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
