import React, { useEffect, useState } from 'react';
import { Box, Hidden, IconButton, Tooltip, Button } from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';
import CmtDrawer from '../../../../../../@coremat/CmtDrawer';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import CmtAvatar from '../../../../../../@coremat/CmtAvatar';
import AppSwitch from '../../../../Common/formElements/AppSwitch';
import ConfirmDialog from '../../../../../../@jumbo/components/Common/ConfirmDialog';



//Icons 
import CloseIcon from '@material-ui/icons/Close';
import PrintIcon from '@material-ui/icons/Print';


//Components
import Notifications from './LatestNotifications';
import Profile from './UserDetail';
import Cart from './CartDetail/index';
import CartFooter from './CartDetail/CartFooter';


import BlockIcon from '@material-ui/icons/Block';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { setOrderReceipt } from 'redux/actions/Report.action';

import { voidOrderId } from 'redux/actions/OrderApp';
import { CLEAR_CART, SET_DRAWER_OPEN } from 'redux/actions/types';
import { setCurrentCustomer } from 'redux/actions/Customer';
import { getAdminDashboard } from 'redux/actions/Dashboard';




const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '100wh',
    overflowY: 'hidden'
  },
  actionSidebar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '15px 5px',
    width: '100%',
    borderRight: `1px solid ${theme.palette.divider}`,
    overflowY: 'hidden'
  },
  contentArea: {
    width: '100vw',
    overflowY: 'hidden',
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 579,
      overflow: 'hidden',
      height: '100%'

    },
  },
  scrollbarRoot: {
    // height: '100%',
    // margin: 10,
    overflowY: 'hidden'
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
    padding: '5px 15px',
    marginTop: '10px'
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

const ActionBarDrawer = ({ activeOption, action, onIconClick, onDrawerClose, handleClick, ...rest }) => {
  const classes = useStyles();
  const cart = useSelector(({cartApp}) => cartApp);
  const { isAdmin } = useSelector(({auth}) => auth);
  const {business} = useSelector(({dashboard}) => dashboard);
  const [printDirect, setPrintDirect] = useState(false);
  const [voidConfirm, setVoidConfirm] = useState(false);

  const dispatch = useDispatch();

  let order_no = cart && cart.order_no ? cart.order_no : 'ORDER SUMMARY';

  const handlePrint = () => {
    dispatch(setOrderReceipt({...cart, business}, printDirect));
  }

  const handleVoid = () => {
    dispatch(voidOrderId(cart.id))
    .then(() => {
      setVoidConfirm(false);
      dispatch({ 
        type: CLEAR_CART
      });
      localStorage.removeItem('cart')
      dispatch(setCurrentCustomer(null))
      dispatch(getAdminDashboard())
      dispatch({type: SET_DRAWER_OPEN, payload: false});
    })
  }


  return (
    <>
    
    <CmtDrawer variant="temporary" anchor="left" onClose={onDrawerClose} {...rest} style={{overflowY: 'hidden'}}>
      <Box className={clsx(classes.root)}>
               <Box className={classes.contentArea}>
        {/* <IconButton className={classes.iconBtn} onClick={onDrawerClose}>
            <CloseIcon />
          </IconButton> */}
          {(activeOption === 'profile' || activeOption === 'cart') && 
            <Box className={classes.header}>
              <Box display="flex" justifyContent="flex-start" alignItems="center">
        <Box fontSize={20} fontWeight={700}>
            {activeOption === 'profile' && 'My Pofile'}
            {activeOption === 'cart' && order_no}
        </Box>
        {cart && cart.id && isAdmin && cart.order_status !== 'Cancelled' && <IconButton color="secondary" size="small" style={{marginLeft: '10px'}} onClick={() => setVoidConfirm(true)}>
          <BlockIcon fontSize="small"/>
        </IconButton>}
        </Box>
        <Box>
        <Box display="flex" >

        {
        activeOption === 'cart' && cart.order_status !== 'Cancelled' && 
        ['paidSuccess','paidCart','success', 'unpaid', 'viewCart'].includes(action) && 
        <Box display="flex" >
          <AppSwitch label="Print Directly" checked={printDirect} onChange={() => setPrintDirect(!printDirect)} />
          <IconButton onClick={() => handlePrint()}>
                <PrintIcon/>
          </IconButton>
        </Box>
      }
        <IconButton size="small" className={classes.iconBtn} onClick={onDrawerClose}>
            <CloseIcon />
          </IconButton>
          </Box>

          </Box>
      </Box>
      }
          <PerfectScrollbar className={classes.scrollbarRoot}>
            {activeOption === 'notifications' && <Notifications onClose={onDrawerClose}  />}
            {activeOption === 'profile' && <Profile/>}
            {activeOption === 'cart' && <Cart />}
          </PerfectScrollbar>
        </Box>
      </Box>
    </CmtDrawer>
    <ConfirmDialog
        open={voidConfirm}
        title={`Cancelling order # ${cart.order_no}`}
        content={'Are you sure, you want to  cancel this order?'}
        onClose={() => setVoidConfirm(false)}
        onConfirm={handleVoid}
      />

    </>
  );
};

export default ActionBarDrawer;
