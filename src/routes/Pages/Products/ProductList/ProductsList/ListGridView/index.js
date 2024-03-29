import React, {useState, useEffect} from 'react';
import ListItem from "../../../../Dashboard/Dashboard/PopularProducts/ListItem";
import { useDispatch, useSelector } from 'react-redux';

import CmtGridView from "../../../../../../@coremat/CmtGridView";
import { Box } from "@material-ui/core";
import { TableCell, TableHead, TablePagination } from '@material-ui/core';
import { getProductsList, setFilterType } from 'redux/actions/ProductApp'

const PopularProducts = () => {
  const dispatch = useDispatch();
  const productApp = useSelector(({productApp}) => productApp);
  const cart = useSelector(({cartApp}) => cartApp);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState([10]);
  const [ prodList, setProdList ] = useState([]);
  
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
    setProdList(pp)
  }, [productApp, cart]);


  const { productsList, filterType, totalProducts } = useSelector(({ productApp }) => productApp);

      const handleChangePage = (event, newPage) => {
      dispatch(setFilterType({...filterType, page: newPage}))
      dispatch(getProductsList({...filterType, page: newPage}))
    };
    
    const handleChangeRowsPerPage = event => {
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
            data={prodList}
          renderRow={(item, index) =>
            <ListItem 
              pageSize={5}
              key={index} 
              item={item} 
            />}
        />
           
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={totalProducts}
          rowsPerPage={filterType.rowsPerPage}
          page={filterType.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </Box>
        
  );
};

export default PopularProducts;
