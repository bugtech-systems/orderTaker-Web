import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { Box, Button } from '@material-ui/core';
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
        marginTop: 10,
      },
    },
  },
  cardContentRoot: {
    padding: 0,
  },
  scrollbarRoot: {
    height: 275,
  },
}));

const RecentPayments = () => {
  const classes = useStyles();
  const {unpaid_orders} = useSelector(({orderApp}) => orderApp);















  console.log(unpaid_orders);

  return (
    <CmtCard className={classes.cardRoot}>
      <CmtCardHeader
        className="pt-4"
        title="Unpaid Orders"
        titleProps={{
          variant: 'h4',
          component: 'div',
        }}>
        <Box clone>
          <Button color="primary">
            <AddIcon />
            <span className="ml-2">Add New</span>
          </Button>
        </Box>
      </CmtCardHeader>
      <CmtCardContent className={classes.cardContentRoot}>
        <PerfectScrollbar className={classes.scrollbarRoot}>
          <RecentPaymentsTable data={unpaid_orders} />
        </PerfectScrollbar>
      </CmtCardContent>
    </CmtCard>
  );
};

export default RecentPayments;
