import React, { useEffect, useState } from 'react';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import PageContainer from '../../../../@jumbo/components/PageComponents/layouts/PageContainer';
import TextDisplay from '../../../../@jumbo/utils/TextDisplay';
import Grid from '@material-ui/core/Grid';
import SidebarButtons from '../../../../@jumbo/components/AppLayout/partials/SideBar/SIdebarButtons';
import Divider from '@material-ui/core/Divider';
import makeStyles from '@material-ui/core/styles/makeStyles';



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
import Header from './Header';


//Redux
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetail } from '../../../../redux/actions/ProfileApp';

const useStyles = makeStyles(() => ({
  pageFull: {
    width: '100%',
  },
  profileSidebar: {
    '@media screen and (min-width: 1280px) and (max-width: 1499px)': {
      flexBasis: '100%',
      maxWidth: '100%',
    },
  },
  profileMainContent: {
    '@media screen and (min-width: 1280px) and (max-width: 1499px)': {
      flexBasis: '100%',
      maxWidth: '100%',
    },
  },
}));

const breadcrumbs = [
  { label: <TextDisplay name="Store" />, link: '/' },
  { label: <TextDisplay name="Dashboard" />, isActive: true },
];

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState('about');
  const { userDetail } = useSelector(({ profileApp }) => profileApp);


  useEffect(() => {
    dispatch(getUserDetail());
  }, [dispatch]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };


  console.log(userDetail)

  return (
    <PageContainer 
    // heading={"Dashboard"} 
    // breadcrumbs={breadcrumbs}
    >

      <GridContainer>
      <Grid item xs={12} sm={12} md={12}>
      {userDetail && <Header classes={classes} userDetail={userDetail} 
          tabValue={tabValue} handleTabChange={handleTabChange} 
              heading={"Dashboard"} 
               breadcrumbs={breadcrumbs}
          />}
        </Grid>
   
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
