import React, { useEffect, useState } from 'react';
import CmtCard from '../../../../../@coremat/CmtCard';
import CmtCardHeader from '../../../../../@coremat/CmtCard/CmtCardHeader';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CmtCardContent from '../../../../../@coremat/CmtCard/CmtCardContent';
import Box from '@material-ui/core/Box';
import { getDateElements, getNewDate, isDatesSame, isToday } from '../../../../../@jumbo/utils/dateHelper';
import IconButton from '@material-ui/core/IconButton';
import { intranet } from '../../../../../@fake-db';
import CmtList from '../../../../../@coremat/CmtList';
import EventItem from './EventItem';
import PerfectScrollbar from 'react-perfect-scrollbar';
import HistoryIcon from '@material-ui/icons/History';
import useStyles from './index.style';
import Typography from '@material-ui/core/Typography';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from 'redux/actions/OrderApp';

//Component
import FilterMenu from './FilterMenu';



const CalendarEvents = ({setDateCounter, dateCounter, filter, setFilter}) => {
  const {orders} = useSelector(({orderApp}) => orderApp);
  const { isAdmin } = useSelector(({auth}) => auth);

  const dispatch = useDispatch();
  const classes = useStyles();
  const [orderData, setOrderData] = useState([]);
  const [date, setDate] = useState(getNewDate(dateCounter, 'DD MMM, YYYY, hh:mm a'));



  const getHeader = () => {
    const dateObj = getDateElements(date);
    let isToday = isDatesSame(new Date, date)
    return (
      <Box display="flex" flexDirection="column">
        {/* <Box display="flex" color="common.white" alignItems="baseline">
          <Box component="span" mr={2} fontSize={{ xs: 26, md: 36, xl: 48 }} lineHeight={1} fontWeight="fontWeightBold">
            {dateObj.date.date}
          </Box>
          <Box component="span" fontSize={25}>
            SALE{}
          </Box>
        </Box> */}
        <Box display="flex" color="common.white" alignItems="baseline">
          <Box component="span" mr={2} fontSize={{ xs: 26, md: 36, xl: 48 }} lineHeight={1} fontWeight="fontWeightBold">
            {dateObj.date.date}
          </Box>
        {isToday &&  <Box component="span" fontSize={16}>
            {dateObj.time} 
          </Box>
          }
        </Box>
        <Box display="flex" mt={1} color="common.white">
          <Box mr={1}>{dateObj.day},</Box>
          <Box>{dateObj.date.month + ' ' + dateObj.date.year}</Box>
        </Box>
      </Box>
    );
  };

  const getEvents = (data, newDate) => {
    let orData = [];

      orData = data.filter(item => isDatesSame(item.createdAt, newDate));

    setOrderData(orData)
  };

  const showDate = () => {
    return isToday(date) ? 'Today' : getDateElements(date).date.dateString;
  };

  const handleOrders = (val) => {
    let newDate = getNewDate(val, 'DD MMM, YYYY, hh:mm a')
    setDateCounter(val);
    setDate(newDate);

    dispatch(getOrders({
      dateCounter: val
    }))
    .then(res => {
  
      getEvents(res, newDate)
    })
    .catch(err => {
      console.log(err)
    });



  
  };

  const handleFilter = (val) => {
      let options = {};  
      if(val === 'all'){
        return handleOrders(dateCounter)
      }


      if(val === 'paid'){
        options.isPaid = true;
      }

      if(val === 'unpaid'){
        options.isPaid = false;
        options.searchText = 'Unpaid';
      }

      if(val === 'cancelled'){
        options.searchText = 'Cancelled';
        options.isPaid = false;
      }

      setFilter(val)

    
      dispatch(getOrders({
        dateCounter, ...options
      }))
      .then(res => {

        getEvents(res, date)

        console.log(res)
      })
      .catch(err => {
        console.log(err)
      });
  
  };


  
  useEffect(() => {
    handleOrders(0)
  }, []);



  return (
    <CmtCard className={classes.cardRoot}>
      <CmtCardHeader
        className={classes.cardHeader}
        title={getHeader()}
        backgroundColor={['rgba(255, 255, 255, 0.3)', 'rgba(0, 0, 0, 0.3)']}>
        <Box display="flex" alignItems="center" color="common.white" mt={-5}>
          <IconButton className={classes.iconBtn} size="small" onClick={() => handleOrders(dateCounter - 1)}>
            <ChevronLeftIcon />
          </IconButton>
          <Box component="span" mx={2} onClick={() => handleOrders(0)} className="pointer">
            SALES
          </Box>
          <IconButton className={classes.iconBtn} size="small" onClick={() => handleOrders(dateCounter + 1)}>
            <ChevronRightIcon />
          </IconButton>
        </Box>
        <Box display="flex" alignItems="center" color="common.white" mt={-5}>
          <FilterMenu 
          handleFilter={handleFilter}
          />
        </Box>
      </CmtCardHeader>
      <CmtCardContent className={isAdmin ? classes.listContainerA : classes.listContainer}>
        <Typography className={classes.eventTitle}>{showDate()}</Typography>
        <PerfectScrollbar className={classes.scrollbarRoot}>
          {orderData.length !== 0 ? 
          <CmtList data={orderData} renderRow={(item, index) => <EventItem item={item} key={index} />} />
          :
          <Box height="100%" display="flex" alignItems="center" justifyContent="center">
           <HistoryIcon/>&nbsp;<Typography>No Recent Orders</Typography>
        </Box>
          }
        </PerfectScrollbar>
        {/* <Box display="flex" alignItems="center" mb={-2} pt={2}>
          <Button color="primary" size="small" className={classes.btnRoot}>
            View All
          </Button>
        </Box> */}
        <Box className={classes.productView} />
      </CmtCardContent>
    </CmtCard>
  );
};

export default CalendarEvents;
