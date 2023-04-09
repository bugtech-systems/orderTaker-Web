import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EventIcon from '@material-ui/icons/Event';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  iconBtn: theme.palette.common.white,
}));

export default function FormDialog({selected, handleSelectDate}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(selected)


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleSubmit = () => {
    handleSelectDate(date)
    handleClose()
  }

  return (
    <div>
         <IconButton className={classes.iconBtn} size="small"  aria-label="upload picture" component="span" onClick={handleClickOpen}>
              <EventIcon/>
        </IconButton>
      <Dialog open={open} aria-labelledby="form-dialog-title"
       fullWidth
        maxWidth="xs"
      >
      <DialogContent>
        <Typography> Select Date</Typography>
          <TextField
            autoFocus
            value={date}
            onChange={e => setDate(e.target.value)}
            margin="dense"
            id="name"
            type="date"
            label=""
            fullWidth
          />
          </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
             <Button 
                onClick={() => handleSubmit(date)}
                color="primary">
            Find
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

