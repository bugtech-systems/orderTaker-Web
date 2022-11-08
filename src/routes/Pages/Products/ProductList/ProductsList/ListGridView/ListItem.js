import React, {useState, useEffect} from "react";
import { Box, Typography} from "@material-ui/core";
import CmtImage from "../../../../../../@coremat/CmtImage";
import CmtMediaObject from "../../../../../../@coremat/CmtMediaObject";
import {IconButton} from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import AddToCart from "./AddToCart";
import clsx from "clsx";
import ActionSnackBar from "./ActionSnackBar";
import useStyles from "./ListItem.style";

//Redux
import {useDispatch, useSelector} from "react-redux";
import {
  SET_CART_ITEMS_COUNT,
  UPDATE_CART_ITEMS
} from "../../../../../../redux/actions/types";
import {
  handleCartItem,
  handleCart
 } from "../../../../../../redux/actions/CartApp";
import { fetchError } from "../../../../../../redux/actions";
import commonData from "../../../../../../utils/commonData";
import { SET_DASHBOARD_DATA } from "../../../../../../redux/actions/types";

const ListItem = ({item}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cartApp);
  const { productsList, filterType }  = useSelector(({productApp}) => productApp);
  const {  productLists } = useSelector(({dashboard}) => dashboard);

  const [ revealed, setRevealed ] = useState(false);
  const [ openSnackBar, setSnackBarStatus ] = useState(false);
  const [ snackBarMessage, setSnackBarMessage ] = useState("");
  const [ prodList, setProdList ] = useState([]);




  const handleCheckout = () => {
    // let cartItems = cart_items;
    let ind = prodList.find(a => a.productId === item.id);

    if((ind && Number(ind.stocks) === 0 || Number(item.stocks) === 0)) {
      return dispatch(fetchError('Cant add 0 stocks!'))
    }
    else {
      
      let prd = productsList.find(a => a.id === item.id);
      console.log(item)
      console.log(prodList)
      console.log(ind)
      console.log(prd)
  
      let obj = ind ? {
        ...ind,
        qty: ind ? ind.qty + 1 : 1,
        product: prd
      } : {
        product: prd,
        productId: item.id,
        name: item.name,
        price: item.price,
        other_amounts: item.other_amounts ? item.other_amounts : []
      }

      const pl = productLists.map(a => {
        console.log(a.id === item.id )
        return a.id === item.id ? {
          ...prd,
          stocks: prd.stocks - (obj.qty ? obj.qty : 1)
        } : prd
      });
    
      console.log(productLists)
  
      dispatch({type: SET_DASHBOARD_DATA, payload: { productLists: pl }})
  
      handleCartItem(prodList, obj).then(a => {
        dispatch(handleCart({...cart, cart_items: a}))
      })

      
    }
     
    setSnackBarMessage("You have submitted for Checkout");
    setSnackBarStatus(true);
  };

  const getActionComponent = () => (
    <Box>
      <Box component="span" mr={1} color="primary.main">
        ₱{item.price}  / {item.uom}
      </Box>
    </Box>
  );

  const getStocks = () => (
    <Box>
      <Box component="span" mr={1} color="primary.main">
        Stocks: {item.stocks}
      </Box>
    </Box>
  );

  const handleCloseSnackBar = React.useCallback(() => {
    setSnackBarStatus(false);
    setSnackBarMessage("");
  }, []);

  useEffect(() => {
    const { cart_items} = cart;

    setProdList(cart_items)
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
          subTitle={item.description ? item.description : 'No Description'}
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
          <Box className={classes.listItemActionHover} onClick={() => handleCheckout()}>
            <IconButton className="btn" disabled={item.stocks <= 0}>
              <AddShoppingCartIcon />
            </IconButton>
          </Box>
          {/* <AddToCart
            className={classes.revealContainer}
            item={item}
            setRevealed={setRevealed}
            onCheckout={handleCheckout}
          /> */}
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
