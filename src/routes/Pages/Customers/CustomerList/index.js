import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import useStyles from './index.style';
import AppHeader from './AppHeader';
import clsx from 'clsx';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import CustomersList from './CustomersList';
import CustomerDetail from './CustomerDetail';
import CreateCustomer from './CreateCustomer';
import { setCurrentCustomer } from '../../../../redux/actions/Customer';

const Customer = () => {
  const classes = useStyles();
  const { isSideBarCollapsed } = useSelector(({ customerApp }) => customerApp);
  const [viewMode, setViewMode] = useState('table');
  const [showCustomerDetail, setShowCustomerDetail] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const dispatch = useDispatch();

  const onChangeViewMode = mode => {
    setViewMode(mode);
  };

  const onShowCustomerDetail = customer => {
    dispatch(setCurrentCustomer(customer));
    setShowCustomerDetail(true);
  };

  const onHideCustomerDetail = () => {
    dispatch(setCurrentCustomer(null));
    setShowCustomerDetail(false);
  };

  const onClickCreateCustomer = () => {
    setOpenCreateDialog(true);
  };

  const onClickEditCustomer = customer => {
    dispatch(setCurrentCustomer(customer));
    setOpenCreateDialog(true);
  };

  const onCloseComposeDialog = () => {
    dispatch(setCurrentCustomer(null));
    setOpenCreateDialog(false);
  };

  return (
    <Box className={classes.inBuildAppCard}>
      <AppHeader onChangeViewMode={onChangeViewMode} viewMode={viewMode} />
      <Box className={clsx(classes.inBuildAppContainer, isSideBarCollapsed ? 'collapsed' : '')}>
        <Sidebar onClickCreateCustomer={onClickCreateCustomer} />
        <CustomersList
          viewMode={viewMode}
          onShowCustomerDetail={onShowCustomerDetail}
          onClickEditCustomer={onClickEditCustomer}
        />
      </Box>
      {showCustomerDetail && <CustomerDetail open={showCustomerDetail} handleDialog={onHideCustomerDetail} />}
      {openCreateDialog && <CreateCustomer open={openCreateDialog} handleDialog={onCloseComposeDialog} />}
    </Box>
  );
};

export default Customer;
