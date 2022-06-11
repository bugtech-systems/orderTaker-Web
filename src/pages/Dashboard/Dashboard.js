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
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'request', headerName: 'Requests', width: 200 },
    { field: 'department', headerName: 'Department', width: 130 },
    { field: 'dateCreated', headerName: 'Date Created', width: 130 },
    { field: 'status', headerName: 'Status', width: 130 },
    { field: 'action', headerName: 'Action', width: 130 },

  ];
  
  const rows = [
    { id: '1', name: 'Juan DelaCruz', request: 'Product Re-stock', department: 'Metro Staff', dateCreated: 'May 6 2022', status: 'Pending Request', action: 'Approved'},
    { id: '2', name: 'Juan Tamad', request: 'Updated Menu List', department: 'Cashier', dateCreated: 'May 6 2022', status: 'Pending Request', action: 'Decline'},
    { id: '3', name: 'Juan Pedro', request: 'Add Inventory', department: 'Cook', dateCreated: 'May 6 2022', status: 'Pending Request', action: 'For Review'},
    { id: '4', name: 'Juan Wamport', request: 'Purchased', department: 'Human Resource', dateCreated: 'May 6 2022', status: 'Pending Request', action: 'Approved'},
    { id: '5', name: 'Juan Angbit', request: 'Prodcut Request', department: 'Supply Chain', dateCreated: 'May 6 2022', status: 'Pending Request', action: 'Approved'},
  ];


  return (
    <Box sx={{ width: 1000, marginLeft: '330px', paddingTop: '30px'}}>
      <Grid container justifyContent="center">
        <Grid item xs={6}>
          <Tooltip placement="left-start">
            <h2>Dashboard</h2>
          </Tooltip>
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
              checkboxSelection
              sortable
              disableColumnMenu
              disableColumnFilter
              disableColumnSelector
            />
          </div>
        </Grid>
        <Grid item container xs={6} alignItems="flex-end" direction="column" paddingTop="82px" >
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
