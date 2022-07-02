import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import HoverInfoCard from '../../../../../@jumbo/components/Common/HoverInfoCard';

const NewProducts = () => {
  return (
    <HoverInfoCard
      backgroundColor="#6200EE"
      icon={<StarIcon style={{ color: '#ffffff' }} />}
      title={20}
      subTitle="Products"
    />
  );
};

export default NewProducts;
