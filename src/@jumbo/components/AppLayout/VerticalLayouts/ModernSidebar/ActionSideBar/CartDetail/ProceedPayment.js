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
import { payOrder } from 'redux/actions/OrderApp';


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
  const { amount_due, payment, notes, order_no, amount_payable, change } = cart
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
    let valN = val % 1;
    let valD = Number(val);
    console.log(!valD)
    console.log(!valN)
    console.log(!val)
    if(!Number(val) && val) {
      return false; 
    } else {
      console.log(typeof val % 1 != 0 == 'number')
      console.log(val % 1 != 0)
    if(typeof val % 1 != 0 == 'number'){
      return 
    }

    let newChange = Number(val) - (order_no ? Number(amount_payable ? amount_payable : 0) : Number(amount_due));

    if(prop === 'payment'){
      dispatch({type: UPDATE_CART, payload: { ...cart, [prop]: val, change: newChange <= 0 ? 0 : newChange }})
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
    } else {
    dispatch(createOrder(cart))
   .catch(err => {
      console.log(err)
      dispatch(fetchError(err.response.data.message))
    })
  }
  }


  const { name, address } = cartCustomer ? cartCustomer : {};

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
        <Box maxHeight="100px" p={5} display="flex" alignItems="flex-start" justifyContent="center">
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
                <Typography variant="subtitle2">₱{Number(limit).toFixed(2)}</Typography>
            </Box>
            <Box mb={1} display="flex">
            <Typography mr={5} style={{fontWeight: 'bolder'}} variant="body2">amount_payable:</Typography>&nbsp;&nbsp;
                 <Typography variant="subtitle2">₱{Number(amount_payable).toFixed(2)}</Typography>
            </Box>
         </Box> */}
        </Box>}
        </Box>

        <Divider/>
        
        <Box p={3} width="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
              <Typography m={1} variant="subtitle1">Total Amount Due</Typography><Typography variant="h3" style={{fontWeight: 'bold'}}>₱{Number(amount_due).toFixed(2)}</Typography>
          </Box>
        {action === 'unpaid' && <Box p={3} width="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
              <Typography m={1} variant="subtitle1">Amount Payable</Typography><Typography variant="h3" style={{fontWeight: 'bold'}}>₱{Number(amount_payable).toFixed(2)}</Typography>
          </Box>}
          <Box p={5} width="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center" component="form">
              {/* <Typography m={1}>Total Amount Due</Typography><Typography variant="h2">₱{Number(amount_due).toFixed(2)}</Typography> */}
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


               <br/>

               <Box p={3} width="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
              <Typography m={1} variant="subtitle1">Available Change</Typography><Typography variant="h3" style={{fontWeight: 'bold'}}>₱{Number(change).toFixed(2)}</Typography>
          </Box>

        
          <br/>
          <Box width="100%" component="form"  onSubmit={handleCheckout}>

          <TextField fullWidth label="Notes" value={notes}
              onChange={handleChanges('notes')}/>
          </Box>
          </Box>
          </Box>
  )
}
