import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableRow from '@material-ui/core/TableRow';
import { timeFromNow } from '../../../../@jumbo/utils/dateHelper';
import { Block, CheckCircleOutline, Delete, Edit, MoreHoriz, Visibility } from '@material-ui/icons';
import CmtDropdownMenu from '../../../../@coremat/CmtDropdownMenu';
import CmtAvatar from '../../../../@coremat/CmtAvatar';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { sentMailToUser, updateUserStatus } from '../../../../redux/actions/Users';

import commonData from 'utils/commonData';

const useStyles = makeStyles(theme => ({
  titleRoot: {
    marginBottom: 2,
    fontSize: 14,
    letterSpacing: 0.25,
    color: theme.palette.common.dark,
  },
}));



const UserListRow = ({ row, isSelected, onRowClick, onUserEdit, onUserDelete, onUserView }) => {
  const classes = useStyles();
  const dispatch = useDispatch();


  const getUserActions = user => {
    const actions = [
      { action: 'view', label: 'View', icon: <Visibility /> },
      { action: 'edit', label: 'Edit', icon: <Edit /> },
      // { action: 'email', label: 'Email', icon: <Mail /> },
    ];
 if(row.roles && !row.roles.find(a => a.name === 'super')){
  if (user.status === 'suspended') {
    actions.push({
      action: 'activate',
      label: 'Reactivate',
      icon: <CheckCircleOutline />,
    });
  } else {
    actions.push({ action: 'suspend', label: 'Suspend', icon: <Block /> });
  }
  actions.push({ action: 'delete', label: 'Delete', icon: <Delete /> });

 }
   
  
    return actions;
  };


  const onUserMenuClick = menu => {
    if (menu.action === 'view') {
      onUserView(row);
    } else if (menu.action === 'edit') {
      onUserEdit(row);
    } else if (menu.action === 'email') {
      dispatch(sentMailToUser());
    } else if (menu.action === 'suspend') {
      dispatch(updateUserStatus({ id: row.id, status: 'suspended' }));
    } else if (menu.action === 'activate') {
      dispatch(updateUserStatus({ id: row.id, status: 'active' }));
    } else if (menu.action === 'delete') {
      onUserDelete(row);
    }
  };

  const labelId = `enhanced-table-checkbox-${row.id}`;
  const isItemSelected = isSelected(row.id);
  const userActions = getUserActions(row);

  return (
    <TableRow
      hover
      onClick={event =>  row.roles && !row.roles.find(a => a.name === 'super') && onRowClick(event, row.id)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.id}
      selected={isItemSelected}>
      <TableCell padding="checkbox">
      { row.roles && !row.roles.find(a => a.name === 'super') && <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} /> }
      </TableCell>
      <TableCell component="th" id={labelId} scope="row" padding="none">
        <Box display="flex" alignItems="center">
          <Box mr={{ xs: 4, md: 5 }}>
            <CmtAvatar size={40} src={`${commonData.staticUrl}${row.dpUrl}`} alt={row.name} />
          </Box>
          <div>
            <Typography className={classes.titleRoot} component="div" variant="h4">
              {String(row.name).toUpperCase()}
            </Typography>
          </div>
        </Box>
      </TableCell>
      <TableCell>{row.email}</TableCell>
       <TableCell>
        {row.status}
      </TableCell> 
      {/* <TableCell>{timeFromNow(row.lastLoginAt)}</TableCell> */}
      <TableCell align="center" onClick={event => event.stopPropagation()}>
  <CmtDropdownMenu items={userActions} onItemClick={(e) => onUserMenuClick(e)} TriggerComponent={<MoreHoriz />} />
      </TableCell>
    </TableRow>
  );
};

export default React.memo(UserListRow);
