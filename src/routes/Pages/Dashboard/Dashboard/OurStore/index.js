import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CmtCard from '../../../../../@coremat/CmtCard';
import CmtCardHeader from '../../../../../@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '../../../../../@coremat/CmtCard/CmtCardContent';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

import Box from '@material-ui/core/Box';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import CallIcon from '@material-ui/icons/Call';
import { intranet } from '../../../../../@fake-db';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { blue, pink } from '@material-ui/core/colors';

import { SET_USER_DIALOG } from 'redux/actions/types';
import { setCurrentUser } from 'redux/actions/Users';

import { SET_STORE_DIALOG } from 'redux/actions/types';
import { setCurrentStore } from 'redux/actions/Users';

//Components
import EditStore from './EditStore';

//Icons
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles(theme => ({
  cardRoot: {
    height: '200px',
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
  const { isAdmin } = useSelector(({auth}) => auth);
  const [open, setOpen] = useState(false);
  const [store, setStore] = useState({
    contacts: []
  });
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleEdit = () => {
    setOpen(true);
    // dispatch(setCurrentStore(authUser));
    // dispatch({type: SET_STORE_DIALOG, payload: true});
  }

  const handleDialog = (val) => {
    setOpen(val)
  }

  useEffect(() => {
    setStore(business)
  }, [business])


  let { name, address, contacts, email } = store;

  let contactDetails = contacts.map((a, index) => {
    return (
      <Box  key={index} display="flex" alignItems="center" mb={3} color="text.secondary">
      <CallIcon /> 
      <Box ml={3}>{String(a.label).toUpperCase()} - {a.number}</Box>
    </Box>
    )
  })

  return (
    <>
    <EditStore open={open} handleDialog={handleDialog} store={business} />
    <CmtCard className={classes.cardRoot}>
      {isAdmin && 
        <IconButton onClick={(e) => handleEdit()} style={{position: 'absolute', right: '5px', zIndex: 5}} color="primary"><EditIcon  /></IconButton>
      }
        <CmtCardHeader title={name}  />
        
      <CmtCardContent>
        <Box className={classes.contactRoot} mb={6}>
          {/* <Box display="flex" alignItems="center" mb={3} color="text.secondary">
            <CallIcon />
            <Box ml={3}>{currentAddress.phoneNumber1}</Box>
          </Box>
          <Box display="flex" alignItems="center" mb={3} color="text.secondary">
            <CallIcon />
            <Box ml={3}>{currentAddress.phoneNumber2}</Box>
          </Box> */}
          {address && <Box display="flex" alignItems="center" mb={3} color="text.secondary">
         <LocationOnIcon />
         <Box ml={4}>{
        address}</Box>
       </Box>}
          {contactDetails}
         {email && <Box display="flex" alignItems="center" mb={3} color="text.secondary">
            <MailOutlineIcon />
            <Box ml={4}>{email}</Box>
          </Box>}
        </Box>

      </CmtCardContent>
      
    </CmtCard>
    </>
  );
};

export default OurStore;