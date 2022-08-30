import React, { useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Box, Divider, Typography, Button, TextField, IconButton } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

//Components
import CreateCustomer from '../../../../../../../routes/Pages/Customers/CustomerList/CreateCustomer';
import SearchCustomer from './AutoComplete';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCustomer, getCustomersList} from '../../../../../../../redux/actions/Customer';
import { SET_CREATE_CUSTOMER_DIALOG, UPDATE_CART } from 'redux/actions/types';


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
  const { currentCustomer }  = useSelector(({customerApp}) => customerApp);
  const [isChange, setChange] = useState(false);
  const cart = useSelector(({cartApp}) => cartApp);
  const { amount_due, change, payment, notes } = cart
  const { createCustomerDialog } = useSelector(({uiReducer}) => uiReducer);

  const { name, address, limit, balance } = currentCustomer ? currentCustomer : {};
  const handleSelect = (val) => {
    console.log(val)
    if(!val){
      dispatch(setCurrentCustomer(null))
    } else {
      if( val.id){
        dispatch({type: UPDATE_CART, payload: { ...cart, customerId: val.id }})
        dispatch(setCurrentCustomer(val))
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

  return (
    <Box className={classes.rootWrap}>
      <CreateCustomer
        open={createCustomerDialog}
        handleDialog={handleDialog}
      />
        <SearchCustomer
            variant="outlined"
            size="small"
            label="Customer"
            fullWidth
            margin="dense"
            handleSelect={handleSelect}
        />
        <Box maxHeight="100px" p={5} display="flex" alignItems="flex-start" justifyContent="center">
        {currentCustomer && 
        <Box width="100%" display="flex">
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
         <Box width="100%" display="flex" flexDirection="column" alignItems="flex-start" justifyContent="flex-start ">
            <Box mb={1} display="flex">
                <Typography mr={5} style={{fontWeight: 'bolder'}} variant="body2">Limit: </Typography>&nbsp;&nbsp;
                <Typography variant="subtitle2">₱{Number(limit).toFixed(2)}</Typography>
            </Box>
            <Box mb={1} display="flex">
            <Typography mr={5} style={{fontWeight: 'bolder'}} variant="body2">Balance:</Typography>&nbsp;&nbsp;
                 <Typography variant="subtitle2">₱{Number(balance).toFixed(2)}</Typography>
            </Box>
         </Box>
        </Box>}
        </Box>

        <Divider/>
        <Box p={5} width="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
              <Typography m={1}>Total Amount Due</Typography><Typography variant="h2">₱{Number(amount_due).toFixed(2)}</Typography>
          </Box>
          <Box p={5} width="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
              {/* <Typography m={1}>Total Amount Due</Typography><Typography variant="h2">₱{Number(amount_due).toFixed(2)}</Typography> */}
              <Typography m={1}>Payment</Typography>
            <TextField 
              variant='outlined'
              size='small'
              margin='dense'
              label="amount"
              value={payment}
              type="number"
              onChange={handleChanges('payment')}
            />
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
