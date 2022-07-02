import React, { useEffect, useState } from 'react';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import PageContainer from '../../../../@jumbo/components/PageComponents/layouts/PageContainer';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';

//Components
import IdeasWidget from './IdeasWidget';
import Documents from './Documents';
import NewCustomers from './NewCustomers';
import NewProducts from './NewProducts';


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
  // { label: <TextDisplay name="Store" />, link: '/' },
  // { label: <TextDisplay name="Dashboard" />, isActive: true },
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
    <PageContainer
      heading={'Dashboard'}
      breadcrumbs={breadcrumbs}
    >
      <GridContainer>
          {/* Easy Access Widget Portion */}
        <Grid item xs={12} sm={4} xl={4}>
          <NewProducts />
        </Grid>
        <Grid item xs={12} sm={4} xl={4}>
          <NewCustomers />
        </Grid>
        <Grid item xs={12} sm={4} xl={4}>
          <IdeasWidget />
        </Grid>
        {/* <Grid item xs={12} sm={4} xl={4}>
          <Documents />
        </Grid> */}
      </GridContainer>
    </PageContainer>
  );
};

export default Dashboard;
