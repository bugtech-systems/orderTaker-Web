import React, { useEffect, useState } from 'react';
import { Paper, Table, TableCell, TableContainer, TableRow } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import UserListRow from './UserListRow';
import UserTableHead from './UserTableHead';
import UserTableToolbar from './UserTableToolbar';
import { getComparator, stableSort } from '../../../../@jumbo/utils/tableHelper';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUsers, setCurrentUser } from '../../../../redux/actions/Users';
import ConfirmDialog from '../../../../@jumbo/components/Common/ConfirmDialog';
import { useDebounce } from '../../../../@jumbo/utils/commonHelper';
import useStyles from './index.style';
import NoRecordFound from './NoRecordFound';
import AddEdit from './AddEdit';
import { SET_EXPENSE_DIALOG, SET_USER_DIALOG } from 'redux/actions/types';
import { getOrders, setFilterType } from 'redux/actions/OrderApp';

const UsersModule = ({project, startDate, endDate}) => {
  const classes = useStyles();
  const { users } = useSelector((state) => state.usersReducer);
  const { expenses } = useSelector(({dataReducer}) => dataReducer);
  const { orders,  filterType, count } = useSelector(({orderApp}) => orderApp);
  const [tableData, setTableData] = useState([]);
  const [orderBy, setOrderBy] = React.useState('name');
  const [order, setOrder] = React.useState('asc');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState([]);
  const [current, setCurrent] = useState({});
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState({ name: '' });
  const [usersFetched, setUsersFetched] = useState(false);
  const [isFilterApplied, setFilterApplied] = useState(false);
  const [filterOptions, setFilterOptions] = React.useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();



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
    dispatch(setFilterType({
      ...filterType,
      searchText: searchTerm,
      page: newPage
    }));
    dispatch(getOrders({
      ...filterType,
      searchText: searchTerm,
      page: newPage
    }));
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);

    dispatch(setFilterType({
      ...filterType,
      searchText: searchTerm,
      page: 0,
      rowsPerPage: parseInt(event.target.value, 10)
    }));

    dispatch(getOrders({
      ...filterType,
      searchText: searchTerm,
      page: 0,
      rowsPerPage: parseInt(event.target.value, 10)
    }));

  };

  const handleUserView = user => {
    dispatch(setCurrentUser(user));
  };

  const handleUserEdit = user => {
    dispatch(setCurrentUser(user));
    dispatch({type: SET_USER_DIALOG, payload: true})
  };

  const handleUserDelete = user => {
    setSelectedUser(user);
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    setOpenConfirmDialog(false);
    dispatch(deleteUser(selectedUser.id));
  };

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
  };

  const isSelected = id => selected.indexOf(id) !== -1;
  

  const handleSearchTerm = (e) => {
    e.preventDefault();
    dispatch(setFilterType({
      ...filterType,
      page: 0,
      searchText: searchTerm
    }));
    dispatch(getOrders({
      ...filterType,
      page: 0,
      searchText: searchTerm
    }));

  }


  useEffect(() => {
    dispatch(getOrders({
      page: 0,
      rowsPerPage: 10
    }));
  }, []);

    useEffect(() => {
      if(project.value === 'orders'){
        setTableData(orders);
      }

      if(project.value === 'expenses'){
        setTableData(expenses);
      }
    },[orders, project, expenses])



  return (
    <div className={classes.root}>
      <AddEdit 
          data={current}
      />
      <Paper className={classes.paper}>
        <UserTableToolbar
          selected={selected}
          setSelected={setSelected}
          onAdd={(e) => 
            dispatch({type: SET_EXPENSE_DIALOG, payload: true})
          }
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          project={project}
          handleSearch={handleSearchTerm}
        />
        <TableContainer className={classes.container}>
          <Table stickyHeader className={classes.table} aria-labelledby="tableTitle" aria-label="sticky enhanced table">
            <UserTableHead
              header={project.value}
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={tableData.length}
            />
            <TableBody>
              {!!tableData.length ? (
                stableSort(tableData, getComparator(order, orderBy))
                  .map((row, index) => (
                    <UserListRow
                      key={index}
                      row={row}
                      onRowClick={handleRowClick}
                      onUserEdit={handleUserEdit}
                      onUserDelete={handleUserDelete}
                      onUserView={handleUserView}
                      isSelected={isSelected}
                    />
                  ))
              ) : (
                <TableRow style={{ height: 43 * 6 }}>
                  <TableCell colSpan={7} rowSpan={10}>
                    {isFilterApplied ? (
                      <NoRecordFound>There are no records found with your filter.</NoRecordFound>
                    ) : (
                      <NoRecordFound>{usersFetched ? 'There are no records found.' : 'Loading users...'}</NoRecordFound>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={filterType.page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>


      <ConfirmDialog
        open={openConfirmDialog}
        title={`Confirm delete ${selectedUser.name}`}
        content={'Are you sure, you want to  delete this user?'}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />

    </div>
  );
};

export default UsersModule;
 