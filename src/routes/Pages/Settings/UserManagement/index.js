import React from 'react';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import PageContainer from '../../../../@jumbo/components/PageComponents/layouts/PageContainer';
import TextDisplay from '../../../../@jumbo/utils/TextDisplay';
import Grid from '@material-ui/core/Grid';


//Components
import UserList from './UsersList';



const breadcrumbs = [
  { label: <TextDisplay name="Settings" />, link: '/settings' },
  { label: <TextDisplay name="User Management" />, isActive: true },
];

const Dashboard = () => {
  return (
    <PageContainer heading={"User Management"} breadcrumbs={breadcrumbs}>
      <GridContainer>
      <Grid item xs={12} lg={12}>
          <UserList />
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default Dashboard;
