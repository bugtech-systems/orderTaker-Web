import * as React from 'react';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import Stack from '@mui/material/Stack';


const Buttons = () => {
  return (
    <Stack direction="row" spacing={2}>
      <Button 
          variant="outlined" startIcon={<EditIcon />}>
        Edit
      </Button>
      <Button variant="outlined" endIcon={<LogoutIcon />}>
        Logout
      </Button>
    </Stack>
  );
}

export default Buttons;