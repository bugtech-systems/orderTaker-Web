import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CmtCard from '../../../../../@coremat/CmtCard';
import CmtCardHeader from '../../../../../@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '../../../../../@coremat/CmtCard/CmtCardContent';
import ListItem from './ListItem';
import CmtGridView from '../../../../../@coremat/CmtGridView';
import { Box, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { TableBody, Table, TableRow, TableCell, TableContainer, TableHead, TablePagination } from '@material-ui/core';
import { getProductsList, setFilterType } from 'redux/actions/ProductApp'

const PopularProducts = () => {
  const dashboard = useSelector(({dashboard}) => dashboard);
  const cart = useSelector(({cartApp}) => cartApp);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState([10]);
  const [popular, setPopular] = useState([]);

useEffect(() => {
  const { popularProducts} = dashboard;
  const {cart_items} = cart;

  const pp = popularProducts.map(a => {
    let ind = cart_items.find(ab => ab.productId === a.id);

    return ind ? {
      ...a, 
      stocks: ind.stocks
    } : a
  })
  setPopular(pp)
}, [dashboard, cart]);

const dispatch = useDispatch();
  
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
    <CmtCard >
      <CmtCardHeader
        className="pt-4"
        title="Popular Products"
        titleProps={{
          variant: 'h4',
          component: 'div',
        }}>
        <Box clone>
          <Button component={Link} to="/products" color="primary">
            <span className="ml-2">Go to Products list</span>
          </Button>
        </Box>
      </CmtCardHeader>
      <CmtCardContent 
      style={{
        height: '400px',
        overflow: 'auto'
      }}
      >
          <CmtGridView
              itemPadding={10}
              responsive={{
                xs: 1,
                sm: 1,
                md: 2,
                lg: 2,
                xl: 3,
              }}
              data={popular}
            renderRow={(item, index) =>  
                  <ListItem 
                  pageSize={5}
                  key={index} 
                  item={item} 
                  product={item}
                />}
          />
        <TablePagination
          rowsPerPageOptions={[10, 50, 100]}
          component="div"
          count={totalProducts}
          rowsPerPage={filterType.rowsPerPage}
          page={filterType.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </CmtCardContent>
    </CmtCard>
  );
};

export default PopularProducts;