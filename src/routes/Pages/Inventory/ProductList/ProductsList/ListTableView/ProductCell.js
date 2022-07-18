import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import CmtAvatar from '../../../../../../@coremat/CmtAvatar';
import Typography from '@material-ui/core/Typography';
import useStyles from '../ProductCell.style';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import ProductCellOptions from './ProductCellOptions';
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';

const ProductCell = ({ product, checkedProducts, handleCellCheckBox, onShowProductDetail, onClickEditProduct }) => {
  const classes = useStyles();
  const { id, name, description, stocks, price, cover } = product;
  // console.log(product)
  return (
    <TableRow className={classes.tableRowRoot} onClick={() => onShowProductDetail(product)}>
      <TableCell className={classes.tableCellRootWrap} >
        <Box display="flex" alignItems="center">
          <Box component="span" mr={2} onClick={e => e.stopPropagation()}>
            <Checkbox
              color="primary"
              checked={checkedProducts.includes(id)}
              onChange={event => handleCellCheckBox(event.target.checked, id)}
            />
          </Box>
          <Box display="flex" alignItems="center">
            <Box mr={{ xs: 4, md: 5 }}>
              <CmtAvatar size={40} src={cover} alt={name} />
            </Box>
            <Box>
              <Typography className={classes.titleRoot} component="div" variant="h4">
                {name}
              </Typography>
              <Typography className={classes.subTitleRoot}>{description}</Typography>
            </Box>
          </Box>
        </Box>
      </TableCell>
      <TableCell align='center' padding="none" >
           <Box pr={5}>
              <Typography className={classes.titleRoot} component="div" variant="h5">
              {stocks}
              </Typography>
              </Box>
       </TableCell>
      <TableCell align='center' padding="none" mr={5}>
      <Box pr={5}>
              <Typography className={classes.titleRoot} component="div" variant="h5">
              ₱{price}
              </Typography>
              </Box>
       </TableCell>
      <TableCell className={clsx(classes.tableCellRoot, classes.tableCellAction)}>
      <Box pr={10}>
        <ProductCellOptions product={product} onClickEditProduct={onClickEditProduct} />
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default ProductCell;

ProductCell.prototype = {
  product: PropTypes.object.isRequired,
  checkedProducts: PropTypes.array,
  handleCellCheckBox: PropTypes.func,
  onShowProductDetail: PropTypes.func,
  onClickEditProduct: PropTypes.func,
};

ProductCell.defaultProps = {
  checkedProducts: [],
};
