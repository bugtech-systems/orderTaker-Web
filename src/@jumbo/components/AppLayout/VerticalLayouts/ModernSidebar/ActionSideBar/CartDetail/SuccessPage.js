import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    // textAlign: 'center',
    color: theme.palette.text.secondary,
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

const rows = [
  createRow('Paperclips (Box)'),
  createRow('Paper (Case)'),
  createRow('Waste Basket'),
];



export default function SuccessPage() {
  const classes = useStyles();


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
              <tr><td >Payment Transaction No. </td><td><b style={{ color: 'black'}}> ALBY0000000001</b></td></tr>
              <tr><td>Transaction Date & Time </td><td><b style={{ color: 'black'}}>July 1, 2022</b></td></tr>
              <tr><td>Invoice No. </td><td ><b style={{ color: 'black'}}> POSTED</b></td></tr>
              <tr><td>Payment Type </td><td ><b style={{ color: 'black'}}> ₱420.230</b></td></tr>
              <tr><td>Payment Method </td><td><b style={{ color: 'black'}}>Cash</b></td></tr>
              <tr><td>Amount Paid </td><td ><b style={{ color: 'black'}}>123123</b></td></tr>
              <tr><td>Notes </td><td ><b>- </b ></td></tr>
              <tr><td>Customer Name </td><td ><b style={{ color: 'black'}}>Lorem epsum sit amit</b></td></tr>
              <tr><td>Customer ID </td><td ><b style={{ color: 'black'}}> 1233131</b></td></tr>
              <tr><td>Reference No. </td><td ><b style={{ color: 'black'}}> Lorem epsum sit amit</b></td></tr>
              <tr><td>Receipt No.</td><td ><b style={{ color: 'black'}}> N010624</b></td></tr>
            </table>
          </Paper>
        </Grid>
      </Grid>
        <div class='linebreak'> 
          <br/>
            {/* <p style={{ textAlign: 'center', fontSize: '10px' }}>You will receive a copy of your reciept in your <br/> registered e-mail address.</p> */}
        </div>
    </>
  );
};
