import React, { useState, useEffect } from 'react';
import { Box, makeStyles } from '@material-ui/core';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { alpha } from '@material-ui/core/styles';
import CmtList from '../../../../../../../@coremat/CmtList';
import CartItem from './CartItem';


import EmptyResult from '../EmptyResult';
// import SearchBox from '../Search/SearchBox';

import CartSummary from './CartSummary';
import CartItemList from './CartItemList';



//Redux
import { useSelector, useDispatch } from 'react-redux';
import "./styles.css";

//Components
import AccordionList from './AccordionList';
import CartFooter from './CartFooter';
import SuccessPage from './SuccessPage';
import ProceedPayment from './ProceedPayment';

const useStyles = makeStyles(theme => ({
  rootWrap: {
    overflowY: 'hidden',
    height: '100%'
  },
}));

const Comments = () => {
  const classes = useStyles();
  const { action } = useSelector(({uiReducer}) => uiReducer); 


console.log(action)
  return (
      <Box className={classes.rootWrap}>
      {action === 'cart' && <CartItemList/>}
      {action === 'payment' && <ProceedPayment/>}
      {action === 'success' && <SuccessPage/>}
    </Box>
  );
};

export default Comments;
