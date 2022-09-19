import React, {useEffect, useState} from "react";
import AppTextInput from "../../../../../@jumbo/components/Common/formElements/AppTextInput";
import {Box, Button, Typography} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import makeStyles from "@material-ui/core/styles/makeStyles";

//Redux
import {useDispatch, useSelector} from "react-redux";
import {
  handleCartItem,
  handleCart
 } from "../../../../../redux/actions/CartApp";
import { fetchError } from "redux/actions";



const useStyles = makeStyles(theme => ({
  btnRoot: {
    whiteSpace: "nowrap"
  },
  textBtn: {
    color: theme.palette.text.disabled
  },
  textSuccess: {
    whiteSpace: "nowrap",
    fontSize: 14,
    [theme.breakpoints.up("xl")]: {
      fontSize: 16
    }
  },
  iconView: {
    "& .MuiSvgIcon-root": {
      color: theme.palette.success.main,
      display: "block"
    }
  }
}));

const AddToCart = ({item, setRevealed, onCheckout, ...rest}) => {
  const dispatch = useDispatch();
  const cart = useSelector(({cartApp}) => cartApp);
  const { productsList, filterType }  = useSelector(({productApp}) => productApp);

  const { cart_items } = cart;
  const [ quantity, setQuantity ] = useState(0);
  const [ stocks, setStocks ] = useState(0);
  const [ addedToCart] = useState(false);
  const classes = useStyles();

  const handleQuantity = val => {
    if (item.stocks >= val && val >= 0) {
      setQuantity(val);
      setStocks(item.stocks - val);
    }
  };

  const addToCart = () => {
    // onCheckout(quantity);
    console.log('Quants')
    console.log(quantity)
  if(Number(quantity) === 0) {
    return dispatch(fetchError('Cant add 0 quantity!'))
  } else {



    let prd = productsList.find(a => a.id === item.id);


    let obj = {
      product: prd,
      productId: item.id,
      name: item.name,
      stocks: prd.stocks - quantity,
      price: item.price,
      total: item.price * quantity,
      qty: quantity,
      other_amounts: item.other_amounts ? item.other_amounts : []
    }



    handleCartItem(cart_items, obj).then(a => {
      dispatch(handleCart({...cart, cart_items: a}))
    })

    setRevealed(false);
  }
  };

  const checkoutOrder = () => {
    console.log("Checkout");
  };

  const backToInfo = () => {
    setRevealed(false);
  };

  useEffect(
    () => {
      if(item.stocks > 0){
      setStocks(item.stocks - quantity);
    } else {
      setQuantity(0)
    }
    },
    [ item.stocks ]
  );

  return addedToCart ? (
    <Box {...rest}>
      <Box display="flex" alignItems="center" mb={3}>
        <Box mr={2} className={classes.iconView}>
          <CheckCircleIcon />
        </Box>
        <Typography className={classes.textSuccess}>
          Added to cart Successfully
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Box mr={2}>
          <Button variant="contained" color="primary" onClick={checkoutOrder}>
            Checkout
          </Button>
        </Box>
        <Button className={classes.textBtn} onClick={backToInfo}>
          Later
        </Button>
      </Box>
    </Box>
  ) : (
    <Box {...rest}>
      <Box display="flex" alignItems="center" mb={3}>
        <AppTextInput
          type="number"
          label="Qty"
          value={quantity}
          variant="outlined"
          onChange={event => handleQuantity(event.target.value)}
        />
        <Box ml={3}>
          <Button
            className={classes.btnRoot}
            variant="contained"
            color="primary"
            size="small"
            onClick={addToCart}
          >
            Add To Cart
          </Button>
        </Box>
      </Box>
      <Box display="flex" alignItems="center">
        <Box display="flex" flexDirection="column">
          <Box component="span" fontSize={{xl: 16}}>
            Price: ₱{item.price} / {item.uom}
          </Box>
          <Box component="span" fontSize={{xl: 16}}>
            Stocks:{" "}
            {stocks > 0 ? (
              <Typography color="primary" component="span">
                {stocks}
              </Typography>
            ) : (
              <Typography color="secondary" component="span">
                Out of Stock!
              </Typography>
            )}
          </Box>
        </Box>
        <Box ml="auto">
          <Button className={classes.textBtn} onClick={backToInfo}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default React.memo(AddToCart);
