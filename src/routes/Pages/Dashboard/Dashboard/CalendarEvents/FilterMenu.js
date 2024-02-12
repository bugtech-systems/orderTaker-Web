import React, { useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';



import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FilterListIcon from '@material-ui/icons/FilterList';
import { Box, IconButton } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import BlockIcon from '@material-ui/icons/Block';
import ListIcon from '@material-ui/icons/List';
import useStyles from './index.style';



const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({

}))(MenuItem);

export default function CustomizedMenus({handleFilter, active}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelect = (val) => {
    handleFilter(val)
    handleClose()
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton className={classes.iconBtn} size="small"  aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <FilterListIcon/>
      </IconButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem className={active === 'all' ? classes.menuActive : ''} onClick={() => handleSelect('all')}>
        <ListItemIcon>
        <Box p={1}>
        <ListIcon color="primary" fontSize='small' />
        </Box>
          </ListItemIcon>
          <ListItemText primary=" All" />

        </MenuItem>
        <MenuItem className={active === 'paid' ? classes.menuActive : ''}  onClick={() => handleSelect('paid')}>
          <ListItemIcon>
            <Box color="success.main" p={1}>
          <CheckIcon  fontSize='small' />
          </Box>
          </ListItemIcon>
          <ListItemText primary="Paid" />
        </MenuItem>
        <MenuItem className={active === 'unpaid' ? classes.menuActive : ''}  onClick={() => handleSelect('unpaid')}>
          <ListItemIcon>
          <Box  p={1}>
          <CheckIcon fontSize='small' />
          </Box>

          </ListItemIcon>
          <ListItemText primary="Unpaid" />
        </MenuItem>
        <MenuItem className={active === 'cancelled' ? classes.menuActive : ''}  onClick={() => handleSelect('cancelled')}>
          <ListItemIcon>
          <Box  p={1}>
          <BlockIcon  color='secondary'  fontSize='small' />
          </Box>
          </ListItemIcon>

          <ListItemText primary="Cancelled" />
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
