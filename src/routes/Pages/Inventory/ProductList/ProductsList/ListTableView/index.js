import React, {useState, useEffect} from 'react';

import ProductTableHead from './ProductTableHead';
import Table from '@material-ui/core/Table';
import { useSelector } from 'react-redux';
import { TableBody, TableRow, TableCell, TableContainer, TableHead, TablePagination } from '@material-ui/core';
import Paper from "@material-ui/core/Paper";

import ProductCell from './ProductCell';
import CheckedListHeader from './CheckedListHeader';
import PropTypes from 'prop-types';
import useStyles from './index.style';
import NoRecordFound from './NoRecordFound';

//Jumbo
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
  const { users } = useSelector((state) => state.usersReducer);
  const { userDialog } = useSelector((state) => state.uiReducer);
  const [selected, setSelected] = React.useState([]);

  const [orderBy, setOrderBy] = React.useState('name');
  const [order, setOrder] = React.useState('asc');
  const { productsList } = useSelector(({ productApp }) => productApp);
  const [page, setPage] = React.useState(0);
  const [products, setProducts] = useState([])
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [selectedUser, setSelectedUser] = useState({ name: '' });
  // const [usersFetched, setUsersFetched] = useState(false);
  // const [currentUser, setCurrent] = useState({});
  
  const fetchData = async () => {
  const response = await fetch("http://localhost:3001/api/products")
  const data = await response.json()
   setProducts(data)
  //  setProducts(newProducts)
  }
  useEffect(() => {
    fetchData()
  }, [])
  
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
    // const emptyRows =
    // rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrderBy(property);
    setOrder(isAsc ? 'desc' : 'asc');
  };
  
    const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelected = users.map(n => n.id);
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
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
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
                      {/* {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )} */}
          </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[1, 10, 30, 50]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
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
