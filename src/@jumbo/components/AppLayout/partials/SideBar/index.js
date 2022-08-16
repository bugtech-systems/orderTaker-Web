import React, { useEffect, useState } from 'react';

import PerfectScrollbar from 'react-perfect-scrollbar';
import makeStyles from '@material-ui/core/styles/makeStyles';

import CmtVertical from '../../../../../@coremat/CmtNavigation/Vertical';
import { sidebarNavs } from '../menus';

//Redux
import { useSelector } from 'react-redux';


const useStyles = makeStyles(() => ({
  perfectScrollbarSidebar: {
    height: '100%',
    transition: 'all 0.3s ease',
    '.Cmt-sidebar-fixed &, .Cmt-Drawer-container &': {
      height: 'calc(100% - 167px)',
    },
    '.Cmt-modernLayout &': {
      height: 'calc(100% - 72px)',
    },
    '.Cmt-miniLayout &': {
      height: 'calc(100% - 91px)',
    },
    '.Cmt-miniLayout .Cmt-sidebar-content:hover &': {
      height: 'calc(100% - 167px)',
    },
  },
}));



const SideBar = () => {
  const classes = useStyles();
  const { authUser, loadUser } = useSelector(({auth}) => auth);
  const [sideNavs, setSideNavs] = useState([]);


useEffect(() => {
  if(authUser && loadUser){

    if(authUser && authUser.roles && (authUser.roles.find(a => a === 'ROLE_SUPER' || a ===  'ROLE_ADMIN') || authUser.roles.find(a => a.name === 'super' || a.name === 'admin'))){
      setSideNavs(sidebarNavs)
    } else {
   let sd = sidebarNavs[0].children.filter(a => !a.isAdmin);
   sidebarNavs[0].children = sd;
      setSideNavs(sidebarNavs)
    }
    setSideNavs(sidebarNavs);
  }
}, [authUser, loadUser])


  return (
    <PerfectScrollbar className={classes.perfectScrollbarSidebar}>
      <CmtVertical menuItems={sideNavs} />
    </PerfectScrollbar>
  );
};

export default SideBar;
