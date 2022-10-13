import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import GridContainer from '../../../../../@jumbo/components/GridContainer';
import Grid from '@material-ui/core/Grid';
import AppTextInput from '../../../../../@jumbo/components/Common/formElements/AppTextInput';
import CmtImage from '../../../../../@coremat/CmtImage';
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
import MoreVertIcon from '@material-ui/icons/MoreVert';
// import { isValidEmail } from '../../../../../@jumbo/utils/commonHelper';
import { Typography, Menu, Tooltip, MenuItem, DialogActions } from '@material-ui/core';




//Components
import Autocomplete  from './AutoComplete';



//Icons
import DoneIcon from '@material-ui/icons/Done';
import LabelIcon from '@material-ui/icons/Label';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import EditIcon from '@material-ui/icons/Edit';


//Redux
import { useDispatch, useSelector } from 'react-redux';
import { addProductOtherAmount, createProduct, onUpdateProduct, updateProductOtherAmount, getAllProductOtherAmount } from '../../../../../redux/actions/ProductApp';
import { uploadFile } from '../../../../../redux/actions/Users';


import commonData from "../../../../../utils/commonData";



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


const CreateProduct = ({ handleDialog }) => {

  const { currentProduct, labelsList, tax_disc } = useSelector(({ productApp }) => productApp);

  const dispatch = useDispatch();
  const classes = useStyles();
  const [isAddVD, setIsAddVD] = useState(null);
  const [showLabels, setShowLabels] = useState(null);

  const [other_amounts, setOtherAmounts] = useState({
    type: null,
    name: '',
    value: 0,
    amount_type: 'rate'
  });
  const [anchorEl, setAnchorEl] = useState(null);


  const [values, setValues] = useState({
    limit: 0,
    name: '',
    description: '',
    price: 0,
    purchase_price: 0,
    cover: 'noproduct.jpg',
    labels: [],
    other_amounts: []
  });
  const [errors, setErrors] = useState({});
  const [oa_options, setOaOptions] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);

      dispatch(uploadFile(formData)).then(a => {
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



  const handleClickOA = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleCloseOA = () => {
    setAnchorEl(null);
  }

  const handleSelectOAType = (val) => {
    setOtherAmounts({...other_amounts, type: val})
    setIsAddVD(val)
  }

  const handleAddOtherAmounts = (val) => {

    dispatch(!val.id ? addProductOtherAmount(val) : updateProductOtherAmount(val))
    .then(a => {
          let oa = values.other_amounts;
           oa.push(a);
      setValues({...values, other_amounts: oa})
      setOtherAmounts({
        type: '',
        name: '',
        value: 0
      })   
      setIsAddVD(null)
    })
    .catch(err => {
      console.log(err)
    })

  }






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

  const onRemoveOARow = index => {
    const updatedList = [...values.other_amounts];
    updatedList.splice(index, 1);
    setValues({ ...values, other_amounts: updatedList });
  };

  const onRemoveOA = index => {
    setIsAddVD(null)
    setOtherAmounts({
      type: '',
      name: '',
      value: 0,
      amount_type: 'rate'
     });
  };


  const handleDialogValue = (prop) => {
      setOtherAmounts({
          isNew: true,
          name: prop.name,
          type: isAddVD, amount_type: 'rate', value: 0
      })
  }


  useEffect(() => {
    if(currentProduct){
      setValues(currentProduct) 
    }
  }, [currentProduct])


  useEffect(() => {
    if(isAddVD){
      let newArr = tax_disc.filter(a => isAddVD === 'tax' ? (a.type === 'tax' || a.type === 'vat') : a.type === isAddVD);
      setOaOptions(newArr);
    } else {
      let newArr = tax_disc.filter(a => a.id);
      setOaOptions(newArr);
    }
  }, [tax_disc, isAddVD])

  useEffect(() => {
    dispatch(getAllProductOtherAmount());
  }, [])


  const handleSelect = (val) => {
    if(val){

      let oa = values.other_amounts;
      oa.push(val);
  setValues({...values, other_amounts: oa});
  setIsAddVD(null);
    } else {
      setOtherAmounts({
        type: '',
        name: '',
        value: 0,
        amount_type: 'rate'
      })
    }
}


const handleEditOtherAmounts = (val, index) => {
  let oa = values.other_amounts;
 let newArr = oa.filter(a => a.id !== val.id);
  setValues({...values, other_amounts: newArr})
  setIsAddVD(val.type);
  setOtherAmounts({...val, isNew: true});
}


  return (
    <Dialog maxWidth="sm" fullWidth 
    open={true} 
      onClose={handleDialog} className={classes.dialogRoot}>
      <DialogTitle className={classes.dialogTitleRoot}>
        {currentProduct ? 'Edit Product Details' : 'Create New Product'}
      </DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
          <Box {...getRootProps()} mr={{ xs: 0, md: 5 }} mb={{ xs: 3, md: 0 }} className="pointer">
            <input {...getInputProps()} />
            <CmtImage src={`${commonData.staticUrl}${values.cover ? values.cover : 'noproduct.jpg'}`} height={80} width={80} alt={values.name} />
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
        <GridContainer >
         <Grid item xs={12} sm={8} lg={8}>
         <Typography variant="h4">Selling Price</Typography>
              <br/>
                <AppTextInput
                  fullWidth
                  type="number"
                  variant="outlined"
                  label="Amount"
                  value={values.price}
                  onChange={handleChange('price')}
                />
              </Grid>
         {/* <Grid item xs={12} sm={4} lg={4}>
         <Typography variant="h4">Purchase Price</Typography>
              <br/>
                <AppTextInput
                  fullWidth
                  type="number"
                  variant="outlined"
                  label="amount"
                  value={values.purchase_price}
                  onChange={handleChange('purchase_price')}
                />
           </Grid> */}
         <Grid item xs={12} sm={4} lg={4}>
         <Typography variant="h4">Stock Limit</Typography>
              <br/>
              <AppTextInput
                fullWidth
                type="number"
                variant="outlined"
                label="Quantity"
                value={values.limit}
                onChange={handleChange('limit')}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6} /> */}
            
          </GridContainer>
        <GridContainer style={{ marginBottom: 12 }}>
          <Grid item xs={12} sm={12}>
            <AppTextInput
              fullWidth
              multiline
              minRows={3}
              variant="outlined"
              value={values.description}
              label="Product Description"
              onChange={handleChange('description')}
              helperText={errors.description}
            />
          </Grid>
            </GridContainer>
     
          <CmtList
          data={values.other_amounts}
          renderRow={(item, index) => (
            <GridContainer style={{ marginBottom: 12 }} key={index}>
            {/* <Grid style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: "space-between"}} item xs={2}>
                
                </Grid> */}
                <Grid item xs={12} sm={12}>
                <Box display="flex" alignItems="center">
                <IconButton size="small" onClick={() => onRemoveOARow(index)}>
                    <CancelIcon fontSize="small"/>
                  </IconButton>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Box display="flex"  flexGrow={1} flexDirection="column">
                  <Typography>{item.name}</Typography>
                  <Typography variant="caption">{String(item.type).toUpperCase()}</Typography>
                  </Box>
                  <Box display="flex" flexDirection="column" alignItems="flex-end">
                  <Typography>{item.amount_type === 'rate' ? `${item.value}%` : item.value}
</Typography>
                  <Typography variant="caption">{String(item.amount_type).toUpperCase()}</Typography>
                  </Box>
                  {/* <AppTextInput
                  fullWidth
                  // type="number"
                  variant="outlined"
                  label="Title"
                  value={item.name}
                  // onChange={(e) => handleOAChange(e.taget.value, index, 'value')}
                  // style={{width: '200px'}}
                /> */}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                
           
<IconButton 
       style={{marginLeft: '10px'}}
        size="small" 
          onClick={() => handleEditOtherAmounts(item, index)}
        >
           <EditIcon style={{color: "maroon"}} fontSize="small"/>
       </IconButton>
          </Box>
              </Grid>
            </GridContainer>
          )}
        />
        <Typography style={{marginLeft: '30px', marginBottom: '10px'}}>{isAddVD === 'tax' ? 'ADD TAX' : isAddVD === 'charges' ? 'Add CHARGES' : isAddVD === 'discounts' && 'LESS DISCOUNTS'}</Typography> 
        <GridContainer >
{!isAddVD ?
          <Grid item xs={12} sm={12}>
           <Box display="flex" alignItems="center" justifyContent="space-around">
           <Box
           mb={{ xs: 6, md: 5 }}
           display="flex"
           alignItems="center"
           onClick={() => handleSelectOAType('tax')}
           className="pointer"
           color="primary.main">
           <AddCircleOutlineIcon />
             <Box ml={2}>TAX</Box>
         </Box>
         <Box
           mb={{ xs: 6, md: 5 }}
           display="flex"
           alignItems="center"
           onClick={() => handleSelectOAType('charges')}
           className="pointer"
           color="primary.main">
           <AddCircleOutlineIcon />
             <Box ml={2}>CHARGES</Box>
         </Box>
         <Box
           mb={{ xs: 6, md: 5 }}
           display="flex"
           alignItems="center"
           onClick={() => handleSelectOAType('discounts')}
           className="pointer"
           color="secondary.main">
           <RemoveCircleOutlineIcon />
             <Box ml={2}>DISCOUNTS</Box>
         </Box>
           </Box>
         </Grid>
         :
         <Grid item xs={12} sm={12}>
         <Box display="flex" alignItems="center">
         <IconButton size="small" onClick={() => onRemoveOA()}>
             <CancelIcon fontSize="small"/>
           </IconButton>
       <Autocomplete
          fullWidth
          variant="outlined"
          label="Title"
          size="small"
          value={other_amounts}
          handleChange={handleSelect}
          setDialogValue={handleDialogValue}
          options={oa_options}
         />
         {other_amounts.isNew && 
         <>
  <IconButton size='small' aria-controls="simple-menu" aria-haspopup="true" onClick={handleClickOA}>
<MoreVertIcon fontSize='small'/>
</IconButton>
<Menu
id="simple-menu"
anchorEl={anchorEl}
keepMounted
open={Boolean(anchorEl)}
onClose={handleCloseOA}
>
<MenuItem onClick={(e) => {
  setOtherAmounts({...other_amounts, amount_type: 'rate'})
  handleCloseOA()
  }}>Rate</MenuItem>
<MenuItem onClick={(e) => { 
  setOtherAmounts({...other_amounts, amount_type: 'amount'})
  handleCloseOA()
}
}>Amount</MenuItem>
</Menu>
<AppTextInput
           fullWidth
           type="number"
           variant="outlined"
           label={String(other_amounts.amount_type).toUpperCase()}
           value={other_amounts.value}
           onChange={(e) => setOtherAmounts({...other_amounts, value: other_amounts.amount_type === 'rate'?  (e.target.value >= 0 && e.target.value <= 100) ? e.target.value : other_amounts.value : e.target.value     })}
           style={{width: '200px'}}
         />
           <IconButton 
style={{marginLeft: '10px'}}
 size="small" 
   onClick={() => handleAddOtherAmounts(other_amounts)}
 >
    <DoneOutlineIcon style={{color: "green"}} fontSize="small"/>
</IconButton> 
</>     }
   </Box>
       </Grid>
       }
       
  </GridContainer>

        <Box display="flex" justifyContent="flex-end" mt={5} mb={4}>
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
      {/* <ADDTAXDISC/> */}
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
