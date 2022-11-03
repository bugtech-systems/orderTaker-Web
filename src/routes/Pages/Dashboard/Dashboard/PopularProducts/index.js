import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';

import CmtCard from '../../../../../@coremat/CmtCard';
import CmtCardHeader from '../../../../../@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '../../../../../@coremat/CmtCard/CmtCardContent';
import ListItem from './ListItem';
import CmtGridView from '../../../../../@coremat/CmtGridView';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { TableBody, Table, TableRow, TableCell, TableContainer, TableHead, TablePagination } from '@material-ui/core';

const PopularProducts = ({ productsList }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState([10]);
  
  return (
    <CmtCard>
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
      
      <CmtCardContent>
          <CmtGridView
              itemPadding={10}
              responsive={{
                xs: 1,
                sm: 1,
                md: 2,
                lg: 2,
                xl: 3,
              }}
              data={productsList}
            renderRow={(item, index) => <ListItem key={index} item={item} />}
          />
              <TablePagination
                rowsPerPageOptions={[5, 20, 50]}
                component="div"
                counts={productsList.count}
                count={productsList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                
              />
        </CmtCardContent>
    </CmtCard>
  );
};

export default PopularProducts;