import React from 'react';
import { Box, Button, makeStyles } from '@material-ui/core';
import { intranet } from '../../../../../../@fake-db';
import CmtList from '../../../../../../@coremat/CmtList';
import NotificationItem from '../../../partials/Header/HeaderNotifications/NotificationItem';
import EmptyResult from './EmptyResult';


//Redux
import {useDispatch, useSelector} from "react-redux";

const useStyles = makeStyles(theme => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 10,
    color: theme.palette.text.secondary,
    marginBottom: 20,
    textTransform: 'uppercase',
  },
}));

const Notifications = () => {
  // const { headerNotifications } = intranet;
  const classes = useStyles();
  const { notifications } = useSelector(({uiReducer}) => uiReducer)

  return (
    <Box>
      <Box className={classes.sectionHeading}>Latest Notifications</Box>
      {notifications.length > 0 ? (
        <CmtList data={notifications} renderRow={(item, index) => <NotificationItem key={index} item={item} />} />
      ) : (
        <EmptyResult content="No record found" />
      )}
    </Box>
  );
};

export default Notifications;
