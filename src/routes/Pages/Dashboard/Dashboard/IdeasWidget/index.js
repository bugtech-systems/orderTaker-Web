

import React from 'react';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import HoverInfoCard from '../../../../../@jumbo/components/Common/HoverInfoCard';

const NewUsers = () => {
  return (
    <HoverInfoCard
      backgroundColor="#8DCD03"
      icon={<SupervisedUserCircleIcon style={{ color: '#ffffff' }} />}
      title={543}
      subTitle="Users"
    />
  );
};

export default NewUsers;

