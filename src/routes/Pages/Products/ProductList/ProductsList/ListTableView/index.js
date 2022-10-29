import React from 'react';
import ListHeader from './ListHeader';
import Table from '@material-ui/core/Table';
import { useSelector } from 'react-redux';
import TableBody from '@material-ui/core/TableBody';
import ProductCell from './ProductCell';
import CheckedListHeader from './CheckedListHeader';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Paper from "@material-ui/core/Paper";

const ListTableView = ({
  checkedProducts,
  handleCellCheckBox,
  handleHeaderCheckBox,
  updateCheckedProducts,
  onShowProductDetail,
  onClickEditProduct,
}) => {
  const { productsList } = useSelector(({ productApp }) => productApp);
  return (
    <React.Fragment>
      {checkedProducts.length > 0 && (
        <CheckedListHeader
          checkedProducts={checkedProducts}
          handleHeaderCheckBox={handleHeaderCheckBox}
          updateCheckedProducts={updateCheckedProducts}
        />
      )}
      <Box className="Cmt-table-responsive">
        <Table>
          {checkedProducts.length === 0 && (
            <ListHeader
              productsList={productsList}
              checkedProducts={checkedProducts}
              handleHeaderCheckBox={handleHeaderCheckBox}
            />
          )}
          <TableBody>
            {productsList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product, index) => (
                <ProductCell
                  key={index}
                  product={product}
                  handleCellCheckBox={handleCellCheckBox}
                  onShowProductDetail={onShowProductDetail}
                  onClickEditProduct={onClickEditProduct}
                />
              ))}
          </TableBody>
        </Table>
              <TablePagination
        rowsPerPageOptions={[1, 5, 15, 20, 50]}
        component="div"
        count={customers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      </Box>
    </React.Fragment>
  );
};

export default ListTableView;

ListTableView.prototype = {
  checkedProducts: PropTypes.array,
  handleCellCheckBox: PropTypes.func,
  handleHeaderCheckBox: PropTypes.func,
  updateCheckedProducts: PropTypes.func,
  onShowProductDetail: PropTypes.func,
  onClickEditProduct: PropTypes.func,
};

ListTableView.defaultProps = {
  checkedProducts: [],
};
