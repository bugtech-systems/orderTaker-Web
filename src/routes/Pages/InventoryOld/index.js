import React from 'react';
import GridContainer from '../../../@jumbo/components/GridContainer';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import TextDisplay from '../../../@jumbo/utils/TextDisplay';
import Grid from '@material-ui/core/Grid';
import SidebarButtons from '../../../@jumbo/components/AppLayout/partials/SideBar/SIdebarButtons';
import Divider from '@material-ui/core/Divider';

//Components
import RecentPayments from './RecentPayments';
import ProductList from './PropertiesListing';


const breadcrumbs = [
  { label: <TextDisplay name="Inventory" />, isActive: true },
];

const Dashboard = () => {
  return (
    <PageContainer heading="Inventory" breadcrumbs={breadcrumbs}>
    <GridContainer>
    <Grid item xs={12} xl={12}>
        <ProductList />
      </Grid>
      <Grid item xs={12} xl={12}>
        <RecentPayments />
      </Grid>
     
    </GridContainer>
  </PageContainer>
  );
};

export default Dashboard;
