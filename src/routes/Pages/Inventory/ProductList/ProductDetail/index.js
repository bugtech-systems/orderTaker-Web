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
import EmailIcon from '@material-ui/icons/Email';
import PaymentIcon from '@material-ui/icons/Payment';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import EventNoteIcon from '@material-ui/icons/EventNote';
import MoreOptions from '../ProductsList/ListTableView/ProductCellOptions/MoreOptions';

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

  const { name, description, limit, price, dpUrl, rate, discount, charges, starred } = currentProduct;
  return (
    <Dialog open={open} onClose={handleDialog} className={classes.dialogRoot}>
      <Box className={classes.userInfoRoot}>
        <Box mr={3} display="flex" alignItems="center">
          <Box className={classes.avatarView} mr={{ xs: 4, md: 6 }}>
            <CmtAvatar size={70} src={dpUrl} alt={name} />
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
            {(price || charges) && (
              <Box mt={-1}>
                {price && <Typography className={classes.subTitleRoot}> Price: ₱{price}.00 </Typography>}
                {charges && <Typography className={classes.subTitleRoot}> Taxes: ₱{charges}.00 </Typography>}
              </Box>
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
        <Box className={classes.contactRoot} mb={6}>
          <Box display="flex" alignItems="center" mb={3} color="text.secondary">
            <Box ml={3}> Description: {currentProduct.description}</Box>
          </Box>
          <Box display="flex" alignItems="center" mb={3} color="text.secondary">
            <Box ml={3}> Stock Limit: {currentProduct.limit}</Box>
          </Box>
          <Box display="flex" alignItems="center" mb={3} color="text.secondary">
            <Box ml={3}> Available Stocks: {currentProduct.stocks}</Box>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default ProductDetail;

ProductDetail.prototype = {
  open: PropTypes.bool.isRequired,
  handleDialog: PropTypes.func,
  selectedProduct: PropTypes.object.isRequired,
};
