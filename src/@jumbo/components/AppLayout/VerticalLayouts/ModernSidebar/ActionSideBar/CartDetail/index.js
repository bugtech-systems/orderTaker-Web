import React, { useEffect } from 'react';
import { Box, makeStyles } from '@material-ui/core';








// import SearchBox from '../Search/SearchBox';


import CartItemList from './CartItemList';



//Redux
import { useSelector, useDispatch } from 'react-redux';
import { handleCart } from '../../../../../../../redux/actions/CartApp';

import "./styles.css";

//Components

import CartFooter from './CartFooter';
import SuccessPage from './SuccessPage';
import ProceedPayment from './ProceedPayment';

const useStyles = makeStyles(theme => ({
  rootWrap: {
    // overflowY: 'hidden',
    margin: '10px',
    height: '100%'
  },
}));

const Comments = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { action } = useSelector(({uiReducer}) => uiReducer); 
  const cart = useSelector(({cartApp}) => cartApp); 



  useEffect(() => {
    dispatch(handleCart(cart))
  }, [dispatch,cart])

  return (
      <Box height="100%" className={classes.rootWrap}>
      {(action === 'cart' || action === 'paidCart' || action === 'viewCart') && <CartItemList/>}
      {(action === 'payment' || action === 'unpaid') && <ProceedPayment/>}
      {(action === 'success' || action === 'paidSuccess') && <SuccessPage/>}
      <CartFooter/>
    </Box>
  );
};

export default Comments;
