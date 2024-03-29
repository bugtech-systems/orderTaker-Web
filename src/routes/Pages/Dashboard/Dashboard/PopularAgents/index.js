import React from 'react';
import Box from '@material-ui/core/Box';
import AgentsList from './AgentsList';
import CmtCard from '../../../../../@coremat/CmtCard';
import CmtCardHeader from '../../../../../@coremat/CmtCard/CmtCardHeader';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  cardRoot: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
  cardHeaderRoot: {
    padding: 0,
    paddingBottom: 30,
    [theme.breakpoints.down('xs')]: {
      '& .Cmt-action-default-menu button': {
        fontSize: 11,
        '& .MuiSvgIcon-root': {
          fontSize: 20,
        },
      },
    },
  },
}));

const PopularAgents = ({unpaidCustomers, count}) => {
  const classes = useStyles();


  return (
    <CmtCard className={classes.cardRoot}>
      <CmtCardHeader
        className={classes.cardHeaderRoot}
        title={count > 0 ?`Unpaid Customers (${count})` : ''}
        titleProps={{
          variant: 'h4',
          component: 'div',
        }}>
        <Button component={Link} to="/Customers" color="primary">
          <Box component="span" mr={2}>
            Go to Customers list
          </Box>
          <NavigateNextIcon />
        </Button>
      </CmtCardHeader>
      <AgentsList 
        unpaidCustomers={unpaidCustomers}
      />
    </CmtCard>
  );
};

export default PopularAgents;
