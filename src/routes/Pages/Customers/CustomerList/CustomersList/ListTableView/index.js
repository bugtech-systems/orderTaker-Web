import React, {useState, useEffect} from 'react';

import ListHeader from './ListHeader';
import Table from '@material-ui/core/Table';
import { useSelector } from 'react-redux';
import {TableBody, TableContainer, TablePagination } from '@material-ui/core';
import CustomerCell from './CustomerCell';
import CheckedListHeader from './CheckedListHeader';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Paper from "@material-ui/core/Paper";
import useStyles from './index.style';

const ListTableView = ({
  checkedCustomers,
  handleCellCheckBox,
  handleHeaderCheckBox,
  updateCheckedCustomers,
  onShowCustomerDetail,
  onClickEditCustomer,
  onClickAddStocks,
  onDelete
}) => {
  const classes = useStyles();

  const { filterType, customersList } = useSelector(({ customerApp }) => customerApp);
  // const { customersList } = useSelector((state) => state.customersReducer);
  const [selected, setSelected] = React.useState([]);

  const [orderBy, setOrderBy] = React.useState('name');
  const [order, setOrder] = React.useState('asc');
  const [page, setPage] = React.useState(0);
  const [customers, setCustomers] = useState([])
  
  const fetchData = async () => {
    const response = await fetch("http://localhost:3001/api/customers")
    const data = await response.json()
     setCustomers(data)
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
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrderBy(property);
      setOrder(isAsc ? 'desc' : 'asc');
    };
    
    const handleSelectAllClick = event => {
      if (event.target.checked) {
        const newSelected = customers.map(n => n.id);
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
    const isSelected = id => selected.indexOf(id) !== -1;
  
  return (
    <React.Fragment>
      {checkedCustomers.length > 0 && (
        <CheckedListHeader
          checkedCustomers={checkedCustomers}
          handleHeaderCheckBox={handleHeaderCheckBox}
          updateCheckedCustomers={updateCheckedCustomers}
          onDelete={onDelete}
        />
      )}
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
                {checkedCustomers.length === 0 && (
                     <customersList
                     classes={classes}
                     numSelected={checkedCustomers.length}
                     order={order}
                     orderBy={orderBy}
                     onSelectAllClick={handleHeaderCheckBox}
                     onRequestSort={handleRequestSort}
                     rowCount={customersList.length}

                   />
          )}
          <TableBody>
       {customers
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((data, index) => (
                    <CustomerCell
                    key={index}
                    customer={data}
                    checkedCustomers={checkedCustomers}
                    handleCellCheckBox={handleCellCheckBox}
                    onShowCustomerDetail={onShowCustomerDetail}
                    onClickEditCustomer={onClickEditCustomer}
                    onClickAddStocks={onClickAddStocks}
                    onDelete={onDelete}
                  />
            ))}
          </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[1, 5, 15, 20, 50]}
        component="div"
        count={customers.length}
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
  checkedCustomers: PropTypes.array,
  handleCellCheckBox: PropTypes.func,
  handleHeaderCheckBox: PropTypes.func,
  updateCheckedCustomers: PropTypes.func,
  onShowCustomerDetail: PropTypes.func,
  onClickEditCustomer: PropTypes.func,
  onClickAddStocks: PropTypes.func,
  onDelete: PropTypes.func
};

ListTableView.defaultProps = {
  checkedCustomers: [],
};