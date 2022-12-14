import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import GridContainer from '../../../../../@jumbo/components/GridContainer';
import Grid from '@material-ui/core/Grid';
import AppTextInput from '../../../../../@jumbo/components/Common/formElements/AppTextInput';
import CmtAvatar from '../../../../../@coremat/CmtAvatar';
import { useDropzone } from 'react-dropzone';
import Button from '@material-ui/core/Button';
import CmtList from '../../../../../@coremat/CmtList';
import IconButton from '@material-ui/core/IconButton';
import AppSelectBox from '../../../../../@jumbo/components/Common/formElements/AppSelectBox';
import { requiredMessage } from '../../../../../@jumbo/constants/ErrorMessages';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { DialogTitle, TextField, InputAdornment } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import { isValidEmail } from '../../../../../@jumbo/utils/commonHelper';

//Icons
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import commonData from 'utils/commonData';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { addNewUser, setCurrentUser, updateUser, uploadFile } from '../../../../../redux/actions/Users';
import { SET_USER_DIALOG, SET_STORE_DIALOG, SET_EXPENSE_DIALOG } from 'redux/actions/types';



const useStyles = makeStyles(theme => ({
  dialogRoot: {
    position: 'relative',
  },
  dialogTitleRoot: {
    '& .MuiTypography-h6': {
      fontSize: 16,
      color: theme.palette.common.dark,
    },
  },
}));


const labels = [
  { title: 'Home', slug: 'home' },
  { title: 'Office', slug: 'office' },
  { title: 'Other', slug: 'other' },
];

const roles = [
  { id: 3, name: 'sales' },
  { id: 2, name: 'admin' },
  { id: 1, name: 'super' },
];

const AddEditUser = ({data}) => {
  const classes = useStyles();
  const { expenseDialog } = useSelector((state) => state.uiReducer);
  const dispatch = useDispatch();
  const [dpUrl, setDpUrl] = useState('');
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = prop => e => {
    setValues({ ...values, [prop]: e.target.value });
    setErrors({ ...errors, [prop]: '' });
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      const formData = new FormData();
      formData.append('file', acceptedFiles[0]);

      dispatch(uploadFile(formData))
        .then(a => {
          setDpUrl(a.url);
          setValues({...values, dpUrl: a.url})
        })
        .catch(err => {
          console.log(err);
        });
    },
  });


  

  const onCloseDialog = () => {
    dispatch({type: SET_EXPENSE_DIALOG, payload: !expenseDialog});
    dispatch(setCurrentUser(null));
  };

  const onClosesDialog = () => {
    dispatch({type: SET_STORE_DIALOG, payload: false});
    dispatch(setCurrentUser(null));
  };



  const onSubmitClick = () => {
    const phoneNumbers = values.contacts.filter(item => item.number.trim());
    if (!values.name) {
      setErrors({ ...errors, name: requiredMessage });
    } else if (!values.email) {
      setErrors({ ...errors, email: requiredMessage });
    } else if (!isValidEmail(values.email)) {
      setErrors({ ...errors, email: 'Invalid Email Address' });
    } 
    // else if (phoneNumbers.length === 0) {
    //   setPhoneError(requiredMessage);
    // } 
    else {
      onUserSave(phoneNumbers);
    }
  };

  const onUserSave = phoneNumbers => {
 
  };

  return (
    <Dialog open={expenseDialog ? true : false} onClose={onClosesDialog} className={classes.dialogRoot}>
      <DialogTitle className={classes.dialogTitleRoot}>{data.id ? 'Edit Details' : 'Create New Record'}</DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
          <Box {...getRootProps()} mr={{ xs: 0, md: 5 }} mb={{ xs: 3, md: 0 }} className="pointer">
            <input {...getInputProps()} />
            <CmtAvatar size={70} src={`${commonData.staticUrl}${dpUrl}`} />
          </Box>
          <GridContainer>
            <Grid item xs={12} sm={12}>
              <AppTextInput
                fullWidth
                variant="outlined"
                label="Full Name"
                value={values.name}
                onChange={handleChange('name')}
                helperText={errors.name}
              />
            </Grid>
          </GridContainer>
        </Box>
        <Box mb={{ xs: 6, md: 5 }}>
          <AppTextInput
            fullWidth
            variant="outlined"
            label="Complete Address"
            value={values.address}
            onChange={handleChange('address')}
            helperText={errors.address}
          />
        </Box>
     
        <Box display="flex" justifyContent="flex-end" mb={4}>
          <Button onClick={onCloseDialog}>Cancel</Button>
          <Box ml={2}>
            <Button variant="contained" color="primary" onClick={onSubmitClick}>
              {data.id ? 'Void' : 'Save'}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditUser;

