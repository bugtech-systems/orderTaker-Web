import React, {useState, useEffect} from 'react';
import ListItem from "./ListItem";
import { useDispatch, useSelector } from 'react-redux';

import CmtGridView from "../../../../../../@coremat/CmtGridView";
import { Box } from "@material-ui/core";
import { TableBody, Table, TableRow, TableCell, TableContainer, TableHead, TablePagination } from '@material-ui/core';
import { getProductsList, setFilterType } from 'redux/actions/ProductApp'

const PopularProducts = () => {
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState([10]);
  const [products, setProducts] = useState([])
  
  const { productsList, filterType, totalProducts } = useSelector(({ productApp }) => productApp);
  
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
    
        const handlePageChange = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleRowsPerPageChange = event => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    
    useEffect(() => {
      setProducts(productsList)
    }, [productsList])
  
  return (
    <Box p={5}>
        <CmtGridView
          itemPadding={24}
            responsive={{
              xs: 1,
              sm: 1,
              md: 2,
              lg: 2,
              xl: 3
            }}
            data={productsList}
          renderRow={(item, index) =>
            <ListItem 
              pageSize={5}
              key={index} 
              item={item} 
              product={item}
              // product={productsList}
            />}
        />
           
        <TablePagination
          rowsPerPageOptions={[5, 20, 50]}
          component="div"
          counts={productsList.count}
          // count={productsList.length}
          count={totalProducts}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </Box>
        
  );
};

export default PopularProducts;
