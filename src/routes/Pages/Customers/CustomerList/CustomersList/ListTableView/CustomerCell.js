import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import CmtAvatar from '../../../../../../@coremat/CmtAvatar';
import Typography from '@material-ui/core/Typography';
import useStyles from '../CustomerCell.style';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import CustomerCellOptions from './CustomerCellOptions';

const CustomerCell = ({ customer, checkedCustomers, handleCellCheckBox, onShowCustomerDetail, onClickEditCustomer }) => {
  const classes = useStyles();
  const { id, fullName, phones, limit, balance, dpUrl } = customer;
  return (
    <TableRow className={classes.tableRowRoot} onClick={() => onShowCustomerDetail(customer)}>
      <TableCell className={classes.tableCellRoot}>
        <Box display="flex" alignItems="center">
          <Box component="span" mr={2} onClick={e => e.stopPropagation()}>
            <Checkbox
              color="primary"
              checked={checkedCustomers.includes(id)}
              onChange={event => handleCellCheckBox(event.target.checked, id)}
            />
          </Box>
          <Box display="flex" alignItems="center">
            <Box mr={{ xs: 4, md: 5 }}>
              <CmtAvatar size={40} src={dpUrl} alt={fullName} />
            </Box>

            <Box>
              <Typography className={classes.titleRoot} component="div" variant="h4">
                {fullName}
              </Typography>
              <Typography className={classes.subTitleRoot}>{phones[0].phone}</Typography>
            </Box>
          </Box>
        </Box>
      </TableCell>
      <TableCell className={classes.tableCellRoot}>{limit}</TableCell>
      <TableCell className={classes.tableCellRoot}>{balance}</TableCell>
      {/* <TableCell className={classes.tableCellRoot}>{company}</TableCell> */}
      <TableCell className={clsx(classes.tableCellRoot, classes.tableCellAction)}>
        <CustomerCellOptions customer={customer} onClickEditCustomer={onClickEditCustomer} />
      </TableCell>
    </TableRow>
  );
};

export default CustomerCell;

CustomerCell.prototype = {
  customer: PropTypes.object.isRequired,
  checkedCustomers: PropTypes.array,
  handleCellCheckBox: PropTypes.func,
  onShowCustomerDetail: PropTypes.func,
  onClickEditCustomer: PropTypes.func,
};

CustomerCell.defaultProps = {
  checkedCustomers: [],
};
