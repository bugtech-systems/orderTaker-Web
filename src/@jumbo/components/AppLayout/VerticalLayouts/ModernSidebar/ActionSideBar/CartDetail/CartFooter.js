import React, { useEffect} from 'react'
import { Box, Hidden, IconButton, Tooltip, Button } from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { CLEAR_CART, SET_DRAWER_OPEN, UPDATE_CART, SET_ACTION, SET_CART_SUCCESS } from '../../../../../../../redux/actions/types';
import { setCurrentCustomer } from '../../../../../../../redux/actions/Customer';
import { createOrder } from 'redux/actions/CartApp';
import { fetchError, fetchSuccess } from 'redux/actions';
import { payOrder } from 'redux/actions/OrderApp';


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
      cartFooter: {
        position: 'relative',
        top: 0
      }
  }));




export default function CartFooter() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const cart = useSelector(({cartApp}) => cartApp);
    const { cart_items } = cart;
    const { action} = useSelector(({uiReducer}) => uiReducer);

    const handlePayment = () => {
      const { id, customerId, payment, notes, amount_change } = cart;
      dispatch(payOrder({orderId: id, customerId, amount: payment, amount_change, description: notes}))
      .then(res => {
        let { message, data } = res;
        if(res){
          dispatch(fetchSuccess(message));
          dispatch({type: SET_CART_SUCCESS, payload: data.id});
        dispatch({type: SET_ACTION, payload: 'success'})
        }
      }).catch(err => {
        console.log(err)
        dispatch(fetchError(err.response.data.message))
      })
    }

    const handleNewOrder = () => {
      dispatch({type: CLEAR_CART});
      localStorage.removeItem('cart')
    }
  
    const handleClose = () => {
      dispatch({type: CLEAR_CART});
      localStorage.removeItem('cart')
      dispatch({type: SET_DRAWER_OPEN, payload: false});
      dispatch(setCurrentCustomer(null));
    }
  


    const handleProceedPayment = (val) => {
      dispatch({type: SET_ACTION, payload: val})
  }

  const handleSuccess = () => {
      dispatch({type: SET_ACTION, payload: 'paidSuccess'})
      if(cart.id){
        dispatch({type: SET_CART_SUCCESS, payload: cart.id})
      }
}


  const handleClearCart = () => {
    if(cart_items.length !== 0){
      dispatch({ 
        type: CLEAR_CART
      });
      localStorage.removeItem('cart')
      dispatch(setCurrentCustomer(null));
    } else {
      handleClose()
    }

  }

  const handleBack = (val) => {
    dispatch({type: SET_ACTION, payload: val})
  }

  const handleCheckout = () => {
    dispatch(createOrder(cart))
   .catch(err => {
      console.log(err)
      dispatch(fetchError(err.response.data.message))
    })
  }



  return (
    <Box height="100%" className={classes.cartFooter} p={5} display="flex" alignItems="center" justifyContent="space-around">
      {action === 'paidCart' && <><Button variant="outlined" onClick={() => handleClearCart()} >Clear</Button> <Button variant="contained" color="primary" onClick={() => handleSuccess()} disabled={cart_items.length === 0} >Next</Button></>} 
      
      {action === 'cart' &&  <><Button variant="outlined" onClick={() => handleClearCart()} >Clear</Button> <Button variant="contained" color="primary" onClick={() => handleProceedPayment('payment')} disabled={cart_items.length === 0} >Proceed Payment</Button></>}
      
      {action === 'viewCart' &&  <><Button variant="outlined" onClick={() => handleClearCart()} >Clear</Button> <Button variant="contained" color="primary" onClick={() => handleProceedPayment('unpaid')} disabled={cart_items.length === 0} >Proceed Payment</Button></>}

      
      {action === 'paidSuccess' && <><Button variant="outlined" onClick={() => handleBack('paidCart')} >Back</Button> <Button variant="contained" color="primary" onClick={() => handleClearCart()} disabled={cart_items.length === 0} >New Order</Button></>}
      
      {action === 'payment' && <><Button variant="outlined" onClick={() => handleBack('cart')} >Back</Button> <Button variant="contained" color="primary" onClick={() => handleCheckout()} disabled={cart_items.length === 0} >Checkout</Button></>}

      {action === 'unpaid' && <><Button variant="outlined" onClick={() => handleBack('viewCart')} >Back</Button> <Button variant="contained" color="primary" onClick={() => handlePayment()} disabled={cart_items.length === 0} >Pay</Button></>}


      {action === 'success' && <><Button variant="outlined" color="primary" onClick={() => handleNewOrder()} >New Order</Button>
          <Button variant="contained" onClick={() => handleClose()}>Close</Button></>}

   </Box>
  )
}
