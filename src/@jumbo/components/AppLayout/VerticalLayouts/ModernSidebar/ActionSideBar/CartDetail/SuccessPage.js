import React, { useEffect, useState } from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Paper, Box, Button} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_CART, SET_CART_SUCCESS, SET_DRAWER_OPEN } from 'redux/actions/types';
import moment from 'moment-timezone';


//Components
import CartFooter from './CartFooter';
import { getOrderById } from 'redux/actions/OrderApp';

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
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    customers: []
  });
  
  const handleGetOrder = (id) => {
        dispatch(getOrderById(id))
        .then(({data}) => {
          setValues({...values, ...data})
        })
        .catch(err => {
          setValues({
                customers: []
          })
          console.log(err)
        })
  }


  useEffect(() => {
    if(cartSuccess){
      handleGetOrder(cartSuccess);
    } else {
      setValues({
        customers: []
  })
    }
  }, [cartSuccess])


  let customerName = values.customers.length !== 0 ? values.customers[0].name : 'No Customer';
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
            <table className="tablesdata">
              <tbody>
              {/* <tr><td>Reference No. </td><td ><b className={classes.value}>{values.ref_no ? values.ref_no : '-'}</b></td></tr> */}
              <tr><td>Customer Name </td><td ><b className={classes.value}>{customerName}</b></td></tr>
              <tr><td>Order No.</td><td ><b className={classes.value}>{values.order_no}</b></td></tr>
              <tr><td>Order Status </td><td><b className={classes.value}>{values.isPaid ? 'Paid' : values.order_status}</b></td></tr>
              <tr><td>Amount Due </td><td ><b className={classes.value}>{values.amount_due}</b></td></tr>
              <tr><td>Amount Paid </td><td ><b className={classes.value}>{values.amount_paid}</b></td></tr>
            {values.amount_payable && values.amount_payable > 0 && <tr><td>Amount Payable </td><td ><b className={classes.value}>{values.amount_payable}</b></td></tr>}     
              {values.amount_change && values.amount_change > 0 &&  <tr><td>Change </td><td ><b className={classes.value}>{values.amount_change}</b></td></tr>}

              <tr><td>Order Date</td><td className={classes.value}><b >{moment(values.createdAt).tz('Asia/Manila').format('LLLL')}</b></td></tr>
              <tr><td>Notes </td><td ><b className={classes.value}>{values.notes ? values.notes : '-'}</b ></td></tr>
              </tbody>
            </table>
          </Paper>
        </Grid>
      </Grid>
      <br/>
      {/* <CartFooter/> */}
    </>
  );
};
