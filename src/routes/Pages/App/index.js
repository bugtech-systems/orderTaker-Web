import React from 'react';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import Cashier from './Cashier';
import GridContainer from '../../../@jumbo/components/GridContainer';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';



const breadcrumbs = [
    { label: 'Dashboard', link: '/' },
    { label: 'Cashier', link: '/cashier', isActive: true },
  ];

const Dashboard = () => {
    return (
      <PageContainer heading="Cashier"  breadcrumbs={breadcrumbs}>
       <GridContainer>
      <Grid item xs={12} lg={12}>
        <Cashier/>
        </Grid>
        </GridContainer>
      </PageContainer>
    );
  };
export default Dashboard;