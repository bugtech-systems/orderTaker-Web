import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableRow from '@material-ui/core/TableRow';
import { timeFromNow } from '../../../../../@jumbo/utils/dateHelper';
import { Block, CheckCircleOutline, Delete, Edit, Mail, MoreHoriz, Visibility } from '@material-ui/icons';
import CmtDropdownMenu from '../../../../../@coremat/CmtDropdownMenu';
import CmtAvatar from '../../../../../@coremat/CmtAvatar';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

//Redux
import { useDispatch } from 'react-redux';
import { sentMailToUser, updateUserStatus } from '../../../../../redux/actions/Users';
import { suspendUser } from '../../../../../redux/actions/Auth';



const useStyles = makeStyles(theme => ({
  titleRoot: {
    marginBottom: 2,
    fontSize: 14,
    letterSpacing: 0.25,
    color: theme.palette.common.dark,
  },
}));

const getUserActions = user => {
  const actions = [
    { action: 'view', label: 'View', icon: <Visibility /> },
    { action: 'edit', label: 'Edit', icon: <Edit /> },
    { action: 'email', label: 'Email', icon: <Mail /> },
  ];

  if (user.status === 'active' || user.status === 'inactive') {
    actions.push({ action: 'suspend', label: 'Suspend', icon: <Block /> });
  } else {
    actions.push({
      action: 'activate',
      label: 'Reactivate',
      icon: <CheckCircleOutline />,
    });
  }

  actions.push({ action: 'delete', label: 'Delete', icon: <Delete /> });
  return actions;
};

const UserListRow = ({ row, isSelected, onRowClick, onUserEdit, onUserDelete, onUserView }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onUserMenuClick = menu => {
    if (menu.action === 'view') {
      onUserView(row);
    } else if (menu.action === 'edit') {
      onUserEdit(row);
    } else if (menu.action === 'email') {
      dispatch(sentMailToUser());
    } else if (menu.action === 'suspend') {
      dispatch(suspendUser(row._id));
    } else if (menu.action === 'activate') {
      dispatch(suspendUser(row._id));
    } else if (menu.action === 'delete') {
      onUserDelete(row);
    }
  };

  const labelId = `enhanced-table-checkbox-${row._id}`;
  const isItemSelected = isSelected(row._id);
  const userActions = getUserActions(row);

  return (
    <TableRow
      hover
      onClick={event => onRowClick(event, row._id)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row._id}
      selected={isItemSelected}>
      <TableCell padding="checkbox">
        <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
      </TableCell>
      <TableCell component="th" id={labelId} scope="row" padding="none">
        <Box display="flex" alignItems="center">
          <Box mr={{ xs: 4, md: 5 }}>
            <CmtAvatar size={40} src={row.dpUrl} alt={row.fullName} />
          </Box>
          <div>
            <Typography className={classes.titleRoot} component="div" variant="h4">
              {row.fullName}
            </Typography>
          </div>
        </Box>
      </TableCell>
      <TableCell>{row.contact}</TableCell>

      <TableCell>{row.role}</TableCell>
      <TableCell>
        {row.status === 'suspended' ? `Suspended by ${row.suspended_by} (${timeFromNow(row.suspended_at)})` : row.status}
      </TableCell>
      <TableCell align="center" onClick={event => event.stopPropagation()}>
        <CmtDropdownMenu items={userActions} onItemClick={onUserMenuClick} TriggerComponent={<MoreHoriz />} />
      </TableCell>
    </TableRow>
  );
};

export default React.memo(UserListRow);
