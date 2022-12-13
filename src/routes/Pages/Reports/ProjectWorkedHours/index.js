import React, { useState, useEffect } from 'react';
import CmtBackDrop from '../../../../@coremat/CmtBackDrop';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Box from '@material-ui/core/Box';
import { classicWidget } from '../../../../@fake-db';
import AppDatePicker from '../../../../@jumbo/components/Common/formElements/AppDatePicker';
import ProjectWorkedGraph from './ProjectWorkedGraph';
import AppSelectBox from '../../../../@jumbo/components/Common/formElements/AppSelectBox';
import CmtCardContent from '../../../../@coremat/CmtCard/CmtCardContent';
import { getFormattedDate } from '../../../../@jumbo/utils/dateHelper';
import { alpha, makeStyles } from '@material-ui/core/styles';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import RefreshIcon from '@material-ui/icons/Refresh';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import GridContainer from '@jumbo/components/GridContainer';
import { Grid, Typography } from '@material-ui/core';

//Components
import Table from '../Table';
import { useDispatch } from 'react-redux';
import { getOrders } from 'redux/actions/OrderApp';


const useStyles = makeStyles(theme => ({
  headerItem: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: 16,
    paddingLeft: 16,
    [theme.breakpoints.down('xs')]: {
      fontSize: 13,
      paddingLeft: 8,
      paddingRight: 8,
    },
    color: alpha(theme.palette.common.white, 0.74),
    '&:not(:first-child)': {
      borderLeft: `1px solid ${alpha(theme.palette.common.white, 0.8)}`,
    },
    '& .MuiSvgIcon-root': {
      marginRight: 12,
    },
  },
  backdropContent: {
    color: alpha(theme.palette.common.white, 0.74),
    '& .form-control': {
      marginBottom: 20,
      '& label, & .MuiInput-formControl, & .MuiSelect-icon, & .MuiIconButton-root': {
        color: alpha(theme.palette.common.white, 0.74),
      },
      '& .MuiInput-underline:before, & .MuiInput-underline:after': {
        borderBottomColor: alpha(theme.palette.common.white, 0.74),
      },
    },
  },
  subHeaderBottom: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

const breadcrumbs = [
  { label: 'Dashboard', link: '/' },
  { label: 'Reports', link: '/reports' },
];


const ProjectSwitcher = ({ currentProject, setCurrentProject, startDate, setStartDate, endDate, setEndDate }) => {
  
  
  const handleProjectChange = event => {
    console.log(event.target.value)
    console.log(classicWidget.projects.find(project => project.value === event.target.value))

    setCurrentProject(classicWidget.projects.find(project => project.value === event.target.value));
  };

  const onStartDateChange = date => {
    setStartDate(date);
  };

  const onEndDateChange = date => {
    setEndDate(date);
  };
  const classes = useStyles();

  
console.log(currentProject.value)
  console.log(currentProject)
  console.log(classicWidget)
  return (
  
    <CmtCardContent>
      <Box className={classes.backdropContent}>
        <AppSelectBox
          label="Select Report Table"
          data={classicWidget.projects}
          valueKey="value"
          labelKey="label"
          value={currentProject.value}
          onChange={handleProjectChange}
          // disabled={true}
        />
        <AppDatePicker label="Start Date" value={startDate} onChange={onStartDateChange} />
        <AppDatePicker label="End Date" value={endDate} onChange={onEndDateChange} />
      </Box>
    </CmtCardContent>
   
  );
};

const ProjectHeader = ({ revealed, startDate, endDate }) => {
  const classes = useStyles();
  return (
    <Box display="flex" alignItems="center" mx={{ xs: -2, sm: -4 }}>
      <Box className={classes.headerItem}>Reports</Box>
      <Box className={classes.headerItem}>
        <CalendarTodayIcon />
        {getFormattedDate(startDate, ' DD MMM')} - {getFormattedDate(endDate, ' DD MMM')}
      </Box>
    </Box>
  );
};

const ProjectWorkedHours = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentProject, setCurrentProject] = React.useState(classicWidget.projects[1]);
  const [startDate, setStartDate] = React.useState('2020-07-03');
  const [endDate, setEndDate] = React.useState('2020-08-20');
  const [revealed, setRevealed] = useState(false);
  const [tableData, setTableData] = useState([]);

  const handleOnRevealed = status => {
    setRevealed(status);
  };

  const handleProject = (e) => {
    setCurrentProject(e)
  }


  const resetWidget = () => {
    setCurrentProject(classicWidget.projects[0]);
  };  

  const handleReset = () => {
    dispatch(getOrders({
      page: 0,
      rowsPerPage: 10
    }))
  };




  return (
    <PageContainer heading="Sales Report" breadcrumbs={breadcrumbs}>
    <GridContainer>
      <Grid item xs={12} sm={12} md={12} lg={12}>
    <CmtBackDrop
      concealedIcon={<DeveloperBoardIcon />}
      extrasContainer={<RefreshIcon className="pointer" 
      onClick={handleReset} />}
      backLayerConcealed={<ProjectHeader revealed currentProject={currentProject} startDate={startDate} endDate={endDate} />
      }
      backLayerRevealed={
        <ProjectSwitcher
          currentProject={currentProject}
          setCurrentProject={handleProject}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      }
      onRevealed={handleOnRevealed}
      >
      <Box p={6}>
        <Box>

        <Typography className={classes.title} variant="h4" id="tableTitle" component="div">
            {currentProject.label}
          </Typography>
      </Box>
        <Box className={classes.subHeaderBottom}>
          <Box>
            {getFormattedDate(startDate, ' DD MMM')} - {getFormattedDate(endDate, ' DD MMM')}
          </Box>

          <Box component="span" fontSize={14} color="primary.main">
            
          </Box>
        </Box> 
      </Box>
      <Box width="100%">
      <Table
        project={currentProject}
        startDate={startDate}
        endDate={endDate}
      />
      </Box>
      {/* <ProjectWorkedGraph
        data={currentProject.data}
        color={currentProject.color}
        backgroundColor={currentProject.backgroundColor}
      /> */}
    </CmtBackDrop>
    </Grid>
    </GridContainer>
    </PageContainer>
  );
};

export default ProjectWorkedHours;
