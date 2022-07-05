import React, { useEffect, useState } from 'react';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import PageContainer from '../../../../@jumbo/components/PageComponents/layouts/PageContainer';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';

//DashBoard Components
import CardWidget from './CardWidget';
import OurStore from './OurStore';
import CalendarEvents from './CalendarEvents';
import PopularAgents from './PopularAgents';
import RecentPayments from './RecentPayments';

//Icons
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import StarIcon from '@material-ui/icons/Star';
import ContactPhone from '@material-ui/icons/ContactPhone';

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
  // { label: 'Dashboard', link: '/' }
];

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState('about');
  const { business } = useSelector(({ auth }) => auth);

  // useEffect(() => {
  //   // dispatch(getUserDetail());
  // }, [dispatch]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  console.log(business);

  return (
    <PageContainer heading={'DASHBOARD'} breadcrumbs={breadcrumbs}>
      <GridContainer>
        {/* Business Profile Component - Top left side   */}
        <Grid item xs={12} sm={6}>
          <OurStore
            backgroundColor="#6200EE"
            icon={<StarIcon style={{ color: '#ffffff' }} />}
            title={20}
            subTitle="PRODUCTS"
            Link="/products"
          />
        </Grid>
        {/* Business CalendarEvents - Top right side */}
        <Grid item xs={12} sm={6}>
          <CalendarEvents
            backgroundColor="#6200EE"
            icon={<StarIcon style={{ color: '#ffffff' }} />}
            title={20}
            subTitle="PRODUCTS"
            Link="/products"
          />
        </Grid>
        {/* Easy Access Widget Portion */}
        <Grid item xs={12} sm={6} lg={3}>
          <CardWidget
            backgroundColor="#6200EE"
            icon={<StarIcon style={{ color: '#ffffff' }} />}
            title={20}
            subTitle="PRODUCTS"
            Link="/products"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <CardWidget
            backgroundColor="#6200EE"
            icon={<StarIcon style={{ color: '#ffffff' }} />}
            title={20}
            subTitle="STOCKS"
            Link="/stocks"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <CardWidget
            icon={<ContactPhone style={{ color: '#ffffff' }} />}
            backgroundColor="#0795F4"
            title={23}
            subTitle="Customers"
            Link="/customers"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <CardWidget
            icon={<SupervisedUserCircleIcon style={{ color: '#ffffff' }} />}
            backgroundColor="#8DCD03"
            title={543}
            subTitle="Users"
            Link="/users"
          />
        </Grid>
        <Grid item xs={12} lg={12} xl={8} className={classes.orderLg1}>
          <Box pb={6}>
            <PopularAgents />
          </Box>
        </Grid>
        <Grid item xs={12} xl={5}>
          <RecentPayments />
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default Dashboard;
