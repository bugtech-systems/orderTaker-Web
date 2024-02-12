import React, {useEffect, useState} from "react";
import AppTextInput from "../../../../../@jumbo/components/Common/formElements/AppTextInput";
import {Box, Button, IconButton, Typography} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import PlusIcon from '@material-ui/icons/Add';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Chip from '@material-ui/core/Chip';



//Redux
import {useDispatch, useSelector} from "react-redux";
import {
  handleCartItem,
  handleCart
 } from "../../../../../redux/actions/CartApp";
import { fetchError } from "redux/actions";
import { formatDec } from "../../../../../utils/helpers";
import { getProductById } from "redux/actions/ProductApp";



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
  const classes = useStyles();

  const handleQuantity = val => {
    let stcks = formatDec(item.stocks);
    let qty = formatDec(val)
    if (stcks >= qty && qty >= 0) {
      setQuantity(qty > stcks ? stcks : qty);
      setStocks(stcks - qty);
    }
  };

  const addToCart = async () => {
  if(Number(quantity) === 0) {
    return dispatch(fetchError('Cant add 0 quantity!'))
  } else {



    let prd = await getProductById(item.id);


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

  const handleDecimals = (val) => {
    let newQty = Number(quantity) + Number(val);
    handleQuantity(Number(newQty).toFixed(2));
  }


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

  return (
    <Box {...rest}>
      <Box display="flex" alignItems="center">
        <div style={{padding: '10px', width: '100%' }}>
        <AppTextInput
          type="number"
          step="any"
          label="Qty"
          value={quantity}
          variant="outlined"
          onChange={event => handleQuantity(event.target.value)}
        />
        <Box display="flex" justifyContent="flex-start" alignItems="center">
        <IconButton size="small">
        <Chip size="small" label="1/4" onClick={() => handleDecimals(0.25)} />
        </IconButton>
        <IconButton size="small">
        <Chip size="small" label="1/2" onClick={() => handleDecimals(0.5)} />
        </IconButton>  <IconButton size="small">
        <Chip size="small" label="3/4" onClick={() => handleDecimals(0.75)} />
        </IconButton>
        </Box>
        </div>
      
        <Box ml={3}>
          <Button
            className={classes.btnRoot}
            variant="contained"
            color="primary"
            size="small"
            onClick={addToCart}
          >
         <PlusIcon/>&nbsp;Add
          </Button>
        </Box>
      </Box>
      <Box display="flex" alignItems="center">
        <Box display="flex" flexDirection="column" pl={3}>
          <Box component="span" fontSize={{xl: 14}}>
            Price: ₱{item.price} / {item.uom}
          </Box>
          <Box component="span" fontSize={{xl: 14}}>
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
