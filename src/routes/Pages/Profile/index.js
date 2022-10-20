import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Header from './Header';
import GridContainer from '../../../@jumbo/components/GridContainer';


import { useDispatch, useSelector } from 'react-redux';
import { getUserDetail } from '../../../redux/actions/ProfileApp';
import makeStyles from '@material-ui/core/styles/makeStyles';


const useStyles = makeStyles(() => ({
  pageFull: {
    width: '100%',
  },
  profileSidebar: {
    '@media screen and (min-width: 1280px) and (max-width: 1499px)': {
      flexBasis: '100%',
      maxWidth: '100%',
    },
  },
  profileMainContent: {
    '@media screen and (min-width: 1280px) and (max-width: 1499px)': {
      flexBasis: '100%',
      maxWidth: '100%',
    },
  },
}));

const Profile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState('about');
  const { userDetail } = useSelector(({ profileApp }) => profileApp);


  useEffect(() => {
    dispatch(getUserDetail());
  }, [dispatch]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <React.Fragment>
      {userDetail && (
        <Box className={classes.pageFull}>
          <Header classes={classes} userDetail={userDetail} 
          tabValue={tabValue} handleTabChange={handleTabChange} />
          <GridContainer>
           
          </GridContainer>
        </Box>
      )}
    </React.Fragment>
  );
};

export default Profile;
