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
  const [isChange, setChange] = useState(false);
  const cart = useSelector(({cartApp}) => cartApp);
  const { amount_due, change, payment, notes, order_no, amount_payable } = cart
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
    dispatch({type: UPDATE_CART, payload: { ...cart, [prop]: event.target.value }})
  }

  const handleDialog = (val) =>{
      dispatch({type: SET_CREATE_CUSTOMER_DIALOG, payload: val ? val : false})
  }

  useEffect(() => {
    console.log(currentCustomer)
    setCartCustomer(currentCustomer)
  }, [currentCustomer, cart])


  const handlePayment = () => {
   
  }



  const handleCheckout = (e) => {
    e.preventDefault();
    console.log(cart)
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





  const { name, address, limit, balance } = cartCustomer ? cartCustomer : {};
  console.log(cart)
  console.log(currentCustomer)

  console.log(cartCustomer)

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
          <IconButton style={{position: 'absolute', right: 5}} onClick={() => {
            dispatch({type: UPDATE_CART, payload: {...cart, customers: [], customerId: null}});
            dispatch(setCurrentCustomer(null))
          }}>
            <CancelIcon/>
          </IconButton>
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
            <Typography mr={5} style={{fontWeight: 'bolder'}} variant="body2">Balance:</Typography>&nbsp;&nbsp;
                 <Typography variant="subtitle2">₱{Number(balance).toFixed(2)}</Typography>
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
              type="number"
              onChange={handleChanges('payment')}
            />
    </Box>


               <br/>
         

            {!isChange ? 
            <Button variant='outlined' m={1}
            onClick={() => setChange(true)}
            >Add Change</Button>
            
             :
             <>
               <Typography m={1}>Change</Typography>
               <TextField 
              variant='outlined'
              size='small'
              type="number"
              margin='dense'
              label="amount"
              value={change}
              onChange={handleChanges('change')}
              helperText={<Typography onClick={() => setChange(false)} color="secondary" variant="button" style={{fontSize: '10px'}}>Remove</Typography>}
            />
          </>
          }
          <br/>
          <TextField fullWidth label="Notes" value={notes}
              onChange={handleChanges('notes')}/>
          </Box>
          </Box>
  )
}
