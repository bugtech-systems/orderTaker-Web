import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import GridContainer from '../../../../../../@jumbo/components/GridContainer';
import Grid from '@material-ui/core/Grid';
import AppTextInput from '../../../../../../@jumbo/components/Common/formElements/AppTextInput';
import CmtImage from '../../../../../../@coremat/CmtImage';
import { useDropzone } from 'react-dropzone';
import Button from '@material-ui/core/Button';
import CmtList from '../../../../../../@coremat/CmtList';
import IconButton from '@material-ui/core/IconButton';
import AppSelectBox from '../../../../../../@jumbo/components/Common/formElements/AppSelectBox';
import { requiredMessage } from '../../../../../../@jumbo/constants/ErrorMessages';
import { createCustomer, onUpdateCustomer, setCurrentCustomer } from '../../../../../../redux/actions/Customer';
import { useDispatch, useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import { isValidEmail } from '../../../../../../@jumbo/utils/commonHelper';
import { uploadFile } from '../../../../../../redux/actions/Users';
import { SET_CREATE_CUSTOMER_DIALOG, UPDATE_CART } from 'redux/actions/types';
import commonData from 'utils/commonData';
import { updateStoreDetails } from 'redux/actions/Dashboard';



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

  return <NumberFormat {...other} 
  onValueChange={onNumberChange} value={phoneNo} format="(###) ###-####"  />;
}

const labels = [
  { title: 'Home', slug: 'home' },
  { title: 'Office', slug: 'office' },
  { title: 'Other', slug: 'other' },
];

const EditStore = ({ open, handleDialog, store }) => {

  console.log(store)

  const dispatch = useDispatch();
  const classes = useStyles();
  const [values, setValues] = useState({ 
    contacts: [{number: '', label: 'home'}],
  });
  const [errors, setErrors] = useState({});

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);

      dispatch(uploadFile(formData)).then(a => {
        setValues({...values, dpUrl: a.url})
      })
      .catch(err => {
        console.log(err)
      })
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
    console.log(number.target.value)
    console.log(number.target.value.length < 12)
    const updatedList = [...values.contacts];
    if(number.target.value.length < 12){
      updatedList[index].number = number.target.value;
    }
    console.log(updatedList)
    setValues({ ...values, contacts:  updatedList });
    setErrors({ ...errors, contacts:  '' });
  };

  const onSelectLabel = (value, index) => {
    const updatedList = [...values.contacts];
    updatedList[index].label = value;
    setValues({ ...values, contacts:  updatedList });
  };

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
    setErrors({ ...errors, [prop]: '' });
  };


  const checkValidations = () => {
    const phoneNumbers = values.contacts.filter(item => item.number.trim());
    if (!values.name) {
      setErrors({ ...errors, name: requiredMessage });
    } else if (!values.email) {
      setErrors({ ...errors, email: requiredMessage });
    } else if (!isValidEmail(values.email)) {
      setErrors({ ...errors, email: requiredMessage });
    } else {
      handleSubmit(phoneNumbers);
    }
  };

  const handleSubmit = phoneNumbers => {
    const business = {
      ...values,
      contacts:  phoneNumbers,
    };

    dispatch(updateStoreDetails(business))
      handleDialog(false);
  };


  useEffect(() => {
    if(store){
      setValues({...values, ...store})
    } else {
      setValues({
        contacts: [{number: '', label: 'home'}],
      })
    }
  }, [store])



  const isPhonesMultiple = values.contacts.length > 1;


  return (
    <Dialog open={open} onClose={() => handleDialog(false)} className={classes.dialogRoot}>
      <DialogTitle className={classes.dialogTitleRoot}>
       Edit Store Details
      </DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
          <Box {...getRootProps()} mr={{ xs: 0, md: 5 }} mb={{ xs: 3, md: 0 }} className="pointer">
            <input {...getInputProps()} />
            <CmtImage src={`${commonData.staticUrl}${values.dpUrl}`} height={80} width={80} alt={values.name} />

          </Box>
          <GridContainer>
            <Grid item xs={12} sm={12}>
              <AppTextInput
                fullWidth
                variant="outlined"
                value={values.name}
                label="Store Name"
                onChange={handleChange('name')}
                helperText={errors.name}
              />
            </Grid>
            {/* <Grid item xs={12} sm={7} /> */}
          </GridContainer>
        </Box>
        <GridContainer style={{ marginBottom: 12 }}>
          <Grid item xs={12} sm={12}>
            <AppTextInput
              fullWidth
              variant="outlined"
              value={values.email}
              label="Email Address"
              onChange={handleChange('email')}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <AppTextInput
              fullWidth
              variant="outlined"
              value={values.address}
              label="Store Address"
              onChange={handleChange('address')}
              helperText={errors.address}
            />
          </Grid>
        </GridContainer>
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

        <GridContainer style={{ marginBottom: 5 }}>
          <Grid item xs={12} sm={12}>
            <AppTextInput
              fullWidth
              variant="outlined"
              value={values.description}
              label="Description"
              onChange={handleChange('description')}
              helperText={errors.description}
            />
          </Grid>
        </GridContainer>
        <Box display="flex" justifyContent="flex-end" mb={4}>
          <Button onClick={() => handleDialog(false)}>Cancel</Button>
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

export default EditStore;

EditStore.prototype = {
  open: PropTypes.bool.isRequired,
  handleDialog: PropTypes.func,
  store: PropTypes.object,
};

EditStore.defaultProps = {
  store: null,
};
