import React from 'react'
import { Box, Hidden, IconButton, Tooltip, Button } from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';

//Redux
import { useSelector, useDispatch } from 'react-redux';


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




export default function CartFooter({cartAction, handleClick}) {
    const classes = useStyles();
    const { cart_items } = useSelector(({cartApp}) => cartApp);
  return (
    <>
    <Box className={classes.cartButton}>
    <Button variant="contained" color="default" onClick={() => handleClick('back')}>
        {cartAction === 'cartItems' ? 'Clear Cart' : cartAction === 'summary' && 'Back'}
        </Button>
    <Button variant="contained" color="primary" onClick={() => handleClick('submit')}  disabled={cartAction === 'cartItems' && cart_items.length === 0}>
    {cartAction === 'cartItems' ? 'Next' : cartAction === 'summary' && 'Checkout'}
    </Button>
    </Box>
    </>
  )
}
