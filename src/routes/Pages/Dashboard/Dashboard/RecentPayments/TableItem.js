import React, { useState } from 'react';
import clsx from 'clsx';

import { TableRow, TableCell, Box, Button, Collapse, Typography } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { ArrowUpward } from '@material-ui/icons';

import CmtObjectSummary from '../../../../../@coremat/CmtObjectSummary';
import { timeFromNow } from '../../../../../@jumbo/utils/dateHelper';
import CmtAvatar from '../../../../../@coremat/CmtAvatar';
import { isNull } from 'lodash';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SET_ACTION, SET_ACTIVE_OPTION, SET_DRAWER_OPEN, UPDATE_CART } from 'redux/actions/types';
import { setCurrentCustomer } from 'redux/actions/Customer';

const useStyles = makeStyles(theme => ({
  tableRowRoot: {
    position: 'relative',
    transition: 'all .2s',
    borderTop: `solid 1px ${theme.palette.borderColor.main}`,
    '&:hover, &.active': {
      backgroundColor: alpha(theme.palette.primary.main, 0.08),
      '& $tableCellRoot, & $titleRoot': {
        color: theme.palette.text.primary,
      },
      '& $showContent': {
        width: 0,
      },
      '& $hideContent': {
        transform: 'translateX(0)',
        width: '100%',
      },
    },
    '&:last-child': {
      borderBottom: `solid 1px ${theme.palette.borderColor.main}`,
    },
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: `0 3px 10px 0 ${alpha(theme.palette.common.dark, 0.2)}`,
      borderTopColor: 'transparent',
    },
    '&.collapse-table-row': {
      borderTop: '0 none',
      '& $tableCellRoot': {
        padding: 0,
      },
    },
    '&.active': {
      borderTop: '0 none',
      '&:hover': {
        transform: 'none',
        boxShadow: 'none',
      },
    },
  },
  tableCellRoot: {
    padding: 6,
    fontSize: 14,
    letterSpacing: 0.25,
    color: theme.palette.text.secondary,
    borderBottom: '0 none',
    position: 'relative',
    '&:first-child': {
      paddingLeft: 24,
    },
    '&:last-child': {
      textAlign: 'right',
      paddingRight: 24,
    },
  },
  tableCellFirst: {
    width: '50%',
  },
  tableCellSecond: {
    width: '25%',
  },
  tableCellHideShow: {
    width: '25%',
  },
  titleRoot: {
    color: theme.palette.text.secondary,
    letterSpacing: 0.25,
  },
  hideShowContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  showContent: {
    transition: 'all 0.3s ease-in-out',
    width: '100%',
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
  },
  hideContent: {
    transition: 'all 0.3s ease-in-out',
    transform: 'translateX(110%)',
    overflow: 'hidden',
  },
  hideShowLink: {
    cursor: 'pointer',
  },
  collapseTable: {
    paddingLeft: 60,
    '& td': {
      color: theme.palette.text.secondary,
      fontSize: 12,
      letterSpacing: 0.4,
      padding: 0,
      borderBottom: '0 none',
    },
  },
  openDataRot: {
    color: theme.palette.text.secondary,
    fontSize: 12,
    letterSpacing: 0.4,
    paddingLeft: 63,
    textAlign: 'left',
    paddingBottom: 10,
    marginTop: -15,
  },
}));

