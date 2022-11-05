import React, { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';

import { Box, Hidden, IconButton, withWidth, Tooltip } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { alpha, makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

import CmtDropdownMenu from '../../../../../../@coremat/CmtDropdownMenu';
import CmtAvatar from '../../../../../../@coremat/CmtAvatar';
import SidebarToggleHandler from '../../../../../../@coremat/CmtLayouts/Vertical/SidebarToggleHandler';
import LayoutContext from '../../../../../../@coremat/CmtLayouts/LayoutContext';
import ActionBarDrawer from './ActionBarDrawer';
import AccountTreeIcon from '@material-ui/icons/AccountTree';

//Icons
import LocalGroceryStore from '@material-ui/icons/LocalGroceryStore';



//Redux
import { useSelector, useDispatch } from 'react-redux';
import { CLEAR_CART, SET_ACTION, SET_ACTIVE_OPTION, SET_DRAWER_OPEN, SET_NOTIF_COUNT, UPDATE_CART } from '../../../../../../redux/actions/types';
import { logout } from '../../../../../../redux/actions/Auth';
import commonData from 'utils/commonData';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    padding: '10px 24px 10px 15px',
    [theme.breakpoints.up('lg')]: {
      flexDirection: 'column',
      padding: '16px 5px',
    },
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  iconBtn: {
    position: 'relative',
    color: alpha(theme.palette.common.white, 0.9),
    '&:hover, &:focus': {
      color: theme.palette.common.white,
    },
  },
  counterRoot: {
    color: theme.palette.common.white,
    border: `solid 1px ${theme.palette.common.white}`,
    backgroundColor: theme.palette.warning.main,
    width: 20,
  },
}));

const actionsList = [
  {
    icon: <PersonIcon />,
    label: 'Account',
  },
  {
    icon: <ExitToAppIcon />,
    label: 'Logout',
  },
];

let initSidebarWidth = 0;
const ActionSideBar = ({ width }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cart = useSelector(({cartApp}) => cartApp);
  const { authUser } = useSelector(({auth}) => auth);

  const { isDrawerOpen, activeOption, notifCount, action } = useSelector(({uiReducer}) => uiReducer)
  const { isSidebarOpen, sidebarWidth, setSidebarWidth, setSidebarOpen } = useContext(LayoutContext);

  const onIconClick = option => {
    setSidebarOpen(false);
      
    
        if(option === 'notifications'){
          dispatch({type: SET_NOTIF_COUNT, payload: 0})
        }


          dispatch({type: SET_ACTIVE_OPTION, payload: option})

    // if(option === 'cart'){
    //   // setAction('cartItems');
    //   dispatch({type: SET_ACTION, payload: 'cart'})
    // }

    // if(action !== 'cart' &&  action !== 'payment' && action !== 'success'){
    //   dispatch({type: SET_ACTION, payload: action})
    //   dispatch({type: SET_ACTIVE_OPTION, payload: (option === 'notification' || option === 'profile') ? action : 'cart'})
    // } else{
    //   dispatch({type: SET_ACTION, payload: 'cart'})
    //   dispatch({type: SET_ACTIVE_OPTION, payload: option})
    // }

    dispatch({type: SET_DRAWER_OPEN, payload: true})
  };

  const onDrawerClose = () => {
    console.log(action)

    if((action !== 'cart' && action !== 'payment')) {
        localStorage.removeItem('cart');
        dispatch({type:  CLEAR_CART})
    }

    dispatch({type: SET_DRAWER_OPEN, payload: false})
    dispatch({type: SET_ACTIVE_OPTION, payload: null})
  };

  const handleLogout = () => {
        dispatch(logout());
  };

  const onItemClick = item => {
    setSidebarOpen(false);

    if (item.label === 'Logout') {
      dispatch(logout());
    }
    if (item.label === 'Account') {
      // setActiveOption('profile');
      dispatch({type: SET_ACTIVE_OPTION, payload: 'profile'})
      dispatch({type: SET_DRAWER_OPEN, payload: true})

    }
  };



  useEffect(() => {
    initSidebarWidth = sidebarWidth;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isSidebarOpen && (width === 'lg' || width === 'xl')) {
      setSidebarWidth(0);
    } else {
      setSidebarWidth(initSidebarWidth);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSidebarOpen, width]);

  useEffect(() => {
    if (activeOption && !isDrawerOpen) {
      setSidebarOpen(false)
      dispatch({type: SET_DRAWER_OPEN, payload: false})

    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeOption]);

  useEffect(() => {
    let localCart = localStorage.getItem('cart');

    if(localCart){
      dispatch({
        type: UPDATE_CART,
        payload: JSON.parse(localCart)
      });
    }

  }, [])


  console.log(action)


  return (
    <div className={clsx(classes.root, 'actionSidebar')}>
      <Hidden smDown>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Profile">
            <IconButton className={classes.iconBtn} onClick={() => onIconClick('profile')}>
              <CmtAvatar src={`${commonData.staticUrl}${authUser.dpUrl}`} />
            </IconButton>
          </Tooltip>
        </div>
      </Hidden>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <SidebarToggleHandler className={classes.iconBtn}>
          {isSidebarOpen && (width === 'lg' || width === 'xl') ? <CloseIcon /> : <AccountTreeIcon />}
        </SidebarToggleHandler>
      </div>

      <Box display="flex" flexDirection={{ xs: 'row', lg: 'column' }} ml={{ xs: 'auto', lg: 'unset' }}>
        <Tooltip title="Cart">
          <IconButton className={classes.iconBtn} onClick={() => onIconClick('cart')}>
            <Badge badgeContent={cart.cart_items.length} classes={{ badge: classes.counterRoot }} overlap="rectangular">
              <LocalGroceryStore />
            </Badge>
          </IconButton>
        </Tooltip>
        <Tooltip title="Notifications">
          <IconButton className={classes.iconBtn} onClick={() => onIconClick('notifications')}>
            <Badge badgeContent={notifCount} classes={{ badge: classes.counterRoot }} overlap="rectangular">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Tooltip>
      </Box>
      <Box display="flex" flexDirection={{ xs: 'row', lg: 'column' }} mt={{ xs: 'unset', lg: 'auto' }}>
        <Hidden smDown>
          <Tooltip title="Logout">
            <IconButton className={classes.iconBtn} onClick={handleLogout}>
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        </Hidden>
        <Hidden lgUp>
          <CmtDropdownMenu
            onItemClick={onItemClick}
            TriggerComponent={
              <CmtAvatar src={`${commonData.staticUrl}${authUser.dpUrl}`} />
          }
            items={actionsList}
          />
        </Hidden>
      </Box>
      <ActionBarDrawer
        open={isDrawerOpen}
        onDrawerClose={onDrawerClose}
        onIconClick={onIconClick}
        activeOption={activeOption}
        action={action}
      />
    </div>
  );
};

export default withWidth()(ActionSideBar);
