import React from 'react'
import NotificationBell from '../common/NotificationBell'
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ViewListIcon from '@mui/icons-material/ViewList';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';



import { headerStyles } from './styles';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Navbar = ({ title }) => {

    ///toggle button
    const [view, setView] = React.useState('list');

    const handleChange = (event, nextView) => {
      setView(nextView);
    };
  
    //menu button
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
  };

    return (
        <Box sx={headerStyles.wrapper}>
            <Box sx={headerStyles.topRow}>
            <ToggleButtonGroup
                orientation="vertical"
                value={view}
                exclusive
                onChange={handleChange}
                >
                <ToggleButton value="list" aria-label="list" >
                    <ViewListIcon />
                </ToggleButton>
            </ToggleButtonGroup>
                <NotificationBell/>
                <Avatar src="https://seeklogo.com/images/G/github-logo-5F384D0265-seeklogo.com.png" />
                <Typography 
                sx={headerStyles.topRowText}
            >
                Juan Dela Cruz
                   <Button
                        id="fade-button"
                        aria-controls={open ? 'fade-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                     >
                        <ArrowDropDownIcon />
                     </Button>
                <Menu
                    id="fade-menu"
                    MenuListProps={{
                    'aria-labelledby': 'fade-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                 </Menu>
            </Typography>
            </Box>
            <Typography 
                sx={headerStyles.topRowButtom}
            >
                Administrator
            </Typography>
      </Box>
    )
}

export default Navbar
