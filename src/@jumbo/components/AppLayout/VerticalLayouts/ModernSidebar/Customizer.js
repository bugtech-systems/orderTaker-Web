import React from 'react';
import Theme from '../../partials/customizer/Theme';
import DisplayLayout from '../../partials/customizer/DisplayLayout';
import OtherSettings from '../../partials/customizer/OtherSettings';
import ThemeColor from '../../partials/customizer/ThemeColor';
import SidebarOption from '../../partials/customizer/SidebarOption';
// import NavigationLayout from '../../partials/customizer/NavigationLayout';
import CustomizerBody from '../../partials/customizer/CustomizerBody';


//DashBoard Components
import OurStore from '../../../../../routes/Pages/Dashboard/Dashboard/OurStore';

//Redux
import { useDispatch, useSelector } from 'react-redux';




const Customizer = () => {
  const {  business } = useSelector(({dashboard}) => dashboard);



  return (
    <CustomizerBody>
       <OurStore
              business={business}
              />
      <Theme  />
      <ThemeColor />
      {/* <NavigationLayout /> */}
      <DisplayLayout />
      <SidebarOption />
      {/* <SidebarSize /> */}
      <OtherSettings showFooterOpt={false} />
    </CustomizerBody>
  );
};

export default Customizer;
