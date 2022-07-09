import React from 'react';
import CmtMediaObject from '../../../../../../../@coremat/CmtMediaObject';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { Tooltip } from '@material-ui/core';
import useStyles from './CartItem.style';

const TaskItem = ({ item, updateTask, onEdit }) => {
  const handleStatus = e => {
    updateTask({ ...item, isCompleted: e.target.checked });
  };
  const classes = useStyles();

  return (
    <Box className={classes.taskItemRoot}>
      <CmtMediaObject
        avatarPos="center"
        // avatar={<Checkbox checked={item.isCompleted} onChange={handleStatus} />}
        title={item?.user?.name}
        titleProps={{
          variant: 'h4',
          component: 'div',
          className: classes.titleRoot,
        }}
        subTitle={item.message}
        subTitleProps={{
          variant: 'body1',
          component: 'p',
          className: classes.subTitleRoot,
        }}
        actionsComponent={
          <Box className={classes.actionRoot}>
            <Tooltip title="Edit">
              <IconButton size="medium" className={classes.iconBtn} onClick={onEdit}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            {item.unreadComments > 0 && (
              <Box component="span" className={classes.badgeRoot}>
                12
              </Box>
            )}
          </Box>
        }
      >
 <Box display="flex" alignItems="center" mt={2} fontSize={12} color="text.secondary">
          <Box display="flex" alignItems="center" className="pointer">
            <Box fontSize={16}>
              add
            </Box>
            <Box ml={2}>Reply</Box>
          </Box>
          <Box ml={4} display="flex" alignItems="center" className="pointer">
            <Box fontSize={16}>
              less
            </Box>
            <Box ml={2}>Read</Box>
          </Box>
        </Box>
      </CmtMediaObject>
    </Box>
  );
};

export default TaskItem;
