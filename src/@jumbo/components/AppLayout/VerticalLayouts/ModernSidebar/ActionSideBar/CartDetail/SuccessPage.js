import React, { useState } from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Paper} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


import moment from 'moment-timezone';


//Components



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










export default function SuccessPage() {
  const classes = useStyles();
  
  
  const [values, ] = useState({
    customers: []
  });
  
  


  


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
              <tr><td>Amount Payable </td><td ><b className={classes.value}>{values.amount_payable}</b></td></tr>
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
