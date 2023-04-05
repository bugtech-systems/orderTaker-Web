import React from 'react';
import { Box, Button } from '@material-ui/core';
import useStyles from './index.style';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import CmtSearch from '../../../../@coremat/CmtSearch';
import { getInventoryList, setFilterType, toggleExpandSidebar } from '../../../../redux/actions/ProductApp';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// import GridOnIcon from '@material-ui/icons/GridOn';
// import ListIcon from '@material-ui/icons/List';
import Hidden from '@material-ui/core/Hidden';
// import CropFreeIcon from '@material-ui/icons/CropFree';


const AppHeader = ({ onChangeViewMode, viewMode }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { filterType } = useSelector(({ productApp }) => productApp);
  const { searchText } = filterType;

  const handleSearchText = e => {
    dispatch(
      setFilterType({
        ...filterType,
        selectedFolder: e.target.value ? '' : 'products',
        selectedLabel: '',
        searchText: e.target.value,

      }),
    );
  };


  const handleSubmit = e => {
    e.preventDefault();
    
    dispatch(getInventoryList(filterType))
  };

  // const handleScanner = e => {
  //   dispatch(
  //     setFilterType({
  //       selectedFolder: e ? '' : 'products',
  //       selectedLabel: '',
  //       searchText: e,
  //     }),
  //   );
  // };

  return (
    <Box className={classes.inBuildAppHeader}>
      <Box className={classes.inBuildAppHeaderSidebar}>
        <Hidden smDown>
          <IconButton onClick={() => dispatch(toggleExpandSidebar())}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Box>

      <Box style={{width: '100%'}} component="form" onSubmit={handleSubmit}>
      <Box  className={classes.inBuildAppHeaderContent} >
        <CmtSearch placeholder="Search Products..." value={searchText} onChange={handleSearchText} border={false} />
        <Box ml="auto" display="flex" alignItems="center">
          <Button type='submit' variant="outlined" size="small">Search</Button>
          {/* <Box ml={1}>
            <IconButton
              className="icon-btn active"
              color={viewMode === 'table' ? 'primary' : 'default'}
              onClick={() => onChangeViewMode('table')}>
              <ListIcon />
            </IconButton>
          </Box>
          <Box ml={1}>
            <IconButton
              className="icon-btn"
              color={viewMode === 'grid' ? 'primary' : 'default'}
              onClick={() => onChangeViewMode('grid')}>
              <GridOnIcon />
            </IconButton>
          </Box> */}
        </Box>
          {/* <Box ml={1}>
            <IconButton
              className="icon-btn active"
              color={viewMode === 'table' ? 'primary' : 'default'}
              onClick={() => onChangeViewMode('table')}>
              <ListIcon />
            </IconButton>
          </Box>
          <Box ml={1}>
            <IconButton
              className="icon-btn"
              color={viewMode === 'grid' ? 'primary' : 'default'}
              onClick={() => onChangeViewMode('grid')}>
              <GridOnIcon />
            </IconButton>
          </Box> */}
      </Box>
      </Box>
    </Box>
  );
};

export default AppHeader;

AppHeader.prototype = {
  onChangeViewMode: PropTypes.func,
};
