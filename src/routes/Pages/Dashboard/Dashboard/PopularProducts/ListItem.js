import React, {useState} from "react";
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
        ₱{item.price} / {item.uom}
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
