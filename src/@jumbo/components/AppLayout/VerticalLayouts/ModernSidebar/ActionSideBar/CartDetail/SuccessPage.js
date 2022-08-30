import React, { useEffect } from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Paper, Box, Button} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_CART, SET_DRAWER_OPEN } from 'redux/actions/types';
import moment from 'moment-timezone';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    // textAlign: 'center',
    // color: theme.palette.text.secondary,
    justifyContent: 'space-around',
    display: 'flex',
    flexDirection: 'column-reverse',
    fontSize: '17px',
  },
  tablesdata: {
    padding: '10px 0 3em 2em',
    fontSize: '10px',
},
  data: {
    color: 'black',
  },
  title: {
    color: theme.palette.text,
  },
  value: {
    color: theme.palette.text.primary,
  },
}));


function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, price) {
  return qty * price;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, price };
}



export default function SuccessPage() {
  const classes = useStyles();
  const { cartSuccess } = useSelector(({uiReducer}) => uiReducer);
  const { amount_due, amount_paid, amount_payable, order_no, ref_no, customers, isPaid, createdAt, notes, order_status } = cartSuccess;
  const customerName = customers.length !== 0 ? customers[0].name : 'No Customer';
  const dispatch = useDispatch();
  console.log(cartSuccess);
  
  const handleNewOrder = () => {
    dispatch({type: CLEAR_CART});
  }

  const handleClose = () => {
    dispatch({type: CLEAR_CART});
    dispatch({type: SET_DRAWER_OPEN, payload: false});
  }



  useEffect(() => {
    return () => {
      dispatch({type: CLEAR_CART});
    }
  }, [])

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#36ce59', color: 'white'}}>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '18px'}}>
          <CheckCircleIcon style={{ height: '30px', padding: '5px 5px 5px 0' }} />
            Order Successful!
        </div>
      </div>
      <Grid container item xs={12}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <table class="tablesdata">
              <tr><td>Reference No. </td><td ><b className={classes.value}>{ref_no ? ref_no : '-'}</b></td></tr>
              <tr><td>Customer Name </td><td ><b className={classes.value}>{customerName}</b></td></tr>
              <tr><td>Order No.</td><td ><b className={classes.value}>{order_no}</b></td></tr>
              <tr><td>Order Status </td><td><b className={classes.value}>{isPaid ? 'Paid' : order_status}</b></td></tr>
              <tr><td>Amount Due </td><td ><b className={classes.value}>{amount_due}</b></td></tr>
              <tr><td>Amount Paid </td><td ><b className={classes.value}>{amount_paid}</b></td></tr>
              <tr><td>Amount Payable </td><td ><b className={classes.value}>{amount_payable}</b></td></tr>
              <tr><td>Order Date</td><td className={classes.value}><b >{moment(createdAt).tz('Asia/Manila').format('LLLL')}</b></td></tr>
              <tr><td>Notes </td><td ><b className={classes.value}>{notes ? notes : '-'}</b ></td></tr>
            </table>
          </Paper>
        </Grid>
      </Grid>
      <br/>
        <Box display="flex" alignItems="center" justifyContent="space-around">
          <Button variant="outlined" color="primary" onClick={() => handleNewOrder()} >New Order</Button>
          <Button variant="contained" onClick={() => handleClose()}>Close</Button>
        </Box>
    </>
  );
};
