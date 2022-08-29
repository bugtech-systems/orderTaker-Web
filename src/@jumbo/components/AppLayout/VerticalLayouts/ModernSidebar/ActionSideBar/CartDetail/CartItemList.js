import React, { useState, useEffect} from 'react';
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
import { CLEAR_CART, SET_ACTIVE_OPTION, SET_DRAWER_OPEN, SET_ACTION } from '../../../../../../../redux/actions/types';
import { handleCartItem, handleCart } from '../../../../../../../redux/actions/CartApp';
import { setCurrentCustomer } from '../../../../../../../redux/actions/Customer';
import { getInventoryList } from '../../../../../../../redux/actions/ProductApp';

//Components
import SearchProduct from './SearchProduct';
import CartItem from './CartItem';
import CartSummary from './CartSummary';


const useStyles = makeStyles(theme => ({
  rootWrap: {
    height: "100%",
    overflowY: 'auto',
    width: '100%',
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'flex-start'
  },
  accordionContent: {
    height: '100%',
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
  const cart = useSelector(({cartApp}) => cartApp);
  const { cart_items, cart_items_count, grand_total, gross_total, amount_due } = cart;
  const { productsList, filterType }  = useSelector(({productApp}) => productApp);
  const [expanded, setExpanded] = React.useState('cartItems');
  const [selected, setSelected] = useState(null);


  // const refs = cart_items.reduce((acc, value) => {
  //   acc[value.productId] = createRef();
  //   return acc;
  // }, {});



  const handleChange = (panel) => {
    console.log(panel)
    setExpanded(expanded === panel ? false : panel);
  };


  const handleItem = (val, qty) => {
    console.log(qty)
    let obj = {
      ...val,
      qty: qty
    }

      handleCartItem(cart_items, obj).then(a => {
        console.log(a)
        dispatch(handleCart({...cart, cart_items: a}))
      })
  }

  const handleSelect = (val) => {
    
    console.log(val)
if(val){

    let obj = {
      product: val,
      productId: val.id,
      name: val.name,
      price: val.price,
      other_amounts: val.other_amounts ? val.other_amounts : []
    }

    handleCartItem(cart_items, obj).then(a => {
      dispatch(handleCart({...cart, cart_items: a}))
    })
}
setSelected(val);

}

  // const handleProceedPayment = () => {
  //     dispatch({type: SET_ACTION, payload: 'payment'})
  // }

  // const handleClearCart = () => {
  //   dispatch({ 
  //     type: CLEAR_CART
  //   })
  //   dispatch(setCurrentCustomer(null));
  //   // dispatch({ 
  //   //   type: SET_ACTIVE_OPTION,
  //   //   payload: null
  //   // });

  //   // dispatch({ 
  //   //   type: SET_DRAWER_OPEN,
  //   //   payload: false
  //   // });
  // }

 



  // const scrollList = id =>
  //   refs[id].current.scrollIntoView({
  //     behavior: 'smooth',
  //     block: 'start',
  //   });



  useEffect(() => {
    dispatch(getInventoryList(filterType));
  }, [filterType, dispatch]);

  useEffect(() => {
    if(!expanded){
      setExpanded('cartItems')
    }
  }, [expanded])



  return (
    <Box flexGrow={1} className={classes.rootWrap}>
     <SearchProduct
      value={selected}
      options={productsList}
      handleSelect={handleSelect}
      />
      <Divider/>
      <Box flexGrow={1}>
      <Box  className={classes.accordionContent} >
        <Accordion expanded={expanded === 'cartItems'} onChange={() => {cart_items.length > 0 && handleChange('cartItems')}}>
        <AccordionSummary aria-controls="cartItems-content" id="cartItems-header">
         <Box className={classes.sectionHeading}> <Typography> Cart Items ({cart_items.length})</Typography></Box>
        </AccordionSummary>
        <AccordionDetails>

        <Box flexGrow={1} width="100%" style={{ 
          minHeight: '30vh',
          maxHeight: '50vh', 
          overflowY: 'auto'
          }} 
          >

        {cart_items.length !== 0 ? (
        <PerfectScrollbar className={classes.scrollbarRoot}>
          <CmtList data={cart_items} renderRow={(item, index) => {
            return (
          <CartItem 
          key={index}
          // ref={refs[item.productId]}        
          item={item} handleItem={handleItem}/>)}}/>
        </PerfectScrollbar>
        ) : (
        <Box flexGrow={1} width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
        <EmptyResult content="No record found" />
      </Box>
      )} 
      </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'summary'} onChange={() => cart_items.length > 0 && handleChange('summary')}>
        <AccordionSummary aria-controls="summary-content" id="summary-header">
          <Box width="100%" display="flex" justifyContent="space-between">
        <Box>
        Amount Due
        </Box>
        <Box pr={5} fontSize={18} fontWeight={700}>
        ₱{Number(amount_due).toFixed(2)}
        </Box>
        </Box>
        </AccordionSummary>
        <AccordionDetails>
        <Box flexGrow={1} width="100%" style={{ 
          
          height: '40vh',
          overflowX: 'hidden', 
          overflowY: 'auto'
          }}>
          <CartSummary/>
          </Box>
        </AccordionDetails>
      </Accordion>
      </Box>
      </Box>
     
        </Box>
  );
};

export default Comments;
