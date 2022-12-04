import React, {useState, useEffect} from "react";
import { Box, Typography} from "@material-ui/core";
import CmtImage from "../../../../../@coremat/CmtImage";
import CmtMediaObject from "../../../../../@coremat/CmtMediaObject";
import {IconButton} from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import AddToCart from "./AddToCart";
import clsx from "clsx";
import ActionSnackBar from "./ActionSnackBar";
import useStyles from "./ListItem.style";

//Redux
import {useDispatch, useSelector} from "react-redux";

import {
  handleCartItem,
  handleCart
 } from "../../../../../redux/actions/CartApp";
import { fetchError } from "../../../../../redux/actions";

import commonData from "utils/commonData";
import { SET_DASHBOARD_DATA } from "../../../../../redux/actions/types";


import { formatNumber } from "@jumbo/utils/commonHelper";


const ListItem = ({item}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cartApp);
  const {  popularProducts } = useSelector(({dashboard}) => dashboard);



  const [ revealed, setRevealed ] = useState(false);
  const [ openSnackBar, setSnackBarStatus ] = useState(false);
  const [ snackBarMessage, setSnackBarMessage ] = useState("");
  const [cartList, setCartList] = useState([]);


  const addToCart = () => {
   
    let crt = cartList.find(a => a.productId === item.id);


    if(((crt && Number(crt.stocks) === 0) || Number(item.stocks) === 0)) {
      return dispatch(fetchError('Cant add 0 stocks!'))
    } else {
  
      let prd = popularProducts.find(a => a.id === item.id);
      console.log(prd)
      let obj = crt ? {
        ...crt,
        qty: crt ? crt.qty + 1 : 1,
        product: prd
      } : {
        product: prd,
        productId: item.id,
        name: item.name,
        price: item.price,
        other_amounts: item.other_amounts ? item.other_amounts : []
      }
  
      
      const pp = popularProducts.map(a => {
        return a.id === item.id ? {
          ...a,
          stocks: prd.stocks - (obj.qty ? obj.qty : 1)
        } : a
      });
    
  
      dispatch({type: SET_DASHBOARD_DATA, payload: { popularProducts: pp }})
  
      handleCartItem(cartList, obj).then(a => {
        dispatch(handleCart({...cart, cart_items: a}))
      })
    //   setRevealed(false);
    }
    };



  const getActionComponent = () => (
    <Box>
      <Box component="span" mr={3} color="primary.main">
        ₱{item.price} / {item.uom}
      </Box>
    </Box>
  );

  const getStocks = () => (
    <Box>
      <Box component="span" mr={1} color="primary.main">
        Stocks: {formatNumber(item.stocks)}
      </Box>
    </Box>
  );

  const handleCloseSnackBar = React.useCallback(() => {
    setSnackBarStatus(false);
    setSnackBarMessage("");
  }, []);

  useEffect(() => {
    const { cart_items} = cart;

    setCartList(cart_items)
  }, [cart])



  return (
    <React.Fragment>
      <Box
        className={clsx(classes.productListItems, {
          "active-activated": revealed
        })}
      >
        <CmtMediaObject
          avatar={
            <CmtImage src={`${commonData.staticUrl}${item.cover}`} height={80} width={80} alt={item.name} />
          }
          title={item.name}
          titleProps={{
            variant: "h4",
            component: "div",
            className: classes.titleRoot
          }}
          subTitle={item.description}
          subTitleProps={{
            variant: "subtitle2",
            component: "p",
            className: classes.subTitleRoot
          }}
          actionsComponent={getActionComponent()}
          content={
            item.stocks && item.stocks !== 0 ? (
              getStocks()
            ) : (
              <Typography color="secondary" component="span">
              Out of Stock!
            </Typography>
            )
          }
        />
        <Box className={classes.listItemAction}>
          <Box className={classes.listItemActionHover} onClick={() => {
            setRevealed(true);
            // addToCart();
          }}>
            <IconButton className="btn"  disabled={item.stocks <= 0}>
              <AddShoppingCartIcon />
            </IconButton>
          </Box>
          <AddToCart
            className={classes.revealContainer}
            item={item}
            setRevealed={setRevealed}
          />
        </Box>
      </Box>

      <ActionSnackBar
        message={snackBarMessage}
        open={openSnackBar}
        onClose={handleCloseSnackBar}
      />
    </React.Fragment>
  );
};

export default ListItem;
