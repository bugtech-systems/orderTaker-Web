import React, {useState, useEffect} from 'react';

import ProductTableHead from './ProductTableHead';
import { useSelector } from 'react-redux';
import { TableBody, Table, TableRow, TableCell, TableContainer, TableHead, TablePagination } from '@material-ui/core';
import Paper from "@material-ui/core/Paper";
import ProductCell from './ProductCell';
import CheckedListHeader from './CheckedListHeader';
import PropTypes from 'prop-types';
import useStyles from './index.style';
import NoRecordFound from './NoRecordFound';
import Box from '@material-ui/core/Box';

import { getComparator, stableSort } from '../../../../../../@jumbo/utils/tableHelper';

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
  const [selected, setSelected] = React.useState([]);

  const [orderBy, setOrderBy] = React.useState('name');
  const [order, setOrder] = React.useState('asc');
  const { productsList } = useSelector(({ productApp }) => productApp);
  const [page, setPage] = React.useState(0);
  const [counts, setCounts] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [products, setProducts] = useState([]);
  const [isLoaded, setisLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [rowsPerPage, setRowsPerPage] = useState([10]);

  
  const fetchData = async () => {
     setisLoaded(true);
    // const response = await fetch("http://localhost:3001/api/products")
    // const response = await fetch("http://localhost:3001/api/products?")
    const response = await fetch("http://localhost:3001/api/products?search_query=${keyword}&page=${page}&limit=${limit});")
    const data = await response.json()
     setProducts(data)
    }
    useEffect(() => {
    setIsLoading(true);
      fetchData()
    }, [])
  
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
    const handleChange = (event, value) => {
    setPage(value);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
    const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, products.length - page * rowsPerPage);

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
      <Box className="Cmt-table-responsive">
        <TableContainer component={Paper}>
          {/* <Table className={classes.table} aria-label="simple table"> */}
              <Table>
                    {checkedProducts.length === 0 && (
                         <ProductTableHead
                         classes={classes}
                         numSelected={checkedProducts.length}
                         order={order}
                         orderBy={orderBy}
                         onSelectAllClick={handleHeaderCheckBox}
                         onRequestSort={handleRequestSort}
                         rowCount={productsList.length}
    
                       />
              )}
              <TableBody>
           {!!productsList.length ? (
             stableSort(productsList, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((data, row, index) => (
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
                  ))
                ) : (
                <TableRow style={{ height: 53 * 6 }}>
                  <TableCell colSpan={7} rowSpan={10}>
                      <NoRecordFound>There are no records found with your filter.</NoRecordFound>
                  </TableCell>
              </TableRow>
              ) 
              }
              </TableBody>
          </Table>
          {isLoaded ? (
          
          <TablePagination
            rowsPerPageOptions={[10, 30, 50]}
            component="div"
            counts={products.counts}
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChange={handleChange}
            handlePageChange={handlePageChange}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
          ) : (
                  <div>
                    </div>
            )}
        </TableContainer>
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
  onClickAddStocks: PropTypes.func,
  onDelete: PropTypes.func
};

ListTableView.defaultProps = {
  checkedProducts: [],
};