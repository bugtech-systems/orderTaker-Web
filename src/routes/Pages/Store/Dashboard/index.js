import React from 'react';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import PageContainer from '../../../../@jumbo/components/PageComponents/layouts/PageContainer';
import TextDisplay from '../../../../@jumbo/utils/TextDisplay';
import Grid from '@material-ui/core/Grid';
import SidebarButtons from '../../../../@jumbo/components/AppLayout/partials/SideBar/SIdebarButtons';
import Divider from '@material-ui/core/Divider';

//Components
import BitcoinPurchaseHistory from './BitcoinPurchaseHistory';
import RipplePurchaseHistory from './RipplePurchaseHistory';
import EtheriumPurchaseHistory from './EtheriumPurchaseHistory';
import LitecoinPurchaseHistory from './LitecoinPurchaseHistory';
import PortfolioBalance from './PortfolioBalance';
import RevenueSummary from './RevenueSummary';
import RecentPayments from './RecentPayments';
import OrderHistory from './OrderHistory';
import PopularCustomers from './PopularCustomers';

const breadcrumbs = [
  { label: <TextDisplay name="Store" />, link: '/' },
  { label: <TextDisplay name="Dashboard" />, isActive: true },
];

const Dashboard = () => {
  return (
    <PageContainer heading={"Dashboard"} breadcrumbs={breadcrumbs}>
      <GridContainer>
      <Grid item xs={12} sm={6} md={3}>
          <BitcoinPurchaseHistory />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <RipplePurchaseHistory />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <EtheriumPurchaseHistory />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <LitecoinPurchaseHistory />
        </Grid>
        <Grid item xs={12} lg={6}>
          <PortfolioBalance />
        </Grid>
        <Grid item xs={12} lg={6}>
          <RevenueSummary />
        </Grid>
        <Grid item xs={12} xl={12}>
          <PopularCustomers />
        </Grid>
        <Grid item xs={12} xl={12}>
          <RecentPayments />
        </Grid>
         <Grid item xs={12} xl={12}>
             <OrderHistory />
        </Grid>
    {/*    <Grid item xs={12} xl={12}>
        <CurrentPlan />
        </Grid> */}
      </GridContainer>
    </PageContainer>
  );
};

export default Dashboard;
