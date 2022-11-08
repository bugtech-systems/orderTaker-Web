import React, { useEffect, useState } from 'react';
import CmtAdvCard from '../../../../../../../@coremat/CmtAdvCard';
import CmtCardMedia from '../../../../../../../@coremat/CmtCard/CmtCardMedia';
import CmtObjectSummary from '../../../../../../../@coremat/CmtObjectSummary';
import CmtAvatar from '../../../../../../../@coremat/CmtAvatar';

import CmtList from '../../../../../../../@coremat/CmtImage';

import { alpha, makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import RoomIcon from '@material-ui/icons/Room';
import EditIcon from '@material-ui/icons/Edit';

import { useSelector } from 'react-redux';

import { IconButton } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { SET_USER_DIALOG } from 'redux/actions/types';
import { setCurrentUser } from 'redux/actions/Users';
import commonData from 'utils/commonData';


const useStyles = makeStyles(theme => ({
  actionMenu: {
    '& button': {
      backgroundColor: 'transparent',
      color: theme.palette.common.white,
      '&:hover, &:focus': {
        backgroundColor: 'transparent',
        color: theme.palette.common.white,
      },
    },
  },
  cardMediaRoot: {
    position: 'relative',
    marginBottom: 0,
    '&:before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      zIndex: 1,
      width: '100%',
      height: '100%',
      backgroundColor: alpha(theme.palette.common.black, 0.6),
    },
    '& > *': {
      position: 'relative',
      zIndex: 2,
    },
  },
  cardMediaContent: {
    padding: '40px 24px',
    position: 'relative',
    zIndex: 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    '& .Cmt-badge-avatar': {
      border: `solid 2px ${theme.palette.success.main}`,
      padding: 5,
      borderRadius: '50%',
    },
    '& .Cmt-badge': {
      padding: 0,
      backgroundColor: 'transparent',
      marginBottom: -36,
      marginLeft: -15,
    },
    '& .Cmt-user-info': {
      marginTop: 15,
      '& .Cmt-title': {
        fontSize: 16,
        fontWeight: theme.typography.fontWeightBold,
      },
    },
  },
  avatarRoot: {
    border: `solid 2px ${theme.palette.common.white}`,
  },
}));

const UserDetail = () => {
  const { authUser } = useSelector(({auth}) => auth);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  let role = authUser.roles ? String(authUser.roles[0].name).toUpperCase() : ''
  const { email, phones, address } = authUser;

  const handleEdit = () => {
    // dispatch(setCurrentUser(authUser));
    dispatch({type: SET_USER_DIALOG, payload: true});
    setOpen(true);
  }

  return (
    <Box style={{margin: '10px'}}>
 <CmtAdvCard
      actionsPos="top-corner"
      actionMenuClassName={classes.actionMenu}>
        <IconButton onClick={(e) => handleEdit()} style={{position: 'absolute', right: '5px', zIndex: 5}} color="primary"><EditIcon  /></IconButton>
      <CmtCardMedia className={classes.cardMediaRoot} 
      >
        
        <Box className={classes.cardMediaContent}>
          <CmtObjectSummary
            avatar={
              <CmtAvatar className={classes.avatarRoot} size={56} src={`${commonData.staticUrl}${authUser.dpUrl}`} alt={authUser.name} />
            }
            title={authUser.name}
            titleProps={{ style: { color: '#fff' } }}
            subTitle={role}
            subTitleProps={{ style: { color: '#fff' } }}
            showItemBadge={false}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            avatarProps={{ variant: 'circle' }}
            // badge={<CmtImage src={authUser.badge} alt="Badge" />}
            align="vertical"
          />
        </Box>
      </CmtCardMedia>
    </CmtAdvCard>
    
<Box px={6} py={5}>
        <Box mb={5} component="p" color="common.dark">
         Personal Details
        </Box>
        <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 7 }}>
          <EmailIcon />
          <Box ml={5} color="primary.main" component="p" className="pointer">
            {email}
          </Box>
        </Box>
     {phones.length !== 0 && <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 5 }}>
          <PhoneIcon />
          <Box ml={5}>
            <CmtList
              data={phones}
              renderRow={(item, index) => (
                <Box key={index} display="flex" alignItems="center">
                  <Box color="text.secondary">{item.phone}</Box>
                  <Box ml={2} className={classes.labelRoot}>
                    {item.label}
                  </Box>
                </Box>
              )}
            />
          </Box>
        </Box>
        }
         <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 7 }}>
          <RoomIcon />
          <Box ml={5} color="primary.main" component="p" className="pointer">
            {address}
          </Box>
        </Box>
      </Box>
    </Box>
   
  );
};

export default UserDetail;