const TableItem = ({ row }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const [open, setOpen] = useState(false);
  const [payments, setPayments] = useState([]);
  const [customer, setCustomer] = useState(null);
  


  const handlePay = (val) => { 
    console.log(val);
    if(row && row.customers && row.customers.length !== 0){
       
      dispatch(setCurrentCustomer(row.customers[0]))
      dispatch({type: UPDATE_CART, payload: {...row, customerId: row.customers[0].id, cart_items: row.order_items }}); 

    } else {
      dispatch({type: UPDATE_CART, payload: {...row, customerId: null, cart_items: row.order_items }}); 
    }

       localStorage.removeItem('cart')
      dispatch({type: SET_ACTIVE_OPTION, payload: 'cart'});
      dispatch({type: SET_ACTION, payload: val});
      dispatch({type: SET_DRAWER_OPEN, payload: true});


      }


  useEffect(() => {

    if(row && row.payments){
      const sortedDesc =  row.payments.sort(
        (objA, objB) => Number(objB.id) - Number(objA.id),
      );

        setPayments(sortedDesc)

    }
  

    if(row.customers && row.customers.length !== 0){
        setCustomer(row.customers[0])
    }

  }, [row])


  return (
    <React.Fragment>
      <TableRow className={clsx(classes.tableRowRoot, open ? 'active' : '')}>
        <TableCell className={clsx(classes.tableCellRoot, classes.tableCellSecond)}>
          {/* <CmtObjectSummary
            avatar={<CmtAvatar src={row.user.avatar} alt={row.user.name} />}
            title={row.invoice_no}
            titleProps={{ className: classes.titleRoot }}
            showItemBadge={false}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            align={'horizontal'}
          /> */}
          <Typography>{row.order_no}</Typography>
        </TableCell>
        <TableCell align='center' className={clsx(classes.tableCellRoot, classes.tableCellSecond)}>
           ₱{row.amount_due}
        </TableCell>
        <TableCell className={clsx(classes.tableCellRoot, classes.tableCellSecond)}>
           {row.recordedAt}
        </TableCell>
        <TableCell className={clsx(classes.tableCellRoot, classes.tableCellHideShow)} onClick={() => setOpen(!open)}>
          <div className={classes.hideShowContent}>
            <div className={classes.showContent}>₱{row.amount_payable}</div>
            <Box
              className={clsx(classes.hideContent, classes.hideShowLink)}
              color="primary.main"
              display="flex"
              alignItems="center"
              justifyContent="flex-end">
              <span style={{ fontWeight: 700 }} className={'mr-2'}>
                {open ? 'HIDE' : 'DETAIL'}
              </span>
              {open ? <ArrowUpward fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
            </Box>
          </div>
        </TableCell>
      </TableRow>

      <TableRow className={clsx(classes.tableRowRoot, open ? 'active' : 'collapse-table-row')}>
        <TableCell className={classes.tableCellRoot} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <div className={classes.openDataRot}>
            <br/>
            {customer && 
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                    <div >
                    <Typography color="primary" component="spane">Customer Name:</Typography> 
                    </div>&nbsp;&nbsp;&nbsp;
                    <div className={'mr-3'}>
                    <Typography component="span">{customer.name}</Typography> 
                    </div>
                    </div>
                    }
            {payments.length !== 0 ? <>
              <h4 style={{marginBottom: '10px'}}>Payment History:</h4>
              {payments.map((a, index) => {
                  return (
                    <div key={a.id + index} style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', margin: '5px' }}>
                    <div className={'mr-3'}>
                     Order Date: &nbsp;&nbsp;
                      <Box component="span" fontWeight="fontWeightRegular" color="text.primary">
                      {new Date(a.createdAt).toLocaleDateString("en-US", options)}
                      </Box>
                    </div>
                    <div className={'mr-3'}>
                    <b>Amount:</b> &nbsp;&nbsp;
                    <Box component="span" fontWeight="fontWeightRegular" color="text.primary">
                      {new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'PHP' }).format(a.amount)}
                      </Box>
                    </div>
                    <hr/>
                    {/* <div className={'mr-3'}>
                    
                    </div>
    
                    <div>
                      Amount{' '}
                      <Box component="span" fontWeight="fontWeightRegular" color="text.primary">
                      {new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'PHP' }).format(a.amount)}
                      </Box>
                    </div> */}
                    {/* <br/> */}
                   
                  </div>
                  )
              })}
              <br/>
                <div style={{ marginLeft: 'auto' }}>
                      <Button size="small" variant="contained" color="primary" onClick={() => handlePay('unpaid')}>
                        Pay Now
                      </Button>
                    </div>
              </>
              :
              <Box width="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center"  >
              <h3 style={{textAlign: 'center', margin: '5px'}}>No Recent Payments</h3> 
              <br/>
                   {/* <div style={{ marginLeft: 'auto' }}> */}
                      <Button size="small" variant="contained" color="primary" onClick={() => handlePay('unpaid')}>
                        Pay Now
                      </Button>
                    {/* </div> */}
              </Box>
            }
            </div>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default TableItem;
