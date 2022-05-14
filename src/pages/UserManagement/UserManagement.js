import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { DataGrid } from '@mui/x-data-grid';



export default function PositionedTooltips() {
  const columns = [
    { field: 'role', headerName: 'Role', width: 190},
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'request', headerName: 'Request', width: 200 },
    { field: 'status', headerName: 'Status', width: 200 },
    { field: 'action', headerName: 'Actions', width: 200 },

  ];
  
  const rows = [
    { id: '1', role: 'admin', name: 'Juan DelaCruz', request: 'Product Re-stock',  status: 'Pending Request', action: 'Approved'},
    { id: '2', role: 'user', name: 'Juan Tamad', request: 'Add Inventory', status: 'Pending Request', action: 'Decline'},
    { id: '3', role: 'admin', name: 'Juan Pedro', request: 'Purchased', status: 'Pending Request', action: 'For Review'},
    { id: '4', role: 'admin', name: 'Juan Wamport', request: 'Product Request',  status: 'Pending Request', action: 'Approved'},
    { id: '5', role: 'admin', name: 'Juan Angbit', request: 'Purchased', status: 'Pending Request', action: 'Approved'},
  ];


  return (
    <Box sx={{ width: 1000, marginLeft: '320px', paddingTop: '40px'}}>
      <Grid container justifyContent="center">
        <Grid item xs={6}>
          <br />
          <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search by name, description"
                  inputProps={{ 'aria-label': 'search by name, description' }}
                />
                  <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                  </IconButton>
          </Paper>
          <br />
          <div style={{ height: 400, width: 1000 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disablecheckboxSelection
              sortable
              disableColumnMenu
              disableColumnFilter
              disableColumnSelector
            />
          </div>
        </Grid>
        <Grid item container xs={6} alignItems="flex-end" direction="column" paddingTop="38px" >
          <Grid item marginLeft="2px"> 
            <Tooltip title="Filter" placement="right">
              <Button>
                <FilterAltIcon/> 
                   Filter
              </Button>
            </Tooltip>
            <Tooltip title="Download" placement="right">
              <Button> 
                <DownloadIcon/>
                  Export
              </Button>
            </Tooltip>
            <Tooltip title="Add" placement="right">
              <Button>
                <AddIcon/>
                  Add Admin
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
