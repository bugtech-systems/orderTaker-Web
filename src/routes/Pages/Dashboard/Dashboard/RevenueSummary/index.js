import React, { useState } from 'react';

import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

import CmtCard from '../../../../../@coremat/CmtCard';
import CmtCardHeader from '../../../../../@coremat/CmtCard/CmtCardHeader';

import RevenueSummaryGraph from './RevenueSummaryGraph';
import SummaryTabs from './SummaryTabs';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  cardRoot: {
    height: '100%',
    '@media screen and (min-width: 1280px) and (max-width: 1368px)': {
      '& .Cmt-header-root': {
        flexDirection: 'column',
      },
    },
    [theme.breakpoints.down('xs')]: {
      '& .Cmt-header-root': {
        flexDirection: 'column',
      },
    },
  },
  titleRoot: {
    marginBottom: 4,
  },
  titlePrimary: {
    color: theme.palette.primary.main,
  },
  subTitle: {
    fontSize: 12,
    color: theme.palette.text.secondary,
  },
}));

const SummaryStats = ({data}) => {



  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <SummaryDetail title={'Annual Sales'} figure={`₱${data.totalSales}`}className={'mr-5'} />
      <SummaryDetail title={'Available Inventory'} figure={`₱${data.totalInventory}`} className={'mr-5'} />
    </div>
  );
};

const SummaryDetail = ({ title, figure, className }) => {
  const classes = useStyles();
  return (
    <div className={className ? className : ''}>
      <Typography component="div" variant="h1" className={classes.titleRoot}>
        {figure}
      </Typography>
      <Typography className={classes.subTitle}>{title}</Typography>
    </div>
  );
};

const RevenueSummary = () => {
  const { revenueSummary } = useSelector(({dashboard}) => dashboard);
  const [tabValue, setTabValue] = useState(0);
  const classes = useStyles();


  return (
    <CmtCard className={classes.cardRoot}>
      <CmtCardHeader title={<SummaryStats data={revenueSummary} />}>
        <SummaryTabs tabValue={tabValue} setTabValue={setTabValue} />
      </CmtCardHeader>
      <RevenueSummaryGraph value={tabValue} revenueSummary={revenueSummary.data} />
    </CmtCard>
  );
};

export default RevenueSummary;
