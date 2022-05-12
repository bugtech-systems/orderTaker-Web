import React from 'react'
import NotificationBell from '../common/NotificationBell'
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { headerStyles } from './styles';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Navbar = ({ title }) => {

    return (
        <Box sx={headerStyles.wrapper}>
            <Box sx={headerStyles.topRow}>
            
                <NotificationBell/>
                <Avatar src="https://seeklogo.com/images/G/github-logo-5F384D0265-seeklogo.com.png" />
                <Typography 
                sx={headerStyles.topRowText}
            >
                Juan Dela Cruz
            <ArrowDropDownIcon />
                
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
