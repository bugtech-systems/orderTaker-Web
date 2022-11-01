import React, {useState, useEffect} from 'react';

import ProductTableHead from './ProductTableHead';
import Table from '@material-ui/core/Table';
import { useDispatch, useSelector } from 'react-redux';
import { TableBody, TableRow, TableCell, TableContainer, TableHead, TablePagination } from '@material-ui/core';
import Paper from "@material-ui/core/Paper";

import ProductCell from './ProductCell';
import CheckedListHeader from './CheckedListHeader';
import PropTypes from 'prop-types';
import useStyles from './index.style';

import { getProductsList, setFilterType } from 'redux/actions/ProductApp'

const ListTableView = ({
  checkedProducts,
  handleCellCheckBox,
  handleHeaderCheckBox,
  updateCheckedProducts,
  onShowProductDetail,
  onClickEditProduct,
  onClickAddStocks,
  onDelete
}) => {
const classes = useStyles();
  const dispatch = useDispatch();
  const { productsList, filterType, totalProducts } = useSelector(({ productApp }) => productApp);
  
  const [selected, setSelected] = React.useState([]);

  const [orderBy, setOrderBy] = React.useState('name');
  const [order, setOrder] = React.useState('asc');
  const [page, setPage] = React.useState(0);
  const [products, setProducts] = useState([])
  
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
  const handleChangePage = (event, newPage) => {
      setPage(newPage);
      dispatch(setFilterType({...filterType, page: newPage, rowsPerPage}))
      dispatch(getProductsList({...filterType, page: newPage, rowsPerPage}))
    };


    const handleChangeRowsPerPage = event => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
      console.log()
      dispatch(setFilterType({...filterType, page: 0, rowsPerPage: parseInt(event.target.value, 10)}))
      dispatch(getProductsList({...filterType, page: 0, rowsPerPage: parseInt(event.target.value, 10)}))
    };
    
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrderBy(property);
      setOrder(isAsc ? 'desc' : 'asc');
    };
    
    const handleSelectAllClick = event => {
      if (event.target.checked) {
        const newSelected = products.map(n => n.id);
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    };
    
    const handleRowClick = (event, id) => {
      const selectedIndex = selected.indexOf(id);
      let newSelected = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
      }
      setSelected(newSelected);
    };
    
    const handlePageChange = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleRowsPerPageChange = event => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    
    const isSelected = id => selected.indexOf(id) !== -1;

    useEffect(() => {
      setProducts(productsList)
    }, [productsList])

  return (
    <React.Fragment>
          {checkedProducts.length > 0 && (
        <CheckedListHeader
          checkedProducts={checkedProducts}
          handleHeaderCheckBox={handleHeaderCheckBox}
          updateCheckedProducts={updateCheckedProducts}
          onDelete={onDelete}
        />
      )}
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
                {checkedProducts.length === 0 && (
                     <ProductTableHead
                     classes={classes}
                     checkedProducts={productsList}
                     handleHeaderCheckBox={handleHeaderCheckBox}
                    onDelete={onDelete}
                   />
          )}
          <TableBody>
       {products
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((data, index) => (
                    <ProductCell
                    key={index}
                    product={data}
                    checkedProducts={checkedProducts}
                    handleCellCheckBox={handleCellCheckBox}
                    onShowProductDetail={onShowProductDetail}
                    onClickEditProduct={onClickEditProduct}
                    onClickAddStocks={onClickAddStocks}
                    onDelete={onDelete}
                  />
            ))}
          </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[1, 50, 100]}
        component="div"
        count={totalProducts}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
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
  onClickAddStocks: PropTypes.func,
  onDelete: PropTypes.func
};

ListTableView.defaultProps = {
  checkedProducts: [],
};
