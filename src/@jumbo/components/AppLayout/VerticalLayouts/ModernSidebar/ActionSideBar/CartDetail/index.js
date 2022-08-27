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
  },
  cardRoot: {
    position: 'relative',
    '& .Cmt-card-content': {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  scrollbarRoot: {
    marginRight: 10,
    maxHeight: '75vh',
    overflow: 'hidden',
    paddingBottom: 50,
    // paddingBottom: 50,
    // marginBottom: 100,
    [theme.breakpoints.up('sm')]: {
      maxHeight: '75vh',
      overflow: 'hidden',
      // paddingBottom: 50
    },
  },
  chipRoot: {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    color: theme.palette.primary.main,
    letterSpacing: 0.25,
    fontSize: 14,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    // alignItems: 'center',
    marginBottom: 10,
  },
  sectionHeading: {
    fontSize: 10,
    color: theme.palette.text.secondary,
    marginBottom: 10,
    textTransform: 'uppercase',
    paddingRight: 5,
    paddingLeft: 5,
  },
  sectionTotalHeading: {
    paddingRight: 5,
    paddingLeft: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 14,
    color: theme.palette.text.secondary,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  cartButton: {
    position: 'absolute',
    width: '100%',
    bottom: 50,
    // marginBottom: 50,
    zIndex: 1000,
    color: theme.palette.text.secondary,
    textTransform: 'uppercase',
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      bottom: 80,
    },
  },
}));

const Comments = ({cartAction}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { productsList, filterType }  = useSelector(({productApp}) => productApp);
  const [active, setActive] = useState('success'); 

  // useEffect(() => {
  //   console.log(productsList)
  //   if(productsList.length !== 0){
  //     let obj = {
  //       ...productsList[0],
  //       product: productsList[0],
  //       qty: 1
  //     }

  //      dispatch(handleCartItem(1, obj))
  //   }
  // }, [productsList])



  return (
    <>
      <Box className={classes.rootWrap}>

      {active === 'cart' && <CartItemList/>}
      {active === 'payment' && <ProceedPayment/>}
      {active === 'success' && <SuccessPage/>}
    </Box>
    </>
  );
};

export default Comments;
