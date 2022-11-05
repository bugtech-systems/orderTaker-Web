import React, { useState } from 'react';

import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

import CmtCard from '../../../../../@coremat/CmtCard';
import CmtCardHeader from '../../../../../@coremat/CmtCard/CmtCardHeader';

import RevenueSummaryGraph from './RevenueSummaryGraph';
import SummaryTabs from './SummaryTabs';

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

const SummaryStats = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <SummaryDetail title={'Sales this year'} figure={new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'PHP' }).format(295400)} className={'mr-5'} />
      <SummaryDetail title={'Available Inventory'} figure={new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'PHP' }).format(58000)} className={'mr-5'} />
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
  const [tabValue, setTabValue] = useState(0);
  const classes = useStyles();

  return (
    <CmtCard className={classes.cardRoot}>
      <CmtCardHeader title={<SummaryStats />}>
        <SummaryTabs tabValue={tabValue} setTabValue={setTabValue} />
      </CmtCardHeader>
      <RevenueSummaryGraph value={tabValue} />
    </CmtCard>
  );
};

export default RevenueSummary;
