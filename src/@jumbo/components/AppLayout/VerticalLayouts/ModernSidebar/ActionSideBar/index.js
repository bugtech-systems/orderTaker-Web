import React, { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';

import { Box, Hidden, IconButton, withWidth, Tooltip } from '@material-ui/core';
// import SearchIcon from '@material-ui/icons/Search';
// import MessageIcon from '@material-ui/icons/Message';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
// import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { alpha, makeStyles } from '@material-ui/core/styles';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import CloseIcon from '@material-ui/icons/Close';

import CmtDropdownMenu from '../../../../../../@coremat/CmtDropdownMenu';
import CmtAvatar from '../../../../../../@coremat/CmtAvatar';
import SidebarToggleHandler from '../../../../../../@coremat/CmtLayouts/Vertical/SidebarToggleHandler';
import LayoutContext from '../../../../../../@coremat/CmtLayouts/LayoutContext';

import { AuhMethods } from '../../../../../../services/auth';
import { CurrentAuthMethod } from '../../../../../constants/AppConstants';
// import Logo from '../../../partials/Logo';
import ActionBarDrawer from './ActionBarDrawer';

import AccountTreeIcon from '@material-ui/icons/AccountTree';

//Icons
import LocalGroceryStore from '@material-ui/icons/LocalGroceryStore';



//Redux
import { useSelector, useDispatch } from 'react-redux';
import { CLEAR_CART } from '../../../../../../redux/actions/types';
import { setCurrentCustomer} from '../../../../../../redux/actions/Customer';
import { logout } from '../../../../../../redux/actions/Auth';
import { createOrder } from 'redux/actions/CartApp';


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
  const [isDrawerOpen, setDrawerStatus] = useState(false);
  const [activeOption, setActiveOption] = useState(null);
  const [action, setAction] = useState('cartItems');
  const { isSidebarOpen, sidebarWidth, setSidebarWidth, setSidebarOpen } = useContext(LayoutContext);


  const handleClearCart = () => {
    dispatch({ 
      type: CLEAR_CART
    })
    dispatch(setCurrentCustomer(null))
  }

  const handleClick = (type, data) => {

    if(type === 'back' && action === 'cartItems'){
      handleClearCart(); 
      onDrawerClose();
    }

    if(type === 'submit' && action === 'cartItems'){
      setAction('summary');
    }

        
    if(type === 'back' && action === 'summary'){
      setAction('cartItems');
    }

    if(type === 'submit' && action === 'summary'){
          dispatch(createOrder(cart))
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
    }
  }



  const onIconClick = option => {
    console.log(option)
    setSidebarOpen(false)
    setActiveOption(option);
    if(option === 'cart'){
      setAction('cartItems');
    }
  };

  const onDrawerClose = () => {
    setDrawerStatus(false);
    setActiveOption(null);
  };

  const handleLogout = () => {
        dispatch(logout());
    // dispatch(logout());
  };

  const onItemClick = item => {
    if (item.label === 'Logout') {
      dispatch(AuhMethods[CurrentAuthMethod].onLogout());
    }
    if (item.label === 'Account') {
      setActiveOption('profile');
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
      setDrawerStatus(true);

    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeOption]);


  return (
    <div className={clsx(classes.root, 'actionSidebar')}>
      <Hidden smDown>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Profile">
            <IconButton className={classes.iconBtn} onClick={() => onIconClick('profile')}>
              <CmtAvatar src={'https://via.placeholder.com/150'} />
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
        {/* <IconButton className={classes.iconBtn} onClick={() => onIconClick('messages')}>
          <MessageIcon />
        </IconButton> */}
        <Tooltip title="Cart">
          <IconButton className={classes.iconBtn} onClick={() => onIconClick('cart')}>
            <Badge badgeContent={cart.cart_items_count} classes={{ badge: classes.counterRoot }} overlap="rectangular">
              <LocalGroceryStore />
            </Badge>
          </IconButton>
        </Tooltip>
        <Tooltip title="Notifications">
          <IconButton className={classes.iconBtn} onClick={() => onIconClick('notifications')}>
            <Badge badgeContent={4} classes={{ badge: classes.counterRoot }} overlap="rectangular">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Tooltip>

        {/* {isSidebarOpen && (width === 'lg' || width === 'xl') && (
          <IconButton className={classes.iconBtn} onClick={() => setSidebarOpen(!isSidebarOpen)}>
            <MoreVertIcon />
          </IconButton>
        )} */}
      </Box>

      <Box display="flex" flexDirection={{ xs: 'row', lg: 'column' }} mt={{ xs: 'unset', lg: 'auto' }}>
        {/* <Hidden smDown>
          <Tooltip title="Settings">
            <IconButton className={classes.iconBtn} onClick={() => onIconClick('settings')}>
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </Hidden> */}
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
            TriggerComponent={<CmtAvatar src={'https://via.placeholder.com/150'} />}
            items={actionsList}
          />
        </Hidden>
      </Box>
      <ActionBarDrawer
        activeOption={activeOption}
        open={isDrawerOpen}
        onDrawerClose={onDrawerClose}
        onIconClick={onIconClick}
        handleClick={handleClick}
        action={action}
      />
    </div>
  );
};

export default withWidth()(ActionSideBar);
