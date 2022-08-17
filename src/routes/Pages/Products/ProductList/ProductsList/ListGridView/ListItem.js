import React, {useState} from "react";
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
import commonData from "utils/commonData";

const ListItem = ({item}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {cart_items} = useSelector(state => state.cartApp);
  const [ revealed, setRevealed ] = useState(false);
  const [ openSnackBar, setSnackBarStatus ] = useState(false);
  const [ snackBarMessage, setSnackBarMessage ] = useState("");


  const getActionComponent = () => (
    <Box>
      <Box component="span" mr={1} color="primary.main">
        ₱{item.price}
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

  const handleCheckout = qty => {
    let cartItems = cart_items;
    let ind = cart_items.find(a => a.productId == item.id);

    if (ind) {
      let newItems = cartItems.map(a => {
        return a.productId == item.id
          ? {
              ...item,
              price: item.price,
              qty: qty,
              total: item.price * qty,
              stocks: item.stocks - qty,
              productId: item.id,
              name: item.name,
              description: item.description
            }
          : a;
      });

      dispatch({
        type: UPDATE_CART_ITEMS,
        payload: newItems
      });

      dispatch({
        type: SET_CART_ITEMS_COUNT,
        payload: newItems.length
      });
    } else {
      cartItems.push({
        ...item,
        price: item.price,
        qty: qty,
        total: item.price * qty,
        stocks: item.stocks - qty,
        productId: item.id,
        name: item.name,
        description: item.description
      });

      dispatch({
        type: UPDATE_CART_ITEMS,
        payload: cartItems
      });

      dispatch({
        type: SET_CART_ITEMS_COUNT,
        payload: cartItems.length
      });
    }

    setSnackBarMessage("You have submitted for Checkout");
    setSnackBarStatus(true);
  };

  // const onVariantClick = React.useCallback((label, value) => {
  //   setSnackBarMessage(`You choose ${label} ${value}`);
  //   setSnackBarStatus(true);
  // }, []);

  const handleCloseSnackBar = React.useCallback(() => {
    setSnackBarStatus(false);
    setSnackBarMessage("");
  }, []);

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
          <Box className={classes.listItemActionHover} onClick={() => setRevealed(true)}>
            <IconButton className="btn" >
              <AddShoppingCartIcon />
            </IconButton>
          </Box>
          <AddToCart
            className={classes.revealContainer}
            item={item}
            setRevealed={setRevealed}
            onCheckout={handleCheckout}
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
