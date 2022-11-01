import React, { useContext, useEffect, useState } from 'react';
import ListGridView from './ListGridView';
import { useDispatch, useSelector } from 'react-redux';
import { getInventoryList } from '../../../../../redux/actions/ProductApp';
import PropTypes from 'prop-types';
import DuplicateProductsMsg from './DuplicateProductsMsg';
import { Box } from '@material-ui/core';
import useStyles from '../index.style';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { getProductContainerHeight } from '../../../../../@jumbo/constants/AppConstants';
import AppContext from '../../../../../@jumbo/components/contextProvider/AppContextProvider/AppContext';
import EmptyProductResult from './EmptyProductResult';
import {TableBody, TableContainer, TablePagination } from '@material-ui/core';

// import useStyles from './index.style';
const ProductsList = ({ width, viewMode, onShowProductDetail, onClickEditProduct }) => {
  const { showFooter } = useContext(AppContext);
  const dispatch = useDispatch();
  const { filterType, productsList } = useSelector(({ productApp }) => productApp);
  const [showDuplicateMsg, setShowDuplicateMsg] = useState(true);
  
  const [selected, setSelected] = React.useState([]);
  const [orderBy, setOrderBy] = React.useState('name');
  const [order, setOrder] = React.useState('asc');
  const [page, setPage] = React.useState(0);
  const [products, setProducts] = useState([])

  const fetchData = async () => {
    const response = await fetch("http://localhost:3001/api/products")
    const data = await response.json()
     setProducts(data)
    }
    useEffect(() => {
      fetchData()
    }, [])

  useEffect(() => {
    dispatch(getInventoryList(filterType));
  }, [filterType, dispatch]);

  const toggleDuplicateMsgShow = () => {
    setShowDuplicateMsg(!showDuplicateMsg);
  };

  const classes = useStyles({
    height: getProductContainerHeight(width, showFooter),
  });

  const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    
    const handleChangeRowsPerPage = event => {
      setRowsPerPage(parseInt(event.target.value, 5));
      setPage(0);
    };
    
   const handlePageChange = (event, newPage) => {
      setPage(newPage);
    };
    
    const isSelected = id => selected.indexOf(id) !== -1;

  return productsList.length > 0 ? (
    <Box className={classes.inBuildAppMainContent}>
        {showDuplicateMsg && (
          <DuplicateProductsMsg productsList={productsList} toggleDuplicateMsgShow={toggleDuplicateMsgShow} />
        )}
          <TablePagination
                rowsPerPageOptions={[1, 10, 30, 50]}
                component="div"
                count={products.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
      />
        <ListGridView 
                     rowCount={productsList.length}
            productsList={productsList} 
            onShowProductDetail={onShowProductDetail} 
            onClickEditProduct={onClickEditProduct} 
          />

    </Box>
  ) : (
    <Box className={classes.inBuildAppMainContent}>
      <EmptyProductResult />
    </Box>
  );
};

export default ProductsList;
ProductsList.prototype = {
  viewMode: PropTypes.string,
  onShowProductDetail: PropTypes.func,
  onClickEditProduct: PropTypes.func,
};

ProductsList.defaultProps = {
  viewMode: 'table',
};