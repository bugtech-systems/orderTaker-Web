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
import { setCurrentCustomer, deleteCustomer } from '../../../../redux/actions/Customer';
import ConfirmDialog from '../../../../@jumbo/components/Common/ConfirmDialog';



const Customer = () => {
  const classes = useStyles();
  const { isSideBarCollapsed } = useSelector(({ customerApp }) => customerApp);
  const [viewMode, setViewMode] = useState('table');
  const [showCustomerDetail, setShowCustomerDetail] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selected, setSelected] = useState(false);



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

  const onDelete = (data) => {
    console.log(data)
    setSelected(data);
    setConfirmDelete(true);

  }


  const handleCancelDelete = (data) => {
    setSelected([]);
    setConfirmDelete(false)
  }

  const handleConfirmDelete = () => {
    dispatch(deleteCustomer(selected))
    setSelected([]);
    setConfirmDelete(false)
  }

  return (
    <Box className={classes.inBuildAppCard}>
      <AppHeader onChangeViewMode={onChangeViewMode} viewMode={viewMode} />
      <Box className={clsx(classes.inBuildAppContainer, isSideBarCollapsed ? 'collapsed' : '')}>
        <Sidebar onClickCreateCustomer={onClickCreateCustomer} />
        <CustomersList
          viewMode={viewMode}
          onDelete={onDelete}
          onShowCustomerDetail={onShowCustomerDetail}
          onClickEditCustomer={onClickEditCustomer}
        />
      </Box>
      {showCustomerDetail && <CustomerDetail open={showCustomerDetail} handleDialog={onHideCustomerDetail} />}
      {openCreateDialog && <CreateCustomer open={openCreateDialog} handleDialog={onCloseComposeDialog} />}
      <ConfirmDialog
        open={confirmDelete}
        title={`Confirm delete`}
        content={'Are you sure, you want to  delete?'}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
};

export default Customer;
