import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useState } from 'react';

const headCellsOrders = [
  {
    id: 'order_no',
    numeric: false,
    disablePadding: true,
    label: 'ORDER #',
  },
  { id: 'amount_due', numeric: true, disablePadding: false, label: 'TOTAL' },
  { id:   'recordedAt', numeric: true, disablePadding: false, label: 'DATE' },
  //  {
  //   id: 'lastLoginAt',
  //   numeric: false,
  //   disablePadding: false,
  //   label: 'Last Login',
  // },
];

const headCellsExpenses = [
  {
    id: 'ref_no',
    numeric: false,
    disablePadding: true,
    label: 'Ref #',
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: true,
    label: 'Description',
  },
  { id: 'amount', numeric: false, disablePadding: true, label: 'TOTAL' },
  { id:   'recordedAt', numeric: false, disablePadding: true, label: 'DATE' },
];



function UserTableHead({ classes, header, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort }) {
  const [headerCells, setHeaderCells] = useState([]);
 
  const onSortOrderChange = property => event => {
    onRequestSort(event, property);
  };


  useEffect(() => {
      if(header === 'expenses'){
        setHeaderCells(headCellsExpenses)
      } else {
        setHeaderCells(headCellsOrders)
      }
  }, [header])

  return (
    <TableHead>
      <TableRow>
        <TableCell 
           className={classes.tableCell}
        >
          {/* <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          /> */}
        </TableCell>
        {headerCells.map(headCell => (
          <TableCell
          className={classes.tableCell}
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={onSortOrderChange(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="center"
         className={classes.tableCell}
        ></TableCell> 
      </TableRow>
    </TableHead>
  );
}

UserTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default React.memo(UserTableHead);
