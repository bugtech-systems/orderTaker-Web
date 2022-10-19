/* eslint-disable no-use-before-define */
import React, { useEffect,} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box } from '@material-ui/core';

// ISO 3166-1 alpha-2
// ⚠️ No support for IE 11
// Reduxt
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_ALL_PRODUCTS } from 'redux/actions/types';
import {  getAllProducts } from 'redux/actions/ProductApp';

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 15,
    },
  },
});

export default function CountrySelect({value, handleSelect}) {
  const classes = useStyles();
  const { allProducts }  = useSelector(({productApp}) => productApp);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getAllProducts())
    return () => {
      dispatch({type: CLEAR_ALL_PRODUCTS})
    }
  }, [dispatch])

  return (
    <Autocomplete
      id="option-select-demo"
      options={allProducts}
      value={value}
      classes={{
        option: classes.option,
      }}
      onChange={(event, newValue) => {
        handleSelect(newValue)
      }}
      autoHighlight
      size="small"
      getOptionLabel={(option) => option.name}
      renderOption={(option) => (
            <Box width="100%" display="flex" alignItems="flex-end" justifyContent="space-between">
         <Typography >{option.name} </Typography> 
           <Box display="flex" alignItems="flex-start" justifyContent="center">
            <Box mr={3} mt={1} style={{width: '30px'}} display="flex" alignItems="center" justifyContent="flex-end">
           <Typography  variant="caption" style={{ fontSize: "10px"}}>({option.stocks})</Typography>
           </Box>
           <Box mb={1} style={{width: '70px'}}  display="flex" alignItems="center" justifyContent="flex-start">
           <Typography   variant="caption">₱{option.price}/<i style={{fontSize: '11px'}}>{option.uom}</i></Typography>
           </Box>
            </Box>
            </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a product"
          variant="outlined"
          size="small"
          margin="dense"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}
