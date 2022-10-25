import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

import ProductTableHead from './ProductTableHead';
import Table from '@material-ui/core/Table';
import { useSelector } from 'react-redux';
import { TableBody, TableRow, TableCell, TableContainer, TableHead, TablePagination } from '@material-ui/core';
import Paper from "@material-ui/core/Paper";

import ProductCell from './ProductCell';
import CheckedListHeader from './CheckedListHeader';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import useStyles from './index.style';
import NoRecordFound from './NoRecordFound';


//Jumbo
import { getComparator, stableSort } from '../../../../../../@jumbo/utils/tableHelper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread2", 356, 16.0, 49, 3.9),
  createData("Gingerbread3", 356, 16.0, 49, 3.9),
  createData("Gingerbread4", 356, 16.0, 49, 3.9),
  createData("Gingerbread5", 356, 16.0, 49, 3.9),
  createData("Gingerbread6", 356, 16.0, 49, 3.9),
  createData("Gingerbread7", 356, 16.0, 49, 3.9),
  createData("Gingerbread8", 356, 16.0, 49, 3.9),
  createData("Gingerbread9", 356, 16.0, 49, 3.9),
  createData("Gingerbread10", 356, 16.0, 49, 3.9),
  createData("Gingerbread11", 356, 16.0, 49, 3.9),
  createData("Gingerbread12", 356, 16.0, 49, 3.9),
  createData("Gingerbread13", 356, 16.0, 49, 3.9)
];


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
  const [orderBy, setOrderBy] = React.useState('name');
  const [order, setOrder] = React.useState('asc');
  const { productsList } = useSelector(({ productApp }) => productApp);
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
    const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
    const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrderBy(property);
    setOrder(isAsc ? 'desc' : 'asc');
  };

  return (
    <React.Fragment>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
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
