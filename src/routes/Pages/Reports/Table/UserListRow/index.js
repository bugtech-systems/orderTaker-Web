import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableRow from '@material-ui/core/TableRow';
import { timeFromNow } from '../../../../../@jumbo/utils/dateHelper';
import { Block, CheckCircleOutline, Delete, Edit, MoreHoriz, Visibility } from '@material-ui/icons';
import CmtDropdownMenu from '../../../../../@coremat/CmtDropdownMenu';
import CmtAvatar from '../../../../../@coremat/CmtAvatar';
import { Box, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { sentMailToUser, updateUserStatus } from '../../../../../redux/actions/Users';

import LaunchIcon from '@material-ui/icons/Launch';
import { SET_ACTION, SET_ACTIVE_OPTION, SET_DRAWER_OPEN, UPDATE_CART } from 'redux/actions/types';

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





  const handleClick = (val) => {
      dispatch({type: UPDATE_CART, payload: {...val, cart_items: val.order_items}}); 
      dispatch({type: SET_ACTIVE_OPTION, payload: 'cart'});
      dispatch({type: SET_ACTION, payload: val.isPaid ? 'paidCart' : 'viewCart'});
      dispatch({type: SET_DRAWER_OPEN, payload: true});
  }



  const labelId = `enhanced-table-checkbox-${row.id}`;
  const isItemSelected = isSelected(row.id);
  return (
    <TableRow
      hover
      onClick={event => handleClick(row)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.id}
      selected={isItemSelected}>
      <TableCell padding="checkbox">
    {/* <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} /> */}
      </TableCell>
      <TableCell component="th" id={labelId} scope="row" padding="none">
        <Box display="flex" alignItems="center">
          <div>
            <Typography className={classes.titleRoot} component="div" variant="h4">
              {String(row.order_no).toUpperCase()}
            </Typography>
            <Typography component="span" variant="h6" color={(String(row.order_status).toLowerCase() === 'paid' || row.isPaid) ? 'primary' : String(row.order_status).toLowerCase() === 'unpaid' ? 'secondary' :  'textPrimary'}>
              {(String(row.order_status).toLowerCase() === 'paid' || row.isPaid) ? 'PAID' : String(row.order_no).toUpperCase()}
            </Typography>
          </div>
        </Box>
      </TableCell>
      <TableCell>₱{Number(row.amount_due).toFixed(2)}</TableCell>
       <TableCell>
        {row.recordedAt}
      </TableCell> 
      {/* <TableCell>{timeFromNow(row.lastLoginAt)}</TableCell> */}
      <TableCell align="center" onClick={event => event.stopPropagation()}>
        <IconButton onClick={() => handleClick(row)}>
          <LaunchIcon color='primary'/>
        </IconButton>
  {/* <CmtDropdownMenu items={userActions} onItemClick={(e) => onUserMenuClick(e)} TriggerComponent={<MoreHoriz />} /> */}
      </TableCell>
    </TableRow>
  );
};

export default React.memo(UserListRow);
