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
import { emailNotValid, requiredMessage } from '../../../../../@jumbo/constants/ErrorMessages';
import { createCustomer, onUpdateCustomer } from '../../../../../redux/actions/Customer';
import { useDispatch, useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import { isValidEmail } from '../../../../../@jumbo/utils/commonHelper';

const useStyles = makeStyles(theme => ({
  dialogRoot: {
    position: 'relative',
  },
  dialogTitleRoot: {
    '& .MuiTypography-h6': {
      fontSize: 18,
      color: theme.palette.common.dark,
    },
  },
}));

function NumberFormatCustom({ onChange, value, ...other }) {
  const [phoneNo, setPhone] = useState('');

  useEffect(() => {
    if (!phoneNo && value) {
      setTimeout(() => {
        setPhone(value);
      }, 300);
    }
  }, [phoneNo, value]);

  const onNumberChange = number => {
    setPhone(number.formattedValue);
    onChange(number.formattedValue);
  };

  return <NumberFormat {...other} onValueChange={onNumberChange} value={phoneNo} format="(###) ###-####" />;
}

const CreateCustomer = ({ open, handleDialog }) => {
  const { currentCustomer } = useSelector(({ customer }) => customer);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [values, setValues] = useState(currentCustomer ? currentCustomer : {});
  const [errors, setErrors] = useState({});

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setValues({ ...values, dpUrl: URL.createObjectURL(acceptedFiles[0]) });
    },
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const checkValidations = () => {
    if (!values.firstName) {
      setErrors({ ...errors, firstName: requiredMessage });
    } else if (!values.email_address) {
      setErrors({ ...errors, email_address: requiredMessage });
    } else if (!isValidEmail(values.email_address)) {
      setErrors({ ...errors, email_address: requiredMessage });
    } else if (!values.phone) {
      setErrors({ ...errors, email_address: requiredMessage });
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = phoneNumbers => {
    const customer = {
      ...values,
      fullName: `${values.firstName} ${values.lastName}`,
    };
    if (currentCustomer) {
      dispatch(onUpdateCustomer({ ...currentCustomer, ...customer }));
    } else {
      dispatch(createCustomer(customer));
    }
    handleDialog();
  };

  return (
    <Dialog open={open} onClose={handleDialog} className={classes.dialogRoot}>
      <DialogTitle className={classes.dialogTitleRoot}>
        {currentCustomer ? 'Edit Customer Details' : 'Create New Customer'}
      </DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
          <Box {...getRootProps()} mr={{ xs: 0, md: 5 }} mb={{ xs: 3, md: 0 }} className="pointer">
            <input {...getInputProps()} />
            <CmtAvatar size={70} src={values.dpUrl} />
          </Box>
          <GridContainer>
            <Grid item xs={12} sm={5}>
              <AppTextInput
                fullWidth
                type="number"
                // variant="outlined"
                label="Credit Limit"
                value={values.limit}
                onChange={handleChange('limit')}
              />
            </Grid>
            <Grid item xs={12} sm={7} />
          </GridContainer>
        </Box>
        <GridContainer style={{ marginBottom: 12 }}>
          <Grid item xs={12} sm={6}>
            <AppTextInput
              fullWidth
              variant="outlined"
              value={values.firstName}
              label="First Name"
              onChange={handleChange('firstName')}
              helperText={errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput
              fullWidth
              variant="outlined"
              value={values.lastName}
              label="Last Name"
              onChange={handleChange('lastName')}
              helperText={errors.lastName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput
              fullWidth
              variant="outlined"
              value={values.phone}
              label="Phone #"
              onChange={handleChange('phone')}
              helperText={errors.phone}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput
              fullWidth
              variant="outlined"
              value={values.email_address}
              label="Email Address"
              onChange={handleChange('email_address')}
              helperText={errors.email_address}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <AppTextInput
              fullWidth
              variant="outlined"
              value={values.address}
              label="Home Address"
              onChange={handleChange('address')}
              helperText={errors.address}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <AppTextInput
              fullWidth
              value={values.notes}
              label="Other Details"
              onChange={handleChange('notes')}
              helperText={errors.notes}
            />
          </Grid>
        </GridContainer>
        <Box display="flex" justifyContent="flex-end" mb={4}>
          <Button onClick={handleDialog}>Cancel</Button>
          <Box ml={2}>
            <Button variant="contained" color="primary" onClick={checkValidations}>
              Save
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCustomer;

CreateCustomer.prototype = {
  open: PropTypes.bool.isRequired,
  handleDialog: PropTypes.func,
  selectedCustomer: PropTypes.object,
};

CreateCustomer.defaultProps = {
  selectedCustomer: null,
};
