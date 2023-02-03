/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';



//Redux
import { useDispatch, useSelector } from 'react-redux';
import { getCustomers, setCurrentCustomer} from '../../../../../../../redux/actions/Customer';
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
  const [searchTerm, setSearchTerm] = useState('');



  const handleValue = (data) => {
    handleSelect(data)
  }

  const handleDialogValue = (data) => {
    dispatch(setCurrentCustomer({
    phones:[{phone: '', label: 'home'}],
    tags: [], name: data.name}));
  }

  const handleChange = (e) => {


    dispatch(getCustomers({searchText: e, page: 0 }))
  }

 

  const toggleOpen = (val) => {
    dispatch({
        type: SET_CREATE_CUSTOMER_DIALOG,
        payload: val
      })
  }

  
  const handleSubmit = (e) => {
    e.preventDefault();

 
  }





  return (
    <React.Fragment>
         <form
      onSubmit={handleSubmit}
    >
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
          <TextField {...params} label={label} placeholder={placeholder} margin={margin} fullWidth={fullWidth} size={size} variant={variant} 
          onChange={(e) => {
            handleChange(e.target.value)
            }}
             />
        )}
      />
</form>
    </React.Fragment>
  );
}
