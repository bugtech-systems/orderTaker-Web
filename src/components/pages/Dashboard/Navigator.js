import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SettingsIcon from '@mui/icons-material/Settings';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LockResetIcon from '@mui/icons-material/LockReset';
import GroupsIcon from '@mui/icons-material/Groups';
import PhpIcon from '@mui/icons-material/Php';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import BarChartIcon from '@mui/icons-material/BarChart';


//logo
import Alayon from '../../assets/AlayonLogo.png'

const categories = [
  {
    id: 'Dashboard',
    children: [
      {
        id: 'Authentication',
        icon: <PendingActionsIcon />,
        active: true,
      },
      { id: 'Database', icon: <AssessmentIcon /> },
      { id: 'Users', icon: <GroupsIcon /> },
      { id: 'Inventory', icon: <BarChartIcon /> },
      { id: 'Sales', icon: <PhpIcon /> },
      {
        id: 'Settings',
        icon: <SettingsIcon />,
      },
    ],
  },
  {
    id: 'Options',
    children: [
      { id: 'Log In', icon: <LoginIcon /> },
      { id: 'Register', icon: <HowToRegIcon /> },
      { id: 'Forgot Password', icon: <LockResetIcon /> },
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

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
          <img src = {Alayon} />
        </ListItem>
       
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 2, px: 2 }}>
              <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active }) => (
              <ListItem disablePadding key={childId}>
                <ListItemButton selected={active} sx={item}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{childId}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}

            <Divider sx={{ mt: 2}} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}