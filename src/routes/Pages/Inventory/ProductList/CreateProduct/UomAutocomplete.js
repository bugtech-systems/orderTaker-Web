import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import CmtList from '../../../../../@coremat/CmtList';
import { users } from '../../../../../@fake-db/apps/todo';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CmtAvatar from '../../../../../@coremat/CmtAvatar';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AppRadioButton from '../../../../../@jumbo/components/Common/formElements/AppRadioButton';
import AppTextInput from '../../../../../@jumbo/components/Common/formElements/AppTextInput';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit'
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

const useStyles = makeStyles(theme => ({
  dialogRoot: {
    '& .MuiDialog-paperWidthSm': {
      width: 340,
      [theme.breakpoints.up('sm')]: {
        width: 440,
      },
    },
  },
  titleRoot: {
    borderBottom: `1px solid ${theme.palette.borderColor.main}`,
    paddingBottom: 16,
  },
  listItemRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 24px',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 12,
      paddingBottom: 12,
    },
  },
  avatarRoot: {
    marginRight: 10,
    [theme.breakpoints.up('sm')]: {
      width: 56,
      height: 56,
      marginRight: 16,
    },
  },
  btnDisablColor: {
    color: theme.palette.text.disabled,
  },
  listItemTitleRoot: {
    fontWeight: theme.typography.fontWeightRegular,
    marginBottom: 5,
    letterSpacing: 0.15,
    marginLeft: 2,
  },
  listItemMailRoot: {
    fontSize: 14,
    color: theme.palette.text.secondary,
    letterSpacing: 0.25,
  },
  dialogActionsRoot: {
    paddingLeft: 24,
    paddingRight: 24,
  },
}));

const AssignTo = ({ options, handleClose, open, handleSave, title, selected, handleSelect }) => {
    const [value, setValue] = useState({});
  const classes = useStyles();

  console.log(selected)
  return (
    <Dialog className={classes.dialogRoot} onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">
        <Typography className={classes.titleRoot} component="div" variant="body1">
          {title}
        </Typography>
      </DialogTitle>
      <CmtList
        data={options}
        renderRow={item => (
          <Box component="div" className={classes.listItemRoot} key={item.id}>
            <IconButton onClick={() => setValue(item)}>
                <EditIcon/>
            </IconButton>
            <Box>
              <Typography component="div" variant="h4" className={classes.listItemTitleRoot}>
                {item.name}
              </Typography>
            </Box>
            <Box ml="auto">
              <AppRadioButton checked={selected?.id === item?.id} onChange={() => handleSelect(item)} />
            </Box>
          </Box>
        )}
      />

      <Box className={classes.listItemRoot}>
        <AppTextInput value={value.name} onChange={(e) => setValue({...value, name: e.target.value})} placeholder="Enter name..." />
        <IconButton size="small"
            onClick={() => handleSave(value)}
        >
            <DoneOutlineIcon fontSize="small" color="secondary"/>
        </IconButton>
      </Box>

      <DialogActions className={classes.dialogActionsRoot}>
        <Button onClick={handleClose} className={classes.btnDisablColor}>
          Close
        </Button>
        {/* <Button
          onClick={() => {
            handleClose();
          }}
          color="primary">
          Apply
        </Button> */}
      </DialogActions>
    </Dialog>
  );
};

export default AssignTo;
