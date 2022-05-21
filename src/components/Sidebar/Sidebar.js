import React from 'react'
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { categories } from './SidebarItems';
import { useNavigate } from "react-router-dom";

// //logo
// import cares from "../../assets/images/jc_cares_logo.png"

const Sidebar = () => {
    const navigate = useNavigate();

      return (

        <List>
          {categories.map((item, index) => (
            <ListItem
                button
                key={item.id}
                onClick={() => navigate(item.route)}
            >
                <ListItemIcon
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
              />
            </ListItem>
          ))}
        </List>
    );
};

export default Sidebar
