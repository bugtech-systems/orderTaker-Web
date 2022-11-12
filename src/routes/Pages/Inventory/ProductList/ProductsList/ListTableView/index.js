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

import { getInventoryList, setFilterType } from 'redux/actions/ProductApp'

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

  const productApp = useSelector(({ productApp }) => productApp);
  const cart = useSelector(({ cartApp }) => cartApp);

  const { filterType, totalProducts } = productApp;
  
  const [orderBy, setOrderBy] = React.useState('name');
  const [order, setOrder] = React.useState('asc');
  const [page, setPage] = React.useState(0);
  const [products, setProducts] = useState([])
  
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
  const handleChangePage = (event, newPage) => {
      setPage(newPage);
      dispatch(setFilterType({...filterType, page: newPage, rowsPerPage}))
      dispatch(getInventoryList({...filterType, page: newPage, rowsPerPage}))
    };

    const handleChangeRowsPerPage = event => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
      dispatch(setFilterType({...filterType, page: 0, rowsPerPage: parseInt(event.target.value, 10)}))
      dispatch(getInventoryList({...filterType, page: 0, rowsPerPage: parseInt(event.target.value, 10)}))
    };
    
    const handleSort = (event, field) => {
      setOrderBy(field)
      setOrder(order === 'asc' ? 'desc' : 'asc');


      let newProds = products.sort((a, b) =>{
        if(field === 'name'){

          const nameA = a.name.toUpperCase(); // ignore upper and lowercase
          const nameB = b.name.toUpperCase(); // ignore upper and lowercase
          if (order === 'asc' ? nameA < nameB : nameA > nameB) {
            return -1;
          }
          if (order === 'asc' ? nameA < nameB : nameA > nameB) {
            return 1;
          }
        
          // names must be equal
          return 0;
      } else {
        return order === 'asc' ? a[field] - b[field] : b[field] - a[field];
      }
      });

      setProducts(newProds)
    }

  
    // useEffect(() => {
    //   setProducts(productsList)
    // }, [productsList])


    useEffect(() => {
      const { productsList} = productApp;
  
      const {cart_items} = cart;
    
      const pp = productsList.map(a => {
        let ind = cart_items.find(ab => ab.productId === a.id);
    
        return ind ? {
          ...a, 
          stocks: ind.stocks
        } : a
      })
      setProducts(pp)
    }, [productApp, cart]);


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
                     checkedProducts={products}
                     onSelectAllClick={handleHeaderCheckBox}
                     handleHeaderCheckBox={handleHeaderCheckBox}
                    onDelete={onDelete}
                    onRequestSort={handleSort}
                    order={order}
                    orderBy={orderBy}
                   />
          )}
          <TableBody>
       {products.map((data, index) => (
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
        rowsPerPageOptions={[10, 50, 100]}
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