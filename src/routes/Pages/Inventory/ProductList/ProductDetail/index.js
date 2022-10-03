import React from 'react';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import CmtAvatar from '../../../../../@coremat/CmtAvatar';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import { setCurrentProduct, updateStarredStatus } from '../../../../../redux/actions/ProductApp';
import { useDispatch, useSelector } from 'react-redux';
import CmtList from '../../../../../@coremat/CmtList';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import { alpha, makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import MoreOptions from '../ProductsList/ListTableView/ProductCellOptions/MoreOptions';
import CmtImage from '../../../../../@coremat/CmtImage';


import commonData from "../../../../../utils/commonData";


const useStyles = makeStyles(theme => ({
  dialogRoot: {
    position: 'relative',
    '& .MuiDialog-paperWidthSm': {
      width: '100%',
    },
  },
  userInfoRoot: {
    borderBottom: `1px solid ${theme.palette.borderColor.main}`,
    padding: '20px 24px',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
  avatarView: {
    [theme.breakpoints.down('sm')]: {
      '& .Cmt-avatar-size': {
        width: 40,
        height: 40,
      },
    },
  },
  titleRoot: {
    fontSize: 16,
    color: theme.palette.common.dark,
    fontWeight: theme.typography.fontWeightBold,
    [theme.breakpoints.up('md')]: {
      fontSize: 18,
    },
  },
  subTitleRoot: {
    fontSize: 12,
    letterSpacing: 0.4,
    color: theme.palette.text.secondary,
  },
  labelRoot: {
    backgroundColor: alpha(theme.palette.common.dark, 0.05),
    color: theme.palette.text.disabled,
    padding: '4px 10px',
    borderRadius: 4,
    textTransform: 'capitalize',
  },
}));
const ProductDetail = ({ open, handleDialog }) => {
  const classes = useStyles();
  const { currentProduct } = useSelector(({ productApp }) => productApp);
  const dispatch = useDispatch();

  const onClickStarredIcon = status => {
    dispatch(updateStarredStatus([currentProduct.id], status));
    dispatch(setCurrentProduct({ ...currentProduct, starred: status }));
  };

  const { name, description, limit, price, cover, uom, other_amounts, starred } = currentProduct;
  console.log(currentProduct);
  console.log(other_amounts);

  const otherAmounts = other_amounts.map(a => {
    let oaType = a.type.charAt(0).toUpperCase() + a.type.slice(1);
    let oaName = `${a.name} - ${a.amount_type === 'rate' ? `${a.value}%` : `₱${Number(a.value).toFixed(2)}`}`;

    return (
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start" mb={1}>
        <Typography color="primary">{oaName}</Typography>
        <Typography variant="caption">{oaType}</Typography>
      </Box>
    );
  });

  return (
    <Dialog open={open} onClose={handleDialog} className={classes.dialogRoot}>
      <Box className={classes.userInfoRoot}>
        <Box mr={3} display="flex" alignItems="center">
          <Box className={classes.avatarView} mr={{ xs: 4, md: 6 }}>
            {/* <CmtAvatar size={70} src={dpUrl} alt={name} /> */}
            <CmtImage  src={`${commonData.staticUrl}${cover}`} height={70} width={70} alt={name} />
          </Box>

          <Box mt={-2}>
            <Box display="flex" alignItems="center">
              <Typography className={classes.titleRoot}> {name}</Typography>
              <Box ml={1}>
                <Checkbox
                  icon={<StarBorderIcon />}
                  checkedIcon={<StarIcon style={{ color: '#FF8C00' }} />}
                  checked={starred}
                  onChange={e => onClickStarredIcon(e.target.checked)}
                />
              </Box>
            </Box>
            {price && (
              <Box mt={-1}>{price && <Typography color="primary"> Price: `₱{Number(price).toFixed(2)}`</Typography>}</Box>
            )}
          </Box>
        </Box>
        <Box ml="auto" mtq={-2} display="flex" alignItems="center">
          <Box ml={1}>
            <MoreOptions product={currentProduct} isFromDetailPage={true} isDetailView={true} />
          </Box>
          <Box ml={1}>
            <IconButton onClick={handleDialog}>
              <ClearIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Box px={6} py={5}>
        <Box mb={5} component="p" color="common.dark">
          Product Detail
        </Box>
          <Box display="flex" alignItems="center" mb={3} color="primary" pl={5}>
            <Typography color="primary"> Description: {currentProduct.description}</Typography>
          </Box>
          <Box display="flex" alignItems="center" mb={3} color="primary" pl={5}>
            <Typography color="primary"> Stock Limit: {currentProduct.limit}</Typography>
             <Typography variant="caption"> {currentProduct.uom}</Typography>
          </Box>
          <Box display="flex" alignItems="center" color="primary" pl={5}>
            <Typography color="primary"> Available Stocks: {currentProduct.stocks}</Typography>
              <Typography variant="caption"> {currentProduct.uom}</Typography>
          </Box>
        </Box>
      {other_amounts.length !== 0 && (
        <Box px={6} py={5}>
          <Box component="p" color="common.dark">
            Other Charges and Discounts
          </Box>
          <br />
          <Box pl={5} className={classes.contactRoot}>
            {otherAmounts}
          </Box>
        </Box>
      )}
    </Dialog>
  );
};

export default ProductDetail;

ProductDetail.prototype = {
  open: PropTypes.bool.isRequired,
  handleDialog: PropTypes.func,
  selectedProduct: PropTypes.object.isRequired,
};
