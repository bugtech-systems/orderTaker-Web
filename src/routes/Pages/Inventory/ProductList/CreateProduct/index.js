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
import {  requiredMessage } from '../../../../../@jumbo/constants/ErrorMessages';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';
// import { isValidEmail } from '../../../../../@jumbo/utils/commonHelper';
import { Typography, Menu, Tooltip, MenuItem } from '@material-ui/core';



//Icons
import DoneIcon from '@material-ui/icons/Done';
import LabelIcon from '@material-ui/icons/Label';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, onUpdateProduct } from '../../../../../redux/actions/ProductApp';
import { uploadFile } from '../../../../../redux/actions/Users';




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
  menuItemsRoot: {
    width: 200,
    fontSize: 14,
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '& .MuiTouchRipple-root': {
      display: 'none',
    },
    '& .MuiSvgIcon-root': {
      fontSize: 18,
    },
  },
  iconBlock: {
    display: 'block',
  },
  titleLabelsRoot: {
    fontSize: 10,
    letterSpacing: 1.5,
    color: theme.palette.text.secondary,
    textTransform: 'uppercase',
    padding: '16px 16px 8px',
  },
}));


const CreateProduct = ({ open, handleDialog }) => {

  const { currentProduct, labelsList } = useSelector(({ productApp }) => productApp);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [isDiscounted, setDiscounted] = useState(false);
  const [showLabels, setShowLabels] = useState(null);
  const [values, setValues] = useState({
    limit: 0,
    name: '',
    description: '',
    price: 0,
    discount_price: 0,
    cover: '',
    labels: []
  });
  const [errors, setErrors] = useState({});

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);

      dispatch(uploadFile(formData)).then(a => {
        console.log(a.url)
        setValues({...values, cover: a.url})
      })
      .catch(err => {
        console.log(err)
      })
    },
  });

  const onShowLabels = event => {
    setShowLabels(event.currentTarget);
  };

  const onHideLabels = () => {
    setShowLabels(null);
  };


  const onClickLabelOption = label => {
    let newTags = [];
    let tags = values && values.labels ? values.labels : [];
    let ind = tags.find(a => a === label);

    if(ind){
      newTags = tags.filter(a => a !== label);
    } else {
      tags.push(label);
     newTags = tags;
    }
    
    setValues({ ...values, labels: newTags  })
    // dispatch(updateProductsLabel(checkedProducts, label.id));
    // updateCheckedProducts([]);
    // onHideLabels();
  };

  

  const handleChange = prop => event => {

    if(prop === 'limit' || prop === 'price' || prop === 'discount_price'){
      setValues({ ...values, [prop]: event.target.value >= 0 ? event.target.value : 0});
      setErrors({ ...errors, [prop]: '' });
    } else {
      setValues({ ...values, [prop]: event.target.value });
      setErrors({ ...errors, [prop]: '' });
    }

  };

  const checkValidations = () => {

    if (!values.name) {
      setErrors({ ...errors, name: requiredMessage });
    } else if (!values.price) {
      setErrors({ ...errors, price: 'Price is required!' });
    } else if (values.price <= 0) {
      setErrors({ ...errors, price: 'Price is required!' });
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    handleDialog();
    if (currentProduct) {
      dispatch(onUpdateProduct({ ...currentProduct, ...values }));
    } else { 
      dispatch(createProduct(values));
    }
  };


  useEffect(() => {
    if(currentProduct){
      setValues(currentProduct) 
    }
  }, [currentProduct])

  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={handleDialog} className={classes.dialogRoot}>
      <DialogTitle className={classes.dialogTitleRoot}>
        {currentProduct ? 'Edit Product Details' : 'Create New Product'}
      </DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
          <Box {...getRootProps()} mr={{ xs: 0, md: 5 }} mb={{ xs: 3, md: 0 }} className="pointer">
            <input {...getInputProps()} />
            <CmtAvatar size={70} src={values.cover} />
          </Box>
          <GridContainer>
            <Grid item xs={10} sm={10}>
              <AppTextInput
                fullWidth
                variant="outlined"
                value={values.name}
                label="Product Name"
                onChange={handleChange('name')}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={2} sm={2}>
            <Box ml={1}>
              <Tooltip title="Labels">
                <IconButton size="small" onClick={onShowLabels}>
                  <LabelIcon color='primary' />
                </IconButton>
              </Tooltip>
            </Box>
            </Grid>
          
            {/* <Grid item xs={12} sm={7} /> */}
          </GridContainer>
        </Box>
        <GridContainer style={{ marginBottom: 12 }}>
          <Grid item xs={12} sm={12}>
            <AppTextInput
              fullWidth
              multiline
              minRows={4}
              variant="outlined"
              value={values.description}
              label="Product Description"
              onChange={handleChange('description')}
              helperText={errors.description}
            />
          </Grid>
              <Grid item xs={12} sm={6}>
                <AppTextInput
                  fullWidth
                  type="number"
                  variant="outlined"
                  label="Selling Price"
                  value={values.price}
                  onChange={handleChange('price')}
                />
              </Grid>
              {isDiscounted && 
              <Grid item xs={10} sm={5}>
                <AppTextInput
                  fullWidth
                  type="number"
                  variant="outlined"
                  label="Discounted Price"
                  value={values.discount_price}
                  onChange={handleChange('discount_price')}
                />
              </Grid>}
              {isDiscounted && (
                <Grid item xs={2} sm={1}>
                     <Box display="flex" alignItems="center" justifyContent="center" p={2}>
                  <IconButton size="small" onClick={() => setDiscounted(false)}>
                    <CancelIcon fontSize="small"/>
                  </IconButton>
                  </Box>
                </Grid>
              )}
            </GridContainer>

              {!isDiscounted && 
        <Box
          mb={{ xs: 6, md: 5 }}
          display="flex"
          alignItems="center"
          onClick={() => setDiscounted(true)}
          className="pointer"
          color="primary.main">
          <AddCircleOutlineIcon />
         {!isDiscounted && <Box ml={2}>Add Discounted Price</Box> }
        </Box>}
        <br/>
        <Box display="flex" flexDirection="column">
        <Typography variant="h4">Minimum Stock Quantity Limit</Typography>
        <br/>
         <GridContainer>
         <Grid item xs={12} sm={6}>
              <AppTextInput
                fullWidth
                type="number"
                variant="outlined"
                label="Quantity"
                value={values.limit}
                onChange={handleChange('limit')}
              />
            </Grid>
            <Grid item xs={12} sm={6} />
          </GridContainer>
          </Box>
        <Box display="flex" justifyContent="flex-end" mb={4}>
          <Button onClick={handleDialog}>Cancel</Button>
          <Box ml={2}>
            <Button variant="contained" color="primary" onClick={checkValidations}>
              Save
            </Button>
          </Box>
        </Box>
        <Menu anchorEl={showLabels} open={Boolean(showLabels)} onClose={onHideLabels}>
        <Box className={classes.titleLabelsRoot}>Labels</Box>
        <CmtList
          data={labelsList}
          renderRow={(item, index) => (
            <MenuItem key={index} onClick={() => onClickLabelOption(item.id)} className={classes.menuItemsRoot}>
              <Box display="flex" alignItems="center" width={1}>
                <Box>
                  <LabelIcon className={classes.iconBlock} style={{ color: item.color }} />
                </Box>
                <Box ml={4} component="span">
                  {item.name}
                </Box>
                {values && values.labels && values.labels.includes(item.id) && (
                  <Box ml="auto">
                    <DoneIcon className={classes.iconBlock} />
                  </Box>
                )}
              </Box>
            </MenuItem>
          )}
        />
      </Menu>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProduct;

CreateProduct.prototype = {
  open: PropTypes.bool.isRequired,
  handleDialog: PropTypes.func,
  selectedProduct: PropTypes.object,
};

CreateProduct.defaultProps = {
  selectedProduct: null,
};
