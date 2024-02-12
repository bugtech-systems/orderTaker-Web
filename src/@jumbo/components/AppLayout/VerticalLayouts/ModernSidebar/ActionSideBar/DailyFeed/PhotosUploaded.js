import React from 'react';
import useStyles from './BaseItem.style';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import BaseItem from './BaseItem';
import CmtAvatar from '../../../../../../../@coremat/CmtAvatar';

import commonData from 'utils/commonData';

const PhotosUploaded = ({ item }) => {
  const classes = useStyles();

  const getTitle = () => {
    return (
      <Typography component="div" variant="h5" className={classes.titleRoot}>
        <Box component="span" color="blue">
          {item.title}
        </Box>
        <Box component="span" ml={1}>
         {item.description}
        </Box>
        {/* <Box component="span" color="blue" ml={1}>
          {item.metaData.group}
        </Box> */}
      </Typography>
    );
  };

  return (
    <BaseItem item={item} title={getTitle()} avatar={`${commonData.staticUrl}${item.sender.dpUrl}`} username={item.sender.name}>
      {/* {item.metaData.photos.map((photo, index) => (
        <Box key={index} mr={1}>
          <CmtAvatar src={photo.photo_url} alt={photo.caption} size="small" variant="rounded" />
        </Box>
      ))} */}
    </BaseItem>
  );
};

export default PhotosUploaded;
