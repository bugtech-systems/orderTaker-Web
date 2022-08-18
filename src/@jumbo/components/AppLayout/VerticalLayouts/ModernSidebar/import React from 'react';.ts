import React from 'react';
import { Dialog, DialogTitle, DialogContent, makeStyles } from '@material-ui';

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
      top: theme.spacing(5)
    }
}))

export default function Popup(props)  {
    const  { title, children, openPopup, setOpenPopup } = props;
    const classes = useStyles();

    return (
 <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
     
        <DialogTitle>
                <div>title</div>
        </DialogTitle>

            <DialogContent dividers>
                {children}
            </DialogContent>
            
        </Dialog>
    )
}