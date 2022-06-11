import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import GridContainer from '../../../../../../@jumbo/components/GridContainer';
import Grid from '@material-ui/core/Grid';
import AppTextInput from '../../../../../../@jumbo/components/Common/formElements/AppTextInput';
import CmtAvatar from '../../../../../../@coremat/CmtAvatar';
import { useDropzone } from 'react-dropzone';
import Button from '@material-ui/core/Button';
import CmtList from '../../../../../../@coremat/CmtList';
import IconButton from '@material-ui/core/IconButton';
import AppSelectBox from '../../../../../../@jumbo/components/Common/formElements/AppSelectBox';
import { emailNotValid, requiredMessage } from '../../../../../../@jumbo/constants/ErrorMessages';
import { useDispatch, useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import { isValidEmail } from '../../../../../../@jumbo/utils/commonHelper';
import { addNewUser, updateUser } from '../../../../../../redux/actions/Users';
import { Typography } from '@material-ui/core';

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

function PhoneNumberInput({ onChange, value, ...other }) {
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (!phoneNumber && value) {
      setTimeout(() => {
        setPhoneNumber(value);
      }, 300);
    }
  }, [phoneNumber, value]);

  const onNumberChange = number => {
    setPhoneNumber(number.formattedValue);
    onChange(number.formattedValue);
  };

  return <NumberFormat {...other} onValueChange={onNumberChange} value={phoneNumber} format="(###) ###-####" />;
}

const labels = [
  { title: 'Home', slug: 'home' },
  { title: 'Office', slug: 'office' },
  { title: 'Other', slug: 'other' },
];

const splitName = user => {
  if (user) {
    const [fName, mName, lName] = user.name.split(' ');
    return [fName, lName ? mName + ' ' + lName : mName];
  }

  return ['', ''];
};

const AddEditUser = ({ open, onCloseDialog }) => {
  const classes = useStyles();
  const currentUser = useSelector(({ usersReducer }) => usersReducer.currentUser);

  const [values, setValues] = useState({});

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      // setProfile_pic(URL.createObjectURL(acceptedFiles[0]));
    },
  });

  const dispatch = useDispatch();
  // const isPhonesMultiple = phones.length > 1;

  return (
    <Dialog open={open} onClose={onCloseDialog} className={classes.dialogRoot}>
      <DialogTitle className={classes.dialogTitleRoot}>{currentUser ? 'Edit User Details' : 'Create New User'}</DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
          <Box {...getRootProps()} mr={{ xs: 0, md: 5 }} mb={{ xs: 3, md: 0 }} className="pointer">
            <input {...getInputProps()} />
            <CmtAvatar size={70} 
            // src={profile_pic}
             />
          </Box>
          <GridContainer>
            <Grid item xs={12} sm={6}>
              <AppTextInput
                fullWidth
                variant="outlined"
                label="First name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppTextInput
                fullWidth
                variant="outlined"
                label="Last name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppTextInput
                fullWidth
                variant="outlined"
                label="Gender"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppTextInput
                fullWidth
                variant="outlined"
                label="Birth Year"
              />
            </Grid>
          </GridContainer>
        </Box>
        <Box mb={{ xs: 6, md: 5 }}>
        <GridContainer>
            <Grid item xs={12} sm={12}>
              <AppTextInput
                fullWidth
                variant="outlined"
                label="Home Address"
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <AppTextInput
                fullWidth
                variant="outlined"
                label="Last name"
              />
            </Grid> */}
            <Grid item xs={12} sm={6}>
              <AppTextInput
                fullWidth
                variant="outlined"
                label="Phone"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppTextInput
                fullWidth
                variant="outlined"
                label="Email Address"
              />
            </Grid>
          </GridContainer>
        </Box>
        <br/>
        <Typography align='center'>CREDENTIALS</Typography>
        <hr/>
        <br/>
        {/* <CmtList
          // data={phones}
          renderRow={(item, index) => (
            <GridContainer style={{ marginBottom: 2 }} key={index}>
              <Grid item xs={12} 
              // sm={isPhonesMultiple ? 6 : 8}
              >
                <AppTextInput
                  fullWidth
                  variant="outlined"
                  label="Phone"
                
                  InputProps={{
                    inputComponent: PhoneNumberInput,
                    inputProps: { value: item.phone },
                  }}
                />
              </Grid>
              <Grid item 
              // xs={isPhonesMultiple ? 10 : 12}
               sm={4}
              >
                <AppSelectBox
                  fullWidth
                  data={labels}
                  label="Label"
                  valueKey="slug"
                  variant="outlined"
                  labelKey="title"
                  value={item.label}
                  // onChange={e => onLabelChange(e.target.value, index)}
                />
              </Grid>
              {index > 0 && (
                <Grid container item xs={2} sm={2} justifyContent="center" alignItems="center">
                  <IconButton color="inherit" 
                  // onClick={() => onPhoneRowRemove(index)} 
                  size="small">
                    <CancelIcon />
                  </IconButton>
                </Grid>
              )}
            </GridContainer>
          )}
        /> */}
        {/* <Box mb={{ xs: 6, md: 5 }} display="inline-flex" alignItems="center" className="pointer">
          <Button color="primary" 
          // onClick={onPhoneRowAdd} 
          startIcon={<AddCircleOutlineIcon />}>
            Add More
          </Button>
        </Box> */}
        <GridContainer style={{ marginBottom: 12 }}>
       
          <Grid item xs={12} sm={4}>
            <AppTextInput
              fullWidth
              variant="outlined"
              label="Username"
              // value={company}
              // onChange={e => setCompany(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <AppTextInput
              fullWidth
              variant="outlined"
              label="Username"
              // value={company}
              // onChange={e => setCompany(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <AppTextInput
              fullWidth
              variant="outlined"
              label="Password"
              // value={designation}
              // onChange={e => setDesignation(e.target.value)}
            />
          </Grid>
        </GridContainer>
        <Box display="flex" justifyContent="flex-end" mb={4}>
          <Button 
          onClick={onCloseDialog}
          >Cancel</Button>
          <Box ml={2}>
            <Button variant="contained" color="primary" 
            // onClick={onSubmitClick}
            >
              Save
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditUser;

AddEditUser.prototype = {
  open: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func,
};
