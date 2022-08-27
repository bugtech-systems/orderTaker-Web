import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import { Box, Divider, Typography, Button } from '@material-ui/core';
import CmtList from '../../../../../../../@coremat/CmtList';
import EmptyResult from '../EmptyResult';
import PerfectScrollbar from 'react-perfect-scrollbar';



//Redux
import { useSelector, useDispatch } from 'react-redux';
import { UPDATE_CART, CLEAR_CART, SET_ACTIVE_OPTION, SET_DRAWER_OPEN, SET_ACTION } from '../../../../../../../redux/actions/types';
import { handleCartItem } from '../../../../../../../redux/actions/CartApp';
import { setCurrentCustomer } from '../../../../../../../redux/actions/Customer';
import { getInventoryList } from '../../../../../../../redux/actions/ProductApp';

//Components
import SearchProduct from './SearchProduct';
import CartItem from './CartItem';
import CartSummary from './CartSummary';


const useStyles = makeStyles(theme => ({
  rootWrap: {
    height: "100%",
    width: '100%',
    flexGrow: 1
    // display: 'flex',
    // flexDirection: 'column',
      // alignItems: 'center',
    // justifyContent: 'flex-start'
  },
  accordionContent: {
    height: '70vh',
    width: '100%',
    flexGrow: 1
  }
}));

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
}))(MuiAccordionDetails);

const Comments = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { cart_items, cart_items_count, grand_total, gross_total, amount_due }  = useSelector(({cartApp}) => cartApp);
  const { productsList, filterType }  = useSelector(({productApp}) => productApp);
  const [expanded, setExpanded] = React.useState('cartItems');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };


  const handleItem = (val, action) => {
  
    let qty = action === 'add' ? Number(val.qty) + 1 : action === 'less' ? Number(val.qty) - 1 : -1; 
    let obj = {
      ...val,
      qty: Number(qty)
    }
      dispatch(handleCartItem(qty, obj))
  }

  const handleSelect = (val) => {
    console.log(val)
  }

  const handleProceedPayment = () => {
      dispatch({type: SET_ACTION, payload: 'success'})
  }

  const handleClearCart = () => {
    dispatch({ 
      type: CLEAR_CART
    })
    dispatch(setCurrentCustomer(null));
    dispatch({ 
      type: SET_ACTIVE_OPTION,
      payload: null
    });

    dispatch({ 
      type: SET_DRAWER_OPEN,
      payload: false
    });
  }




  useEffect(() => {
    dispatch(getInventoryList(filterType));
  }, [filterType, dispatch]);

  console.log(cart_items)
  console.log(expanded)
  useEffect(() => {
    if(!expanded){
      setExpanded('cartItems')
    }
  }, [expanded])


  return (
    <Box className={classes.rootWrap}>
     <SearchProduct
      options={productsList}
      handleSelect={handleSelect}
      />
      <Divider/>
     
      {/* {cart_items_count !== 0 && <Box className={classes.sectionTotalHeading}>
        <Box>
        Gross total
        </Box>
        <Box pr={5} fontSize={18} fontWeight={700}>
        ₱{gross_total}
        </Box>
      </Box>} 
      <Box className={classes.sectionHeading}>Cart Items ({cart_items_count})</Box>
      {cart_items_count !== 0 ? (
        <PerfectScrollbar className={classes.scrollbarRoot}>
          <CmtList data={cart_items} renderRow={(item, index) => <CartItem key={index} item={item} handleItem={handleItem}/>} />
        </PerfectScrollbar>
        ) : (
        <EmptyResult content="No record found" />
      )} */}
      <br/>
      <Box className={classes.accordionContent}>
        <Accordion expanded={expanded === 'cartItems'} onChange={() => {cart_items.length > 0 && handleChange('cartItems')}}>
        <AccordionSummary aria-controls="cartItems-content" id="cartItems-header">
          <Typography> <Box className={classes.sectionHeading}>Cart Items ({cart_items_count})</Box></Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Box flexGrow={1} width="100%" style={{ height: '50vh', overflowX: 'hidden', overflowY: 'auto'}}>
        {cart_items.length !== 0 ? (
        <PerfectScrollbar className={classes.scrollbarRoot}>
          <CmtList data={cart_items} renderRow={(item, index) => <CartItem key={index} item={item} handleItem={handleItem}/>} />
        </PerfectScrollbar>
        ) : (
        <Box flexGrow={1} width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
        <EmptyResult content="No record found" />
      </Box>
      )} 
      </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'summary'} onChange={() => amount_due <= 0 && handleChange('summary')}>
        <AccordionSummary aria-controls="summary-content" id="summary-header">
          <Box width="100%" display="flex" justifyContent="space-between">
        <Box>
        Amount Due
        </Box>
        <Box pr={5} fontSize={18} fontWeight={700}>
        ₱{amount_due}
        </Box>
        </Box>
        </AccordionSummary>
        <AccordionDetails>
        <Box flexGrow={1} width="100%" style={{ height: '50vh', overflowX: 'hidden', overflowY: 'auto'}}>
          <CartSummary/>
          </Box>
        </AccordionDetails>
      </Accordion>
      </Box>
      <br/>
       <Box mt="auto" width="100%" display="flex" alignItems="center" justifyContent="space-around">
        <Button variant="outlined" onClick={() => handleClearCart()} >Clear</Button> <Button variant="contained" color="primary" onClick={() => handleProceedPayment()} disabled={cart_items.length === 0} >Proceed Payment</Button>
       </Box>
        </Box>
  );
};

export default Comments;
