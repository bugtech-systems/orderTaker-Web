import React, { useState } from 'react';
import CmtBackDrop from '../../../../../../../@coremat/CmtBackDrop';
import { intranet } from '../../../../../../../@fake-db';
import PerfectScrollbar from 'react-perfect-scrollbar';
import TuneIcon from '@material-ui/icons/Tune';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FilterForm from './FilterForm';
import Notifications from './Notifications';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import { IconButton } from '@material-ui/core';

//Icons
import CloseIcon from '@material-ui/icons/Close';
import { useSelector } from 'react-redux';


const useStyles = makeStyles(() => ({
  scrollbarRoot: {
    height: '90vh',
    overflowX: 'hidden',
    overflowY: 'scroll'
  },
}));

const defaultTitle = 'Notifications';
const LatestNotifications = ({onClose}) => {
  const { notifications } = useSelector(({uiReducer}) => uiReducer);
  const [title, setTitle] = useState(defaultTitle);
  const [listsToShow, setListsToShow] = useState([]);
  const classes = useStyles();

  const onRevealedAction = status => {
    setTitle(status ? 'Filter By' : defaultTitle);
  };

console.log(listsToShow);
console.log(title)
console.log(notifications)

  return (
    <CmtBackDrop
      concealedIcon={<TuneIcon />}
      backLayerConcealed={title}
      onRevealed={onRevealedAction}
      extrasContainer={<IconButton size='small' onClick={() => onClose()}><CloseIcon /></IconButton>}
      backLayerRevealed={<FilterForm listsToShow={listsToShow} setListsToShow={setListsToShow} />}>
      <Box pb={5}>
        <PerfectScrollbar className={classes.scrollbarRoot}>
          <Notifications listsToShow={listsToShow} notifications={notifications} />
        </PerfectScrollbar>
      </Box>
    </CmtBackDrop>
  );
};

export default LatestNotifications;
