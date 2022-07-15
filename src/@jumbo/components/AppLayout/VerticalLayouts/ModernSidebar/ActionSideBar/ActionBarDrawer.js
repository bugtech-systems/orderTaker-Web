import React from 'react';
import { Box, Hidden, IconButton, Tooltip, Button } from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';
import CmtDrawer from '../../../../../../@coremat/CmtDrawer';
import CloseIcon from '@material-ui/icons/Close';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import CmtAvatar from '../../../../../../@coremat/CmtAvatar';


//Components
import Notifications from './Notifications';
import Profile from './UserDetail';
import Cart from './CartDetail/index';


//Redux
import { useDispatch } from 'react-redux';
import { CLEAR_CART } from '../../../../../../redux/actions/types';




//Icons
import LocalGroceryStore from '@material-ui/icons/LocalGroceryStore';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '100wh',
    
  },
  actionSidebar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '15px 5px',
    width: '100%',
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  contentArea: {
    width: '100vw',
    // overflow: 'hidden',
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 579,
      // overflow: 'hidden',
      height: '100%'

    },
  },
  scrollbarRoot: {
    // height: '100%',
    margin: 15,
    overflow: 'hidden'
  },
  iconBtn: {
    position: 'relative',
    color: alpha(theme.palette.common.dark, 0.38),
    '&:hover, &:focus, &.active': {
      color: theme.palette.primary.main,
      backgroundColor: alpha(theme.palette.primary.main, 0.08),
    },
  },
  counterRoot: {
    color: theme.palette.common.white,
    border: `solid 1px ${theme.palette.common.white}`,
    backgroundColor: theme.palette.warning.main,
    width: 20,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5px 15px'
    },
    cartButton: {
      position: 'absolute',
      width: '100%',
      bottom: 30,
      zIndex: 1000,
      color: theme.palette.text.secondary,
      textTransform: 'uppercase',
      display: "flex",
      alignItems: 'center',
      justifyContent: 'space-around',
      [theme.breakpoints.up('sm')]: {
        bottom: 20,
      },
    },
}));

const ActionBarDrawer = ({ activeOption, onIconClick, onDrawerClose, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();



  const handleClearCart = () => {

    dispatch({ 
      type: CLEAR_CART
    })

  }


  return (
    <CmtDrawer variant="temporary" anchor="left" onClose={onDrawerClose} {...rest}>
      <Box className={clsx(classes.root)}>
          {/* <Hidden smDown>
        <Box className={classes.actionSidebar}>
          <IconButton className={classes.iconBtn} onClick={onDrawerClose}>
            <CloseIcon />
          </IconButton>
          <Tooltip title="Profile">
            <IconButton
              className={clsx(classes.iconBtn, {
                active: activeOption === 'profile',
              })}
              onClick={() => onIconClick('profile')}>
              <CmtAvatar src={'https://via.placeholder.com/150'} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Cart">
            <IconButton
              className={clsx(classes.iconBtn, {
                active: activeOption === 'cart',
              })}
              onClick={() => onIconClick('cart')}>
              <Badge badgeContent={5} classes={{ badge: classes.counterRoot }} overlap="rectangular">
                <LocalGroceryStore />
              </Badge>
            </IconButton>
          </Tooltip>

          <IconButton
            className={clsx(classes.iconBtn, {
              active: activeOption === 'notifications',
            })}
            onClick={() => onIconClick('notifications')}>
            <Badge badgeContent={4} classes={{ badge: classes.counterRoot }} overlap="rectangular">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Box>
        </Hidden> */}
        <Box className={classes.contentArea}>
        {/* <IconButton className={classes.iconBtn} onClick={onDrawerClose}>
            <CloseIcon />
          </IconButton> */}
            <Box className={classes.header}>
        <Box fontSize={20} fontWeight={700}>
           {activeOption === 'notifications' && 'Notifications'}
            {activeOption === 'profile' && 'My Pofile'}
            {activeOption === 'cart' && 'SHOPPING CART'}
        </Box>
        <IconButton className={classes.iconBtn} onClick={onDrawerClose}>
            <CloseIcon />
          </IconButton>
      </Box>
          <PerfectScrollbar className={classes.scrollbarRoot}>
            {activeOption === 'notifications' && <Notifications />}
            {activeOption === 'profile' && <Profile/>}
            {activeOption === 'cart' && <Cart />}
          </PerfectScrollbar>
        </Box>
        {activeOption === 'cart' && <Box className={classes.cartButton}>
      <Button variant="contained" color="default" onClick={() => handleClearCart()}>Clear Cart</Button>
      <Button variant="contained" color="primary">Checkout</Button>
      </Box>}

    
      </Box>
    </CmtDrawer>
  );
};

export default ActionBarDrawer;
