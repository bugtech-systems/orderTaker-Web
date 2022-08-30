import React from 'react'
import { Box, Hidden, IconButton, Tooltip, Button } from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { CLEAR_CART, SET_ACTIVE_OPTION, SET_DRAWER_OPEN, SET_ACTION, SET_CART_SUCCESS } from '../../../../../../../redux/actions/types';
import { setCurrentCustomer } from '../../../../../../../redux/actions/Customer';
import { createOrder } from 'redux/actions/CartApp';
import { fetchError, fetchSuccess } from 'redux/actions';


const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      width: '100wh',
      
    },
    actionSidebar: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '15px 5px',
      width: '100%',
      borderRight: `1px solid ${theme.palette.divider}`,
    },
    contentArea: {
      width: '100vw',
      // overflow: 'hidden',
      height: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 579,
        // overflow: 'hidden',
        height: '100%'
  
      },
    },
    scrollbarRoot: {
      // height: '100%',
      margin: 15,
      overflow: 'hidden'
    },
    iconBtn: {
      position: 'relative',
      color: alpha(theme.palette.common.dark, 0.38),
      '&:hover, &:focus, &.active': {
        color: theme.palette.primary.main,
        backgroundColor: alpha(theme.palette.primary.main, 0.08),
      },
    },
    counterRoot: {
      color: theme.palette.common.white,
      border: `solid 1px ${theme.palette.common.white}`,
      backgroundColor: theme.palette.warning.main,
      width: 20,
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '5px 15px'
      },
      cartButton: {
        // position: 'absolute',
        width: '100%',
        // bottom: 30,
        // zIndex: 1000,
        color: theme.palette.text.secondary,
        textTransform: 'uppercase',
        display: "flex",
        alignItems: 'center',
        justifyContent: 'space-around',
        [theme.breakpoints.up('sm')]: {
          // bottom: 20,
        },
      },
  }));




export default function CartFooter() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const cart = useSelector(({cartApp}) => cartApp);
    const { cart_items } = cart;
    const { action } = useSelector(({uiReducer}) => uiReducer);


    const handleProceedPayment = () => {
      dispatch({type: SET_ACTION, payload: 'payment'})
  }

  const handleClearCart = () => {
    dispatch({ 
      type: CLEAR_CART
    })
    dispatch(setCurrentCustomer(null));
    // dispatch({ 
    //   type: SET_ACTIVE_OPTION,
    //   payload: null
    // });

    // dispatch({ 
    //   type: SET_DRAWER_OPEN,
    //   payload: false
    // });
  }

  const handleBack = () => {
    dispatch({type: SET_ACTION, payload: 'cart'})
  }

  const handleCheckout = () => {
    dispatch(createOrder(cart))
    .then(res => {
      let { message, data } = res.data;
      console.log(res)
      dispatch(fetchSuccess(message));
      dispatch({type: SET_CART_SUCCESS, payload: data});
    dispatch({type: SET_ACTION, payload: 'success'})
    }).catch(err => {
      console.log(err)
      dispatch(fetchError(err.response.data.message))
    })
  }


 
  console.log(action)

  return (
    <Box height="100%"  p={5} display="flex" alignItems="center" justifyContent="space-around">
      {action === 'cart' && <><Button variant="outlined" onClick={() => handleClearCart()} >Clear</Button> <Button variant="contained" color="primary" onClick={() => handleProceedPayment()} disabled={cart_items.length === 0} >Proceed Payment</Button></>}
      {action === 'payment' && <><Button variant="outlined" onClick={() => handleBack()} >Back</Button> <Button variant="contained" color="primary" onClick={() => handleCheckout()} disabled={cart_items.length === 0} >Checkout</Button></>}
   </Box>
  )
}
