import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  border: '50%',
  width: 400,
  height: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', fontWeight: 600}}>
             Forgot Password
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2, fontSize: '15px', textAlign: 'center'}}>
             Enter your email and we'll send you a link to reset your password
        </Typography>
        <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
        />
        <Button variant="contained" color="success" sx={{ width: 400, mt: 2}}>
             Submit
        </Button>
        <Grid item sx={{ mt: 4, textAlign: 'center'}}>
        <ArrowBackIosIcon sx={{fontSize: 'small'}}/> 
        <Link href="/login" variant="body2">
                  {"Back to Login"}
        </Link>
       </Grid>
       
          </Box>
      </Modal>
    </div>
   
  );
}
