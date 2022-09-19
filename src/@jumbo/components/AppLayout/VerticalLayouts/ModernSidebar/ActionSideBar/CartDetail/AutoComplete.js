/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';



//Redux
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCustomer} from '../../../../../../../redux/actions/Customer';
import { SET_CREATE_CUSTOMER_DIALOG } from '../../../../../../../redux/actions/types';



const filter = createFilterOptions();

export default function FreeSoloCreateOptionDialog({
    variant,
    size,
    fullWidth,
    label,
    placeholder,
    margin,
    handleSelect
}) {
    const dispatch = useDispatch();
    const {currentCustomer, customersList }  = useSelector(({customerApp}) => customerApp);



  const handleValue = (data) => {
    handleSelect(data)
  }

  const handleDialogValue = (data) => {
    dispatch(setCurrentCustomer({
    phones:[{phone: '', label: 'home'}],
    tags: [], name: data.name}));
  }



  const toggleOpen = (val) => {
    dispatch({
        type: SET_CREATE_CUSTOMER_DIALOG,
        payload: val
      })
  }



  return (
    <React.Fragment>
      <Autocomplete
        value={currentCustomer}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
              handleDialogValue({
                name: newValue
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            handleDialogValue({
              name: newValue.inputValue,
            });
          } else {
            handleValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              name: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        id="free-solo-dialog-demo"
        options={customersList}
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.name;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(option) => option.name}
        freeSolo
        fullWidth
        renderInput={(params) => (
          <TextField {...params} label={label} placeholder={placeholder} margin={margin} fullWidth={fullWidth} size={size} variant={variant} />
        )}
      />

    </React.Fragment>
  );
}
