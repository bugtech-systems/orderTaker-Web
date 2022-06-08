import React from 'react';
import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import PageContainer from '../../../../@jumbo/components/PageComponents/layouts/PageContainer';

//Components
import CustomerList from './CustomerList';



const breadcrumbs = [
  { label: 'Store', link: '/' },
  { label: 'Customer List', link: '/store/customers', isActive: true },
];

const ListingDashboard = () => {
  return (
    <PageContainer heading="Customer List" breadcrumbs={breadcrumbs}>
      <GridContainer>
        <Grid item xs={12} lg={12}>
            <CustomerList />
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default ListingDashboard;
