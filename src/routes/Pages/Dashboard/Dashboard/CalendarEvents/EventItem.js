import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import LabelIcon from '@material-ui/icons/Label';
import CheckIcon from '@material-ui/icons/Check';
import CmtMediaObject from '../../../../../@coremat/CmtMediaObject';
import { getTime } from '../../../../../@jumbo/utils/dateHelper';
import useStyles from './index.style';

const EventItem = ({ item }) => {
  const classes = useStyles();
  console.log(item)
  const getSubTitle = () => (
    <Typography className={classes.subTitleRoot}>
      <Box component="span">₱{item.amount_paid}</Box>
      <Box component="span" mx={2}>
        |
      </Box>
      Customer:
      <Box component="span" color="primary.main" ml={1}>
        {item.customers[0] ? item.customers[0].name : ''}
      </Box>
    </Typography>
  );

  return (
    <Box className={clsx(classes.eventItemRoot, { checked: item.isPaid })}>
     <CmtMediaObject
        avatarPos="center"
        title={item.order_no}
        titleProps={{
          variant: 'h4',
          component: 'div',
          className: classes.titleRoot,
        }}
        subTitle={getSubTitle()}
        actionsComponent={
          item.isPaid && (
            <Box color="success.main">
              <CheckIcon />
            </Box>
          )
        }
      /> 
    </Box>
  );
};

export default EventItem;
