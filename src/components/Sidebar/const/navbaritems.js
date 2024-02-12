/* eslint-disable react/react-in-jsx-scope */
import CottageIcon from '@mui/icons-material/Cottage';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ListAltIcon from '@material-ui/icons/ListAlt';

export const mainNavbarItems = [
  {
    id: 0,
    icon: <CottageIcon />,
    label: 'Dashboard',
    route: 'dashboard',
  },
  {
    id: 1,
    icon: <ListAltIcon />,
    label: 'Menu List',
    route: 'menulist',
  },
  {
    id: 2,
    icon: <AssessmentOutlinedIcon />,
    label: 'Daily Inventory',
    route: 'inventory',
  },
  {
    id: 3,
    icon: <GroupsOutlinedIcon />,
    label: 'User Management',
    route: 'UserManagement',
  },
  {
    id: 4,
    icon: <SummarizeIcon />,
    label: 'Generate Reports',
    route: 'reports',
  },
];
