import React from 'react';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { mainNavbarItems } from './const/navbaritems';
import { sidebarStyles } from './styles';
import { useNavigate } from 'react-router-dom';

//logo
import layon from '../../assets/logo512.png';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <Drawer sx={sidebarStyles.drawer} variant="permanent" anchor="left">
      <img src={layon} alt="" />
      <Toolbar />
      <Divider />
      <List>
        {mainNavbarItems.map((item, index) => (
          <ListItem button key={item.id} onClick={() => navigate(item.route)}>
            <ListItemIcon sx={sidebarStyles.icons}>{item.icon}</ListItemIcon>
            <ListItemText sx={sidebarStyles.text} primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
