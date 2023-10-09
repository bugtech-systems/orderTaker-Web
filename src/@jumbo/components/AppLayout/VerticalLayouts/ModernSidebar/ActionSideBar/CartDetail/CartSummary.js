import React, { useState, useEffect } from 'react';
import GridContainer from '../../../../../GridContainer';
import { Box, Divider, IconButton, makeStyles, Typography, Checkbox, Menu, MenuItem, Grid } from '@material-ui/core';
import AppTextInput from '../../../../../Common/formElements/AppTextInput';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { alpha } from '@material-ui/core/styles';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { getCustomers, setCurrentCustomer } from '../../../../../../../redux/actions/Customer';
import { handleCart } from '../../../../../../../redux/actions/CartApp';
import { SET_CREATE_CUSTOMER_DIALOG, UPDATE_CART } from '../../../../../../../redux/actions/types';


//Icons
import SearchIcon from '@material-ui/icons/Search';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CancelIcon from '@material-ui/icons/Cancel';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';


const useStyles = makeStyles(theme => ({
  rootWrap: {
    width: '100%',
    flexGrow: 1
    // overflowY: 'scroll',
    // overflowX: 'hidden',
    // maxHeight: '90vh',
    // paddingBottom: '100px',
    // padding: '10px',
    // paddingRight: '20px'
  },
  cardRoot: {
    position: 'relative',
    '& .Cmt-card-content': {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  divider: {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
  scrollbarRoot: {
    marginRight: 10,
    maxHeight: '75vh',
    overflow: 'hidden',
    paddingBottom: 50,
    // paddingBottom: 50,
    // marginBottom: 100,
    [theme.breakpoints.up('sm')]: {
      maxHeight: '75vh',
      overflow: 'hidden',
      // paddingBottom: 50
    },
  },
  chipRoot: {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    color: theme.palette.primary.main,
    letterSpacing: 0.25,
    fontSize: 14,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    // alignItems: 'center',
    marginBottom: 10,
  },
  sectionCustomer: {
    paddingRight: 5,
    paddingLeft: 5,
    // display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    fontSize: 12,
    color: theme.palette.text.secondary,
    minHeight: '20px'
  },
  sectionHeading: {
    fontSize: 14,
    color: theme.palette.text.secondary,
    textTransform: 'uppercase',
    paddingRight: 5,
    paddingLeft: 5,
    marginBottom: 10
  },
  sectionTotal: {
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 12,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    color: theme.palette.text.secondary,
    // minHeight: '10px'
  },
  cartButton: {
    position: 'absolute',
    width: '100%',
    bottom: 50,
    // marginBottom: 50,
    zIndex: 1000,
    color: theme.palette.text.secondary,
    textTransform: 'uppercase',
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      bottom: 80,
    },
  },
  labelRoot: {
    backgroundColor: alpha(theme.palette.common.dark, 0.05),
    color: theme.palette.text.disabled,
    padding: '4px 10px',
    borderRadius: 4,
    textTransform: 'capitalize',
  },
  label: {
    backgroundColor: alpha(theme.palette.common.dark, 0.05),
    fontSize: 10,
    marginRight: '10px',
    width: '100%',
    margin: 1,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.common.dark,
    [theme.breakpoints.up('md')]: {
      fontSize: 12
    }
  },
  titleRoot: {
    fontSize: 11,
    marginLeft: '10px',
    paddingTop: 0.5,
    color: theme.palette.common.dark,
    fontWeight: theme.typography.fontWeightBold,
    [theme.breakpoints.up('md')]: {
      fontSize: 13
    },
  },
  subTitleRoot: {
    fontSize: 12,
    color: theme.palette.text.secondary,
  },
  btnWrap: {
    '&:hover': {
      '& $btnTax': {
        display: 'flex',
        visibility: 'visible',
        opacity: 1,
      },
      '& $btnCharge': {
        display: 'flex',
        visibility: 'visible',
        opacity: 1,
      },
      '& $btnDiscount': {
        display: 'flex',
        visibility: 'visible',
        opacity: 1,
      },
      '& $closeButton': {
        display: 'flex',
        visibility: 'visible',
        opacity: 1,
      }
    }
  },
  closeButton: {
    position: 'relative',
    // right: '15px',
    color: theme.palette.text.secondary,
    // display: 'none'
  },
  btnTax: {
    display: 'none',
    cursor: 'pointer'
  },
  btnTD: {
    cursor: 'pointer'
  },
  btnCharge: {
    display: 'none',
    cursor: 'pointer'
  },
  btnDiscount: {
    display: 'none',
    cursor: 'pointer'
  },
  userInfoRoot: {
    borderBottom: `1px solid ${theme.palette.borderColor.main}`,
    padding: '20px 24px',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row'
    }
  },
}));

const Comments = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { currentCustomer } = useSelector(({ customerApp }) => customerApp);
  const { productsList } = useSelector(({ productApp }) => productApp);
  const { action } = useSelector(({ uiReducer }) => uiReducer);

  const cart = useSelector(({ cartApp }) => cartApp);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const [addOA, setAddOa] = useState(null);
  const [oaValue, setOaValue] = useState({
    value: 0,
    type: '',
    name: '',
    amount_type: 'rate',
    isCart: true
  });

  let { gross_total, amount_due, tax_disc, other_amounts } = (action === 'viewCart' || action === 'paidCart') ? { ...cart, ...cart?.cartItem } : cart;


  const handleClickOA = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleCloseOA = () => {
    setAnchorEl(null);
  }

  /* const handlePayment = (val, type) => {

    if (type === 'payment') {
      if (val >= 0) {
        dispatch({ type: UPDATE_CART, payload: { payment: val } })
      }

      if (Number(amount_due) < Number(val)) {
        dispatch({ type: UPDATE_CART, payload: { change: val - amount_due } })
      }

      if (Number(amount_due) >= Number(val)) {
        dispatch({ type: UPDATE_CART, payload: { change: 0 } })
      }

    } else {
      dispatch({ type: UPDATE_CART, payload: { change: val } })
    }


  }
 */


  const handleOaValue = prop => event => {
    setOaValue({ ...oaValue, [prop]: event.target.value })
  }

  const handleOaAdd = prop => {
    let id = Math.random();

    setAddOa(prop);
    setOaValue({
      id,
      type: prop,
      amount_type: 'rate',
      value: 0,
      name: '',
      isCart: true
    })
  }

  const handleOaRemove = prop => {
    let ind = other_amounts.filter(a => a.id !== prop);
    dispatch(handleCart({ ...cart, other_amounts: ind }))

  }

  const handleOaClose = prop => {
    setAddOa(null);
    setOaValue({
      type: '',
      amount_type: 'rate',
      value: 0,
      name: '',
      isCart: true
    })
  }

  const handleOaSave = () => {
    let oa = other_amounts;
    oa.push({ ...oaValue, type: addOA });
    dispatch(handleCart({ ...cart, other_amounts: oa }))
    handleOaClose()
  }


  useEffect(() => {
    dispatch(getCustomers());
  }, []);

  useEffect(() => {
    if (currentCustomer && isSearch) {
      setIsSearch(false);
    }
  }, [currentCustomer]);


  useEffect(() => {
    if (currentCustomer && isSearch) {
      setIsSearch(false);
    }
  }, [productsList]);



  const getTaxes = tax_disc.filter(a => a.type === 'tax').map((a, index) => {
    return (
      <GridContainer key={index} >
        <Grid item xs={8} lg={8}>
          <Typography variant="h4" style={{ fontWeight: 'bolder' }}>
            {a.description}
          </Typography>
        </Grid>
        <Grid item xs={2} lg={2} >
          <Box display="flex" alignItems="flex-start" justifyContent="flex-end">
            <Typography variant="h4" style={{ fontWeight: 'bolder' }}>
              {Number(a.total).toFixed(2)}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={2} lg={2}>
        </Grid>
      </GridContainer>
    )
  })

  const getCharges = tax_disc.filter(a => a.type === 'charges').map((a, index) => {
    return (
      <GridContainer key={index} >
        <Grid item xs={8} lg={8}>
          <Box display="flex" alignItems="center" justifyContent="flex-start">
            {(action !== 'viewCart' && action !== 'paidCart') && a.isCart && <IconButton size="small"
              style={{ marginRight: 3 }}
              className={classes.closeButton1}
              onClick={() => handleOaRemove(a.id)}
            >
              <CancelIcon fontSize="small" />
            </IconButton>}
            <Typography variant="h4" style={{ fontWeight: 'bolder' }}>
              {a.description}
            </Typography>
          </Box>

        </Grid>
        <Grid item xs={2} lg={2} >
          {/* <Box display="flex" alignItems="center" justifyContent="center">
        <Typography variant="h5" style={{fontWeight: 'bolder'}}> */}
          {/* {a.total} */}
          {/* Add: */}
          {/* </Typography> */}
          {/* </Box> */}
        </Grid>
        <Grid item xs={2} lg={2}>
          <Box display="flex" alignItems="flex-start" justifyContent="flex-start">
            <Typography variant="h4" style={{ fontWeight: 'bolder' }}>
              {Number(a.total).toFixed(2)}
            </Typography>
          </Box>
        </Grid>
      </GridContainer>
    )
  })

  const getDiscounts = tax_disc.filter(a => a.type === 'discounts').map((a, index) => {
    return (
      <GridContainer key={index} >
        <Grid item xs={8} lg={8}>
          <Box display="flex" alignItems="center" justifyContent="flex-start">
            {(action !== 'viewCart' && a.isCart) && <IconButton size="small"
              //  style={{marginRight: 3}}
              className={classes.closeButton1}
              onClick={() => handleOaRemove(a.id)}
            >
              <CancelIcon fontSize="small" />
            </IconButton>}
            <Typography variant="h4" style={{ fontWeight: 'bolder' }}>
              {a.description}
            </Typography>
          </Box>

        </Grid>
        <Grid item xs={2} lg={2} >
          {/* <Box display="flex" alignItems="center" justifyContent="center">
        <Typography variant="h4" style={{fontWeight: 'bolder'}}> */}
          {/* {a.total} */}
          {/* Less: */}
          {/* </Typography>
        </Box> */}
        </Grid>
        <Grid item xs={2} lg={2}>
          <Box display="flex" alignItems="flex-start" justifyContent="flex-start">
            <Typography variant="h4" style={{ fontWeight: 'bolder' }}>
              ({Number(a.total).toFixed(2)})
            </Typography>
          </Box>
        </Grid>
      </GridContainer>

    )
  })




  let hasDiscounts = tax_disc.filter(a => a.type === 'discounts').length !== 0 ? true : false;


  let hasCharges = tax_disc.filter(a => a.type === 'charges').length !== 0 ? true : false;




  return (
    <Box pr={5} pl={3} className={classes.rootWrap}>
      <Divider />
      <Box mt={3} mr={2} className={classes.sectionTotal}>
        {/* <Box sx={{pr: 10 }} display="flex" flexDirection="column" flexGrow={1}>
        </Box> */}
        <Box style={{ marginTop: 5 }}>
          <GridContainer >
            <Grid item xs={8} lg={8}>
              <Typography variant="h3" style={{ fontWeight: 'bolder' }}>
                SUBTOTAL
              </Typography>
            </Grid>
            <Grid item xs={2} lg={2} >
              <Box display="flex" alignItems="flex-start" justifyContent="center">
                <Typography variant="h3" style={{ fontWeight: 'bolder' }}>

                </Typography>
              </Box>
            </Grid>
            <Grid item xs={2} lg={2}>
              <Box display="flex" alignItems="flex-start" justifyContent="flex-start">
                <Typography variant="h3" style={{ fontWeight: 'bolder' }}>
                  {gross_total}
                </Typography>
              </Box>
            </Grid>
          </GridContainer>
          {/* <Divider style={{margin: 5}}/>
        <GridContainer style={{paddingRight: 5, paddingLeft: 5}}  >
        <Grid item xs={8} lg={8}>
        <Typography variant="h4" style={{fontWeight: 'bolder'}}>
            Total Vatable Sales
            </Typography>
        </Grid>
        <Grid item xs={2} lg={2} >
          <Box display="flex" alignItems="flex-start" justifyContent="flex-end">
          <Typography variant="h4" style={{fontWeight: 'bolder'}}>
          {total_vatable}
            </Typography>
          </Box>
          </Grid>
          <Grid item xs={2} lg={2}>
          </Grid>
        </GridContainer> */}
          {getTaxes}
          <Box className={classes.btnWrap}>

            {/* <Divider style={{margin: 5}}/> */}
            {/* <GridContainer >
              <Grid item xs={8} lg={8}>
              <Box display="flex" alignItems="flex-start" justifyContent="flex-start">
                <Typography variant="h5" style={{fontWeight: 'bolder'}}>
                Total Sales {hasTaxes ? '(Vat Inclusive)' : ''}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={2} lg={2} >
                </Grid>
                <Grid item xs={2} lg={2}>
                <Box display="flex" alignItems="flex-start" justifyContent="flex-start">
                <Typography variant="h4" style={{fontWeight: 'bolder'}}>
                {gross_total}
                  </Typography>
                </Box>
                </Grid>
            </GridContainer> */}
            {getDiscounts}
            {getCharges}
            <Box className={classes.btnWrap}>
              {addOA === 'discounts' ? (
                <Box m={1} display="flex" alignItems="center" justifyContent="space-between" >
                  <Box style={{ flexGrow: 1 }}>
                    <IconButton size="small"
                      style={{ marginRight: 3 }}
                      className={classes.closeButton1}
                      onClick={() => handleOaClose()}
                    >
                      <CancelIcon fontSize="small" />
                    </IconButton>
                    <AppTextInput
                      fullWidth
                      variant="outlined"
                      label="Name"
                      value={oaValue.name}
                      onChange={handleOaValue('name')}
                      style={{ width: '200px' }}
                    />
                  </Box>
                  <Box >

                    <IconButton size='small' aria-controls="simple-menu" aria-haspopup="true"
                      onClick={handleClickOA}
                    >
                      <MoreVertIcon fontSize='small' />
                    </IconButton>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleCloseOA}
                    >
                      <MenuItem
                        onClick={(e) => {
                          setOaValue({ ...oaValue, amount_type: 'rate' })
                          handleCloseOA()
                        }}
                      >Rate</MenuItem>
                      <MenuItem
                        onClick={(e) => {
                          handleCloseOA()
                          setOaValue({ ...oaValue, amount_type: 'amount' })
                        }}
                      >Amount</MenuItem>
                    </Menu>
                    <AppTextInput
                      fullWidth
                      type="number"
                      variant="outlined"
                      label={oaValue.amount_type}
                      value={oaValue.value}
                      onChange={handleOaValue('value')}
                      style={{ width: '100px' }}
                      className={classes.textInput}
                    />
                  </Box>
                  <IconButton
                    size="small"
                    className={classes.closeButton}
                    onClick={() => handleOaSave()}
                  >
                    <DoneOutlineIcon style={{ color: "green" }} fontSize="small" />
                  </IconButton>
                </Box>

              ) : action === 'cart' &&
              <Box m={1} display="flex" alignItems="flex-start" >
                <Box
                  display="flex"
                  alignItems="center"
                  onClick={() => handleOaAdd('discounts')}
                  className={hasDiscounts ? classes.btnTax : classes.btnTD}
                  color="secondary.main">
                  <RemoveCircleOutlineIcon />
                  <Box ml={2}>Less Discounts</Box>
                </Box>

              </Box>}
              {addOA === 'charges' ? (
                <Box m={1} display="flex" alignItems="center" justifyContent="space-between" >
                  <Box style={{ flexGrow: 1 }}>
                    <IconButton size="small"
                      style={{ marginRight: 3 }}
                      className={classes.closeButton1}
                      onClick={() => handleOaClose()}
                    >
                      <CancelIcon fontSize="small" />
                    </IconButton>
                    <AppTextInput
                      fullWidth
                      variant="outlined"
                      label="Name"
                      value={oaValue.name}
                      onChange={handleOaValue('name')}
                      style={{ width: '200px' }}
                    />
                  </Box>
                  <Box >

                    <IconButton size='small' aria-controls="simple-menu" aria-haspopup="true"
                      onClick={handleClickOA}
                    >
                      <MoreVertIcon fontSize='small' />
                    </IconButton>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleCloseOA}
                    >
                      <MenuItem
                        onClick={(e) => {
                          setOaValue({ ...oaValue, amount_type: 'rate' })
                          handleCloseOA()
                        }}
                      >Rate</MenuItem>
                      <MenuItem
                        onClick={(e) => {
                          handleCloseOA()
                          setOaValue({ ...oaValue, amount_type: 'amount' })
                        }}
                      >Amount</MenuItem>
                    </Menu>
                    <AppTextInput
                      fullWidth
                      type="number"
                      variant="outlined"
                      label={oaValue.amount_type}
                      value={oaValue.value}
                      onChange={handleOaValue('value')}
                      style={{ width: '100px' }}
                      className={classes.textInput}
                    />
                  </Box>
                  <IconButton
                    size="small"
                    className={classes.closeButton}
                    onClick={() => handleOaSave()}
                  >
                    <DoneOutlineIcon style={{ color: "green" }} fontSize="small" />
                  </IconButton>
                </Box>

              ) : action === 'cart' &&
              <Box m={1} display="flex" alignItems="flex-start" >
                <Box
                  display="flex"
                  alignItems="center"
                  onClick={() => handleOaAdd('charges')}
                  className={hasCharges ? classes.btnTax : classes.btnTD}
                  color="primary.main">
                  <AddCircleOutlineIcon />
                  <Box ml={2}>Add Other Charges</Box>
                </Box>
              </Box>}
              <GridContainer style={{ paddingRight: 5, paddingLeft: 5 }}  >
                <Grid item xs={8} lg={8}>
                  <Box display="flex">
                    {/* <Typography variant="h5" style={{fontWeight: 'bolder'}}>
                Total Sales (Vat Inclusive)
                  </Typography> */}
                  </Box>
                </Grid>
                <Grid item xs={2} lg={2} >
                </Grid>
                <Grid item xs={2} lg={2}>
                  <Box display="flex" alignItems="flex-start" justifyContent="center">

                  </Box>
                </Grid>
              </GridContainer>

            </Box>
          </Box>




          <Divider style={{ margin: 5 }} />
          <GridContainer style={{ padding: 5 }} >
            <Grid item xs={8} lg={8}>
              <Typography variant="h3" style={{ fontWeight: 'bolder' }}>
                AMOUNT DUE
              </Typography>
            </Grid>
            <Grid item xs={2} lg={2} >
              <Box display="flex" alignItems="flex-start" justifyContent="center">
                <Typography variant="h3" style={{ fontWeight: 'bolder' }}>

                </Typography>
              </Box>
            </Grid>
            <Grid item xs={2} lg={2}>
              <Box display="flex" alignItems="flex-start" justifyContent="flex-start">
                <Typography variant="h3" color='primary' style={{ fontWeight: 'bolder' }}>
                  {amount_due}
                </Typography>
              </Box>
            </Grid>
          </GridContainer>

        </Box>
      </Box>
    </Box>
  );
};

export default Comments;

