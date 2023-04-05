import React from 'react';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import GridContainer from '../../../@jumbo/components/GridContainer';
import { Grid } from '@material-ui/core';

//Components
import Users from './Users';


const breadcrumbs = [
  { label: 'Dashboard', link: '/' },
  { label: 'User Management', link: '/users' }
];

const Products = () => {
  return (
    <PageContainer heading="User Management" breadcrumbs={breadcrumbs}>
         <GridContainer>
        <Grid item xs={12} xl={12}>
        <Users />
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default Products;
