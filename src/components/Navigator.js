import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LockResetIcon from '@mui/icons-material/LockReset';
import GroupsIcon from '@mui/icons-material/Groups';
import PhpIcon from '@mui/icons-material/Php';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import BarChartIcon from '@mui/icons-material/BarChart';


//logo
import Alayon from '../assets/AlayonLogo.png'


//Redux
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT, SET_HEADER_TITLE } from '../redux/actions/types';
import { logout } from '../redux/actions/auth.action';

const categories = [
  {
    tid: 'Dashboard',
    children: [

      { id: 'dashboard', title: 'Dashboard', icon: <AssessmentIcon />, path: '/app/dashboard' },
      { id: 'user-management', title: 'User Management', icon: <GroupsIcon />, path: '/app/user-management' },
      {
        id: 'inventory', title: 'Inventory',
        icon: <PendingActionsIcon />,
        path: '/inventory'
      },
      { id: 'sales', title: 'Sales', icon: <BarChartIcon />, path: '/sales'
    },
      {
        id: 'settings', title: 'Settings',
        icon: <SettingsIcon />,
        path: '/settings'
      },
    ],
  },
  {
    tid: '',
    children: [
      { id: 'logout', title: 'Logout', icon: <ExitToAppIcon />, path: '/login' },
      // { id: 'Register', icon: <HowToRegIcon /> },
      // { id: 'Forgot Password', icon: <LockResetIcon /> },
    ],
  },
];

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};



export default function Navigator(props) {
  const { ...other } = props;
  const dispatch = useDispatch();
  const [active, setActive] = useState('dashboard');

  useEffect(() => {
   let ln = window.location.pathname;
   let newStr = String(ln).replace('/app/', '').trim('');
   console.log(newStr)
   setActive(newStr)
    })


  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={Alayon} width="100" height="100" style={{margin: 'auto'}} />
        </ListItem>
       
        {categories.map(({ tid, children }) => (
          <Box key={tid} sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 2, px: 2 }}>
              <ListItemText sx={{ color: '#fff' }}>{tid}</ListItemText>
            </ListItem>
            {children.map(({ id, title, icon, path }) => (
                <Link to={path}  key={id} style={{textDecoration: 'none'}} onClick={() => {
                  dispatch({type: SET_HEADER_TITLE, payload: title})
                  if(id == 'logout'){
                    dispatch(logout())
                  }
                }}>
              <ListItem disablePadding>
                <ListItemButton selected={String(active).toLowerCase() == String(id).toLowerCase()} sx={item}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{title}</ListItemText>
                </ListItemButton>
              </ListItem>
              </Link>
            ))}

            <Divider sx={{ mt: 2}} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}