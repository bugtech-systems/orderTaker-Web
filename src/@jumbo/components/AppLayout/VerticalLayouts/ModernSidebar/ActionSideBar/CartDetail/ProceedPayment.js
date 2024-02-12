import React, { useState, useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Box, Divider, Typography, Button, TextField, IconButton } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

//Components
import CreateCustomer from '../../../../../../../routes/Pages/Customers/CustomerList/CreateCustomer';
import SearchCustomer from './AutoComplete';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCustomer, getCustomersList} from '../../../../../../../redux/actions/Customer';
import { SET_ACTION, SET_CART_SUCCESS, SET_CREATE_CUSTOMER_DIALOG, UPDATE_CART } from 'redux/actions/types';
import { createOrder } from 'redux/actions/CartApp';
import { fetchError, fetchSuccess } from 'redux/actions';
import { getCartOrderById, payOrder } from 'redux/actions/OrderApp';
import { formatDec } from "../../../../../../../utils/helpers";


const useStyles = makeStyles(theme => ({
  rootWrap: {
    height: "100%",
    // overflowY: 'auto',
    // width: '100%',
    flexGrow: 1
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'flex-start'
  }
}));

export default function ProceedPayment() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { currentCustomer, customersList }  = useSelector(({customerApp}) => customerApp);
  const cart = useSelector(({cartApp}) => cartApp);
  const { amount_due, payment, notes, order_no, amount_payable, amount_change } = cart
  const { createCustomerDialog, action } = useSelector(({uiReducer}) => uiReducer);
  const [cartCustomer, setCartCustomer] = useState({});




  const handleSelect = (val) => {
    if(!val){
      dispatch(setCurrentCustomer(null))
      dispatch({type: UPDATE_CART, payload: { ...cart, customerId: null }})

    } else {
      if( val.id){

    let  customer = customersList.find(a => a.id === val.id)


        dispatch(setCurrentCustomer(customer ? customer : null))
        dispatch({type: UPDATE_CART, payload: { ...cart, customerId: val.id }})
      }
    }
    // dispatch(setCurrentCustomer(val))
    
     
  }
  const handleChanges = prop => event =>{
    let val = event.target.value

    if(!formatDec(val) && val) {
      return false; 
    } else {
    if(typeof val % 1 != 0 == 'number'){
      return 
    }

    let newChange = formatDec(val) - (order_no ? formatDec(amount_payable ? amount_payable : 0) : formatDec(amount_due));

    if(prop === 'payment'){
      dispatch({type: UPDATE_CART, payload: { ...cart, [prop]: val, amount_change: newChange <= 0 ? 0 : newChange }})
    } else {
      dispatch({type: UPDATE_CART, payload: { ...cart, [prop]: val }})
    }
  }
  }

  const handleDialog = (val) =>{
      dispatch({type: SET_CREATE_CUSTOMER_DIALOG, payload: val ? val : false})
  }

  useEffect(() => {
    setCartCustomer(currentCustomer)
  }, [currentCustomer, cart])




  const handleCheckout = (e) => {
    e.preventDefault();
    if(action === 'unpaid'){
      const { id, customerId, payment, notes } = cart;
      dispatch(payOrder({orderId: id, customerId, amount: formatDec(payment), description: notes}))
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
    } else {
    dispatch(createOrder(cart))
   .catch(err => {
      console.log(err)
      dispatch(fetchError(err.response.data.message))
    })
  }
  }


  const { name, address } = cartCustomer ? cartCustomer : {};
  console.log(cart)
  return (
    <Box className={classes.rootWrap}>
      <CreateCustomer
        open={createCustomerDialog}
        handleDialog={handleDialog}
      />
       {action === 'payment' && <SearchCustomer
            variant="outlined"
            size="small"
            label="Customer"
            fullWidth
            margin="dense"
            handleSelect={handleSelect}
        />}
        <Box maxHeight="100px" p={2} display="flex" alignItems="flex-start" justifyContent="center">
        {cartCustomer && cartCustomer.id &&
        <Box width="100%" display="flex">
          {!cart.order_no && 
            <CancelIcon
            style={{position: 'absolute', right: 5}}
            color="secondary"
            onClick={() => {
              dispatch({type: UPDATE_CART, payload: {...cart, customers: [], customerId: null}});
              dispatch(setCurrentCustomer(null))
            }}
            />
            }

            <Box width="100%" display="flex" flexDirection="column" alignItems="flex-start" justifyContent="flex-start ">
            <Box mb={1} display="flex">
                <Typography mr={5} style={{fontWeight: 'bolder'}} variant="body2">Name: </Typography>&nbsp;&nbsp;
                <Typography variant="subtitle2">{name}</Typography>
            </Box>
            <Box mb={1} display="flex">
            <Typography mr={5} style={{fontWeight: 'bolder'}} variant="body2">Address:</Typography>&nbsp;&nbsp;
                 <Typography variant="subtitle2">{address}</Typography>
            </Box> 
         </Box> 
         {/* <Box width="100%" display="flex" flexDirection="column" alignItems="flex-start" justifyContent="flex-start ">
            <Box mb={1} display="flex">
                <Typography mr={5} style={{fontWeight: 'bolder'}} variant="body2">Limit: </Typography>&nbsp;&nbsp;
                <Typography variant="subtitle2">₱{formatDec(limit).toFixed(2)}</Typography>
            </Box>
            <Box mb={1} display="flex">
            <Typography mr={5} style={{fontWeight: 'bolder'}} variant="body2">amount_payable:</Typography>&nbsp;&nbsp;
                 <Typography variant="subtitle2">₱{formatDec(amount_payable).toFixed(2)}</Typography>
            </Box>
         </Box> */}
        </Box>}
        </Box>

        <Divider/>
        
        <Box p={1} width="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
              <Typography m={0.5} variant="subtitle1">Total Amount Due</Typography><Typography variant="h3" style={{fontWeight: 'bold'}}>₱{formatDec(amount_due).toFixed(2)}</Typography>
          </Box>
        {action === 'unpaid' && <Box p={1} width="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
              <Typography m={0.5} variant="subtitle1">Amount Payable</Typography><Typography variant="h3" style={{fontWeight: 'bold'}}>₱{formatDec(amount_payable).toFixed(2)}</Typography>
          </Box>}
          <Box  width="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center" component="form">
              {/* <Typography m={1}>Total Amount Due</Typography><Typography variant="h2">₱{formatDec(amount_due).toFixed(2)}</Typography> */}
              {/* <Typography m={1}>Payment</Typography> */}
              <Box component="form"  onSubmit={handleCheckout}>

            <TextField 
              variant='outlined'
              size='small'
              margin='dense'
              label="Amount Paid"
              value={payment}
              step="0.01"
              onChange={handleChanges('payment')}
            />
    </Box>

               <Box width="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
              <Typography m={0} variant="subtitle1">Available Change</Typography><Typography variant="h3" style={{fontWeight: 'bold'}}>₱{formatDec(amount_change).toFixed(2)}</Typography>
          </Box>
          <Box
          pr={3} pl={3}
          width="100%" component="form"  onSubmit={handleCheckout}>
          <TextField 
             margin='dense'
          fullWidth label="Notes" 
          size='small'
          value={notes}
              onChange={handleChanges('notes')}/>
          </Box>
          </Box>
          </Box>
  )
}
