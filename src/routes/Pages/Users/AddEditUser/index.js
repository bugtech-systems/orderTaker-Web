import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import Grid from '@material-ui/core/Grid';
import AppTextInput from '../../../../@jumbo/components/Common/formElements/AppTextInput';
import CmtAvatar from '../../../../@coremat/CmtAvatar';
import { useDropzone } from 'react-dropzone';
import Button from '@material-ui/core/Button';
import CmtList from '../../../../@coremat/CmtList';
import IconButton from '@material-ui/core/IconButton';
import AppSelectBox from '../../../../@jumbo/components/Common/formElements/AppSelectBox';
import { requiredMessage } from '../../../../@jumbo/constants/ErrorMessages';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { DialogTitle, TextField, InputAdornment } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import { isValidEmail } from '../../../../@jumbo/utils/commonHelper';

//Icons
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import commonData from 'utils/commonData';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { addNewUser, setCurrentUser, updateUser, uploadFile } from '../../../../redux/actions/Users';
import { SET_USER_DIALOG, SET_STORE_DIALOG } from 'redux/actions/types';



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

const AddEditUser = () => {
  const classes = useStyles();
  const { userDialog } = useSelector((state) => state.uiReducer);
  const dispatch = useDispatch();
  const currentUser = useSelector(({ usersReducer }) => usersReducer.currentUser);
  const [visible, setVisible] = useState(false);
  const [dpUrl, setDpUrl] = useState('');

  const [phoneError, setPhoneError] = useState('');

  const [values, setValues] = useState({
    contacts: [{number: '', label: 'home'}],
  });
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


  const onAddPhoneRow = () => {
    setValues({
      ...values,
      contacts:  values.contacts.concat({ number: '', label: 'home' }),
    });
  };

  const onRemovePhoneRow = index => {
    const updatedList = [...values.contacts];
    updatedList.splice(index, 1);
    setValues({ ...values, contacts:  updatedList });
  };

  const onAddPhoneNo = (number, index) => {
    const updatedList = [...values.contacts];
    if(number.target.value.length < 12){
      updatedList[index].number = number.target.value;
    }


    setValues({ ...values, contacts:  updatedList });
    setErrors({ ...errors, contacts:  '' });
  };

  const onSelectLabel = (value, index) => {
    const updatedList = [...values.contacts];
    updatedList[index].label = value;
    setValues({ ...values, contacts:  updatedList });
  };



  const onCloseDialog = () => {
    dispatch({type: SET_USER_DIALOG, payload: false});
    dispatch(setCurrentUser(null));
  };

  const onClosesDialog = () => {
    dispatch({type: SET_STORE_DIALOG, payload: false});
    dispatch(setCurrentUser(null));
  };

  useEffect(() => {
    if (currentUser) {
      setValues({ contacts: [{number: '', label: 'home'}], ...currentUser, roles: currentUser.roles[0].name,  });
      setDpUrl(currentUser.dpUrl);
      // setPhones(currentUser.phones);
    } else {
      setValues({
        contacts: [{number: '', label: 'home'}]
      })
      setDpUrl(null)
    }
  }, [currentUser]);


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
    const userDetail = {
      ...values,
      dpUrl
      // phones: phoneNumbers,
    };

    if (currentUser && currentUser.id) {
      dispatch(
        updateUser({ ...currentUser, ...userDetail }, a => {
          dispatch(setCurrentUser(null))
          setValues({
            contacts: [{number: '', label: 'home'}],
          })
          onCloseDialog();
        }),
      );
    } else {
      dispatch(
        addNewUser(userDetail, a => {
          dispatch(setCurrentUser(null))
          setValues({
            contacts: [{number: '', label: 'home'}],
          })
          onCloseDialog();
        }),
      );
    }
  };

  const isPhonesMultiple = values.contacts.length > 1;

  return (
    <Dialog open={userDialog ? true : false} onClose={onClosesDialog} className={classes.dialogRoot}>
      <DialogTitle className={classes.dialogTitleRoot}>{currentUser ? 'Edit User Details' : 'Create New User'}</DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
          <Box {...getRootProps()} mr={{ xs: 0, md: 5 }} mb={{ xs: 3, md: 0 }} className="pointer">
            <input {...getInputProps()} />
            <CmtAvatar size={70} src={`${commonData.staticUrl}${values.dpUrl}`} />
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

        {/* //PHONES INPUT */}
        <CmtList
          data={values.contacts}
          renderRow={(item, index) => (
            <GridContainer style={{ marginBottom: 12 }} key={index}>
              <Grid item xs={12} sm={isPhonesMultiple ? 6 : 8}>
                <AppTextInput
                  fullWidth
                  variant="outlined"
                  label="Number"
                  value={item.number}
                  onChange={number => onAddPhoneNo(number, index)}
                  helperText={errors.contacts}
                  // InputProps={{
                  //   inputComponent: NumberFormatCustom,
                  // }}
                  
                />
              </Grid>
              <Grid item xs={isPhonesMultiple ? 9 : 12} sm={4}>
                <AppSelectBox
                  fullWidth
                  data={labels}
                  label="Label"
                  valueKey="slug"
                  variant="outlined"
                  labelKey="title"
                  value={item.label}
                  onChange={e => onSelectLabel(e.target.value, index)}
                />
              </Grid>
              {isPhonesMultiple && (
                <Grid item xs={3} sm={2}>
                  <IconButton onClick={() => onRemovePhoneRow(index)}>
                    <CancelIcon />
                  </IconButton>
                </Grid>
              )}
            </GridContainer>
          )}
        />

        <Box
          mb={{ xs: 6, md: 5 }}
          display="flex"
          alignItems="center"
          onClick={onAddPhoneRow}
          className="pointer"
          color="primary.main">
          <AddCircleOutlineIcon />
          <Box ml={2}>Add More</Box>
        </Box>

        <GridContainer style={{ marginBottom: 12 }}>
          <Grid item xs={12} sm={8}>
            <AppTextInput
              fullWidth
              variant="outlined"
              label="Email Address"
              value={values.email}
              onChange={handleChange('email')}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              id="role"
              select
              label="Role"
              disabled={values.roles === 'super'}
              value={values.roles}
              onChange={e => {
                setValues({ ...values, roles: e.target.value });
              }}
              SelectProps={{
                native: true,
              }}
              variant="outlined"
              size="small">
              {/* <option value="">
              
            </option> */}
              {roles.map((option, index) => (
                <option key={index} value={option.name} disabled={option.name === 'super'}>
                  {String(option.name).toUpperCase()}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={12}>
            <AppTextInput
              fullWidth
              type={visible ? 'text' : 'password'}
              variant="outlined"
              label="Password"
              value={values.password}
              onChange={handleChange('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setVisible(!visible)}>
                      {visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </GridContainer>
        <Box display="flex" justifyContent="flex-end" mb={4}>
          <Button onClick={onCloseDialog}>Cancel</Button>
          <Box ml={2}>
            <Button variant="contained" color="primary" onClick={onSubmitClick}>
              {currentUser ? 'Update' : 'Save'}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditUser;

