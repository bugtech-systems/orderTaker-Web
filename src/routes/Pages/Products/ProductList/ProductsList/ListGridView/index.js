import React, {useState, useEffect} from 'react';
import ListItem from "./ListItem";
import CmtGridView from "../../../../../../@coremat/CmtGridView";
import { Box } from "@material-ui/core";
import { TableBody, Table, TableRow, TableCell, TableContainer, TableHead, TablePagination } from '@material-ui/core';

const PopularProducts = ({productsList}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState([10]);
  
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
        </Box>
        
  );
};

export default PopularProducts;
