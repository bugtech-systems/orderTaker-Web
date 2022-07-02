import React from 'react';
import ContactPhone from '@material-ui/icons/ContactPhone';
import HoverInfoCard from '../../../../../@jumbo/components/Common/HoverInfoCard';


const IdeasWidget = () => {
  return (
    <HoverInfoCard
      icon={<ContactPhone style={{ color: '#ffffff' }} />}
      backgroundColor="#0795F4"
      title={23}
      subTitle="Customers"
    />
  );
};

export default IdeasWidget;