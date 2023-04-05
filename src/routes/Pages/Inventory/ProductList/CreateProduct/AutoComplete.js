/* eslint-disable no-use-before-define */
import React from 'react';
import { TextField, Box, IconButton, Menu, MenuItem,} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

//Icons
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import CancelIcon from '@material-ui/icons/Cancel';


const filter = createFilterOptions();

export default function FreeSoloCreateOptionDialog({value, setDialogValue, options = [], handleChange, size, label, variant }) {



  return (
    <React.Fragment>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {

          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              setDialogValue({
                name: newValue
              });
            });
          } else if (newValue && newValue.inputValue) {
            setDialogValue({
              name: newValue.inputValue
            });
          } else {
            if(newValue){
              handleChange(newValue);
            }
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
        id="free-solo"
        options={options}
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
        // clearOnBlur
        // handleHomeEndKeys
        renderOption={(option) => option.name ?  `${option.name} ${option.value ? ` - ${option.value}${option.amount_type === 'rate' ? '%' : ''}` : ''}` : option.name}
        freeSolo
        fullWidth
        renderInput={(params) => (
          <TextField {...params} label={label} size={size} fullWidth variant={variant} />
        )}
      />
    </React.Fragment>
  );
}


