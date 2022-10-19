import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

import CheckIcon from '@material-ui/icons/Check';
import CmtMediaObject from '../../../../../@coremat/CmtMediaObject';

import useStyles from './index.style';


//Redux
import { useDispatch } from 'react-redux';

import { SET_ACTION, SET_ACTIVE_OPTION, SET_DRAWER_OPEN, UPDATE_CART } from '../../../../../redux/actions/types';

const EventItem = ({ item }) => {
  const dispatch = useDispatch();
  const classes = useStyles();





  const handleClick = (val) => {
      dispatch({type: UPDATE_CART, payload: {...val, cart_items: val.order_items}}); 
      dispatch({type: SET_ACTIVE_OPTION, payload: 'cart'});
      dispatch({type: SET_ACTION, payload: val.isPaid ? 'paidCart' : 'viewCart'});
      dispatch({type: SET_DRAWER_OPEN, payload: true});
    }











  const getSubTitle = () => (
    <Typography className={classes.subTitleRoot}>
      <Box component="span">TOTAL: </Box>&nbsp;<strong>₱{item.amount_due}</strong>
      <Box component="span" mx={2}>
        |
      </Box>
      Customer:
      <Box component="span" color="primary.main" ml={1}>
        {item.customers[0] ? item.customers[0].name : 'No Customer'}
      </Box>
    </Typography>
  );

  return (
    <Box className={clsx(classes.eventItemRoot, { checked: item.isPaid })} onClick={() => handleClick(item)}>
     <CmtMediaObject
        avatarPos="center"
        title={item.order_no}
        titleProps={{
          variant: 'h4',
          component: 'div',
          className: classes.titleRoot,
        }}
        subTitle={getSubTitle()}
        actionsComponent={
          item.isPaid && (
            <Box color="success.main">
              <CheckIcon />
            </Box>
          )
        }
      /> 
    </Box>
  );
};

export default EventItem;
