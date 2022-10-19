import React, { useState } from 'react';
import CmtCard from '../../../../../@coremat/CmtCard';
import CmtCardHeader from '../../../../../@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '../../../../../@coremat/CmtCard/CmtCardContent';

import Box from '@material-ui/core/Box';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import CallIcon from '@material-ui/icons/Call';
import { intranet } from '../../../../../@fake-db';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { blue, pink } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  cardRoot: {
    height: '100%',
  },
  selectBoxRoot: {
    marginBottom: 6,
    display: 'inline-block',
    '& .MuiInput-underline:before, & .MuiInput-underline:after': {
      display: 'none',
    },
    '& .MuiSelect-select:focus': {
      backgroundColor: 'transparent',
    },
    '& .MuiInputBase-root': {
      fontSize: 14,
      color: theme.palette.text.secondary,
    },
  },
  addressTitle: {
    fontWeight: theme.typography.fontWeightRegular,
    [theme.breakpoints.up('lg')]: {
      fontSize: 20,
    },
  },
  socialLink: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: -8,
    marginRight: -8,
  },
  socialLinkCol: {
    paddingLeft: 8,
    paddingRight: 8,
    '& .btn': {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      color: theme.palette.primary.main,
      padding: 6,
      '& .MuiSvgIcon-root': {
        fontSize: 20,
      },
      '&.twitter': {
        backgroundColor: alpha(blue[500], 0.1),
        color: blue[500],
      },
      '&.instagram': {
        backgroundColor: alpha(pink[500], 0.1),
        color: pink[500],
      },
      '&.linkedin': {
        backgroundColor: alpha(blue[500], 0.1),
        color: blue[500],
      },
    },
  },
  contactRoot: {
    '& .MuiSvgIcon-root': {
      fontSize: 20,
    },
  },
}));


const OurStore = ({ business }) => {
  const { addresses} = intranet.ourOfficeData;
  const { name, address } = business ? business : {};
  const [currentAddress] = useState(addresses[0]);
  const classes = useStyles();

  return (
    <CmtCard className={classes.cardRoot}>
      <CmtCardHeader title={name} subTitle={address} />

      <CmtCardContent>
        <Box mb={5}>
          <Typography component="div" variant="h4" className={classes.addressTitle}>
            Contact Details
          </Typography>
        </Box>

        <Box className={classes.contactRoot} mb={6}>
          <Box display="flex" alignItems="center" mb={3} color="text.secondary">
            <CallIcon />
            <Box ml={3}>{currentAddress.phoneNumber1}</Box>
          </Box>
          <Box display="flex" alignItems="center" mb={3} color="text.secondary">
            <CallIcon />
            <Box ml={3}>{currentAddress.phoneNumber2}</Box>
          </Box>
          <Box display="flex" alignItems="center" mb={3} color="text.secondary">
            <MailOutlineIcon />
            <Box ml={4}>{currentAddress.emailAddress}</Box>
          </Box>
        </Box>
      </CmtCardContent>
      {/* <Box p={2} height={1}>
        <GoogleMapBox
          loadingElement={<Box height={1} />}
          containerElement={<Box height={1} />}
          mapElement={<Box height={1} />}
        />
      </Box> */}
    </CmtCard>
  );
};

export default OurStore;
