import React from 'react';
import { Grid } from '@material-ui/core';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';

//Components
import CustomerList from './CustomerList';

const breadcrumbs = [{ label: 'Customers', link: '/customers' }];

const Sales = () => {
  return (
    <PageContainer heading="Customer List" breadcrumbs={breadcrumbs}>
      <CustomerList />
    </PageContainer>
  );
};

export default Sales;
