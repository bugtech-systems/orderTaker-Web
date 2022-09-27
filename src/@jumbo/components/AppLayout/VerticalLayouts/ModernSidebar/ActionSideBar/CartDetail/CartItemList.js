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
import { CLEAR_CART, SET_ACTIVE_OPTION, SET_DRAWER_OPEN, SET_ACTION, CLEAR_ALL_PRODUCTS } from '../../../../../../../redux/actions/types';
import { handleCartItem, handleCart } from '../../../../../../../redux/actions/CartApp';
import { setCurrentCustomer } from '../../../../../../../redux/actions/Customer';
import { getInventoryList } from '../../../../../../../redux/actions/ProductApp';
import { fetchError, fetchStart, fetchSuccess } from '../../../../../../../redux/actions/Common';



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
  const { action } = useSelector(({uiReducer}) => uiReducer); 
  const { filterType, allProducts }  = useSelector(({productApp}) => productApp);
  const [expanded, setExpanded] = React.useState('cartItems');
  const [selected, setSelected] = useState(null);
  const [cartList, setCartList] = useState([]);
  const [amount_due, setAmountDue] = useState(0);


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
    console.log('HANDOL ITEM')
    console.log(val)
    let prd = allProducts.find(a => a.id === val.productId)
    let obj = {
      ...val,
      qty: qty,
      product: prd
    }

      handleCartItem(cartList, obj).then(a => {
        console.log(a)
        dispatch(handleCart({...cart, cart_items: a}))
      })
  }

  const handleSelect = (val) => {
    console.log('HANDOL SELECT')  
    console.log(val)
if(val){
  
  
  
  let prd = allProducts.find(a => a.id === val.id)
  if(!prd){
    return dispatch(fetchError("Unable to Find Product!"));
  }

  if(prd.stocks <= 0){
    return dispatch(fetchError("No Stocks Available!"));
  } else {
  let obj = {
      product: prd,
      productId: val.id,
      name: val.name,
      price: val.price,
      other_amounts: val.other_amounts ? val.other_amounts : []
    }

    handleCartItem(cartList, obj).then(a => {
      dispatch(handleCart({...cart, cart_items: a}))
    })
  }
}
setSelected(null);

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


  useEffect(() => {
    const { cart_items, amount_due } = cart;

    setCartList(cart_items);
    setAmountDue(amount_due)
  }, [cart])


  

    console.log(cartList)

  return (
    <Box flexGrow={1} className={classes.rootWrap}>
   {action === 'cart' && <SearchProduct
      value={selected}
      options={allProducts}
      handleSelect={handleSelect}
      />}
      <Divider/>
      <Box flexGrow={1}>
      <Box  className={classes.accordionContent} >
        <Accordion expanded={expanded === 'cartItems'} onChange={() => {cartList.length > 0 && handleChange('cartItems')}}>
        <AccordionSummary aria-controls="cartItems-content" id="cartItems-header">
         <Box className={classes.sectionHeading}> <Typography> Cart Items ({cartList.length})</Typography></Box>
        </AccordionSummary>
        <AccordionDetails>

        <Box flexGrow={1} width="100%" style={{ 
          minHeight: '30vh',
          maxHeight: '50vh', 
          overflowY: 'auto'
          }} 
          >

        {cartList.length !== 0 ? (
        <PerfectScrollbar className={classes.scrollbarRoot}>
          <CmtList data={cartList} renderRow={(item, index) => {
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
      )
      } 
      </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'summary'} onChange={() => cartList.length > 0 && handleChange('summary')}>
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
