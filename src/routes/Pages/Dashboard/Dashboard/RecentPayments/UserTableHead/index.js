import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import PropTypes from 'prop-types';
import React from 'react';

const headCells = [
  // {
  //   id: 'order_no',
  //   numeric: false,
  //   disablePadding: true,
  //   label: 'Order #',
  // },
  { id: 'order_no', numeric: false, disablePadding: false, label: 'Order #' },
  { id: 'amount_due', numeric: true, disablePadding: false, label: 'Total Amount' },
  { id:   'recordedAt', numeric: false, disablePadding: false, label: 'Date' },
  { id:   'amount_payable', numeric: true, disablePadding: false, label: 'Amount Payable', align: 'right' },

  //  {
  //   id: 'lastLoginAt',
  //   numeric: false,
  //   disablePadding: false,
  //   label: 'Last Login',
  // },
];


function UserTableHead({ classes, onSelectAllClick, order, orderBy, onRequestSort }) {
  const onSortOrderChange = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell> */}
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.align ? headCell.align : headCell.numeric ? 'center' : 'left'}
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
      </TableRow>
    </TableHead>
  );
}

UserTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default React.memo(UserTableHead);
