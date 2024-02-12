import React, {useState, useEffect} from 'react';

import CmtCard from '../../../../../@coremat/CmtCard';
import CmtCardHeader from '../../../../../@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '../../../../../@coremat/CmtCard/CmtCardContent';
import ListItem from './ListItem';
import CmtGridView from '../../../../../@coremat/CmtGridView';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { TableBody, Table, TableRow, TableCell, TableContainer, TableHead, TablePagination } from '@material-ui/core';

import { useSelector } from 'react-redux';


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
            renderRow={(item, index) => <ListItem key={index} item={item} />}
          />
              {/* <TablePagination
                rowsPerPageOptions={[5, 20, 50]}
                component="div"
                counts={popular.count}
                count={popular.length}
                rowsPerPage={rowsPerPage}
                page={page}
                
              /> */}
        </CmtCardContent>
    </CmtCard>
  );
};

export default PopularProducts;