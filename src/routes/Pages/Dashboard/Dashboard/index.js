import React, { useEffect, useState } from 'react';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import PageContainer from '../../../../@jumbo/components/PageComponents/layouts/PageContainer';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';

//DashBoard Components
import CardWidget from './CardWidget';
import OurStore from './OurStore';
import WeeklySales from './WeeklySales';
import PopularAgents from './PopularAgents';
import RecentPayments from './RecentPayments';
import PopularProducts from './PopularProducts';
import CalendarEvents from './CalendarEvents';
import ToggleAnalyticsCard from './ToggleAnalyticsCard/VisitedToggleAnalyticsCard';

//Icons
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import ContactPhone from '@material-ui/icons/ContactPhone';
import AssessmentIcon from '@material-ui/icons/Assessment';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import { getDateElements, getNewDate, isDatesSame, isToday } from '../../../../@jumbo/utils/dateHelper';



//Redux
import { useDispatch, useSelector } from 'react-redux';
import { getUsers} from '../../../../redux/actions/Users';
import { getOrders} from '../../../../redux/actions/OrderApp';
import { SET_TODAY_SALES } from '../../../../redux/actions/types';


import { getAdminDashboard } from 'redux/actions/Dashboard';
import { getInventoryList } from 'redux/actions/ProductApp';

import moment from 'moment';
import { getAllNotifications } from 'redux/actions/Notification';

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
  popularProductRoot: {
    '& .scrollbar-container': {
      height: '266px !important',
    },
  },
}));

const breadcrumbs = [
  // { label: 'Dashboard', link: '/' }
];

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {orders} = useSelector(({orderApp}) => orderApp);
  const { users } = useSelector((state) => state.usersReducer);
  const { filterType } = useSelector(({ productApp }) => productApp);
  const { loadUser, authUser, isAdmin } = useSelector(({auth}) => auth);
  const { counts, business, unpaidCustomers, unpaidOrders, popularProducts } = useSelector(({dashboard}) => dashboard);
  const [dateCounter, setDateCounter] = useState(0);
  const [todaySales, setTodaySales] = useState({
    total: 0, today:[], xrate: null
  });

  const handleDateCounter = (val) => {
    setDateCounter(val)
  }

  const handleSales = () => {
    let todayOrders = orders.filter(item => isDatesSame(item.createdAt, getNewDate(dateCounter, 'DD MMM, YYYY, hh:mm a'))).sort((a, b) => a.id - b.id);


    let total = 0;
      let today = todayOrders.map((a, index) => {
      let dt = new moment(a.createdAt)
      let dObj = getDateElements(dt);

      total += a.amount_due;
      return { label: dObj.time, value: total }
     })

     today.unshift({label: "00:00 AM", value: 0 });
    // dispatch({type: SET_TODAY_SALES, payload: {
    //   total, today
    // }})
    setTodaySales({...todaySales, total, today})
  }

  useEffect(() => {
    if(loadUser){
    dispatch(getAdminDashboard())
    dispatch(getInventoryList(filterType));
    dispatch(getOrders());
    dispatch(getAllNotifications());
    }
  }, [loadUser, authUser]);

  useEffect(() => {
        handleSales();
  }, [orders, dateCounter])


  return (
    <PageContainer heading={'DASHBOARD'} breadcrumbs={breadcrumbs}>
      <GridContainer>
        {/* Business Profile Component - Top left side   */}
     
        {/* Business CalendarEvents - Top right side */}
        <Grid item xs={12} sm={12} lg={6}>
        {isAdmin &&  <ToggleAnalyticsCard data={todaySales} />}
          <CalendarEvents
          dateCounter={dateCounter}
          setDateCounter={handleDateCounter}
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={6}>
          <GridContainer>
            <Grid item xs={12} sm={12} lg={12}>
              <OurStore
              business={business}
              />
            </Grid>
            {/* Easy Access Widget Portion */}
           

            <Grid item xs={12} sm={12} lg={isAdmin ? 12 : 6}>
              <CardWidget
                backgroundColor="#6200EE"
                icon={<LocalOfferIcon style={{ color: '#ffffff' }} />}
                title={counts.products}
                subTitle="Products"
                Link={isAdmin ? "/inventory" : "/products"}
              />
            </Grid>
            <Grid item xs={12} sm={12} lg={isAdmin ? 12 : 6}>
            <CardWidget
                icon={<ContactPhone style={{ color: '#ffffff' }} />}
                backgroundColor="#0795F4"
                title={counts.customers}
                subTitle="CUSTOMERS"
                Link="/customers"
              />
            </Grid>

          </GridContainer>
        </Grid>
        {popularProducts && popularProducts.length !== 0 &&
        <Grid item xs={12} lg={12} className={classes.orderLg1}>
          <Box pb={6} className={classes.popularProductRoot}>
            <PopularProducts
              productsList={popularProducts}
              count={popularProducts.length}
            />
          </Box>
        </Grid>
        }
        {unpaidCustomers && unpaidCustomers.length !== 0 &&
        <Grid item xs={12} lg={12} className={classes.orderLg1}>
          <Box pb={6}>
            <PopularAgents 
              unpaidCustomers={unpaidCustomers}
              count={unpaidCustomers.length}
            />
          </Box>
        </Grid>}
        {unpaidOrders && unpaidOrders.length !== 0 &&
        <Grid item xs={12} lg={12}>
          <RecentPayments 
            unpaidOrders={unpaidOrders}
          />
        </Grid>
         }
      </GridContainer>
    </PageContainer>
  );
};

export default Dashboard;
