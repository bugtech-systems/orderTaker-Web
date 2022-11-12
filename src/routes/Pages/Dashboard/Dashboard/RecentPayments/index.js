import React from 'react';
import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import CmtSearch from '../../../../../@coremat/CmtSearch';

import { Box, Button, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import makeStyles from '@material-ui/core/styles/makeStyles';

import CmtCard from '../../../../../@coremat/CmtCard';
import CmtCardHeader from '../../../../../@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '../../../../../@coremat/CmtCard/CmtCardContent';
import RecentPaymentsTable from './RecentPaymentsTable';


//Redux
import { useDispatch, useSelector } from 'react-redux';


const useStyles = makeStyles(theme => ({
  cardRoot: {
    [theme.breakpoints.down('xs')]: {
      '& .Cmt-header-root': {
        flexDirection: 'column',
      },
      '& .Cmt-action-default-menu': {
        marginLeft: 0,
        // marginTop: 10,
      },
    },
  },
  cardContentRoot: {
    padding: 0,
    marginTop: '-30px'
  },
  scrollbarRoot: {
    height: 275,
  },
}));

const RecentPayments = ({unpaidOrders}) => {
  const classes = useStyles();
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);


  useEffect(() => {
    let filtered = unpaidOrders.filter(a => {
      return (String(a.order_no).toLowerCase().trim('').includes(String(searchTerm).toLowerCase()) || String(a.recordedAt).toLowerCase().trim('').includes(String(searchTerm).toLowerCase()) || String(a.amount_payable).toLowerCase().trim('').includes(String(searchTerm).toLowerCase()) || String(a.amount_due).toLowerCase().trim('').includes(String(searchTerm).toLowerCase())|| String(a.amount_payable).toLowerCase().trim('').includes(String(searchTerm).toLowerCase()) ||
      (a.customers && a.customers[0] && String(a.customers[0].name).toLowerCase().trim('').includes(String(searchTerm).toLowerCase()))
      )
    })



    

    console.log(filtered)
    setFilteredOrders(filtered)
  }, [searchTerm, unpaidOrders])





  return (
    <CmtCard className={classes.cardRoot}>
      <CmtCardHeader
        className="pt-4"
        title={<Box width="100%" display="flex" justifyContent="space-between" ><Typography color="primary">Unpaid Orders</Typography>
                    <CmtSearch onChange={e => setSearchTerm(e.target.value)} value={searchTerm} border={false} onlyIcon />
        </Box>}
        titleProps={{
          variant: 'h4',
          component: 'div',
        }}>
        {/* <Box clone>
          <Button color="primary">
            <AddIcon />
            <span className="ml-2">Add New</span>
          </Button>
        </Box> */}
      </CmtCardHeader>
      <CmtCardContent className={classes.cardContentRoot}>
        <PerfectScrollbar className={classes.scrollbarRoot}>
          <RecentPaymentsTable data={filteredOrders} />
        </PerfectScrollbar>
      </CmtCardContent>
    </CmtCard>
  );
};

export default RecentPayments;
