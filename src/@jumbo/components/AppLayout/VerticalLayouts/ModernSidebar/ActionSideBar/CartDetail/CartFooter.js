import React from 'react'
import { Box,  Button } from '@material-ui/core';


//Redux
import { useSelector, useDispatch } from 'react-redux';
import { CLEAR_CART, SET_DRAWER_OPEN, SET_ACTION, SET_CART_SUCCESS } from '../../../../../../../redux/actions/types';
import { setCurrentCustomer } from '../../../../../../../redux/actions/Customer';
import { createOrder } from 'redux/actions/CartApp';
import { fetchError, fetchSuccess } from 'redux/actions';
import { payOrder } from 'redux/actions/OrderApp';





export default function CartFooter() {
  
    const dispatch = useDispatch();
    const cart = useSelector(({cartApp}) => cartApp);
    const { cart_items } = cart;
    const { action} = useSelector(({uiReducer}) => uiReducer);

    const handlePayment = () => {
      const { id, customerId, payment, notes } = cart;
      dispatch(payOrder({orderId: id, customerId, amount: Number(payment), description: notes}))
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
    }
  
    const handleClose = () => {
      dispatch({type: CLEAR_CART});
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

  return (
    <Box height="100%"  p={5} display="flex" alignItems="center" justifyContent="space-around">
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
