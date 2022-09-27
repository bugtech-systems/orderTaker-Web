import React from 'react';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import PageContainer from '../../../../@jumbo/components/PageComponents/layouts/PageContainer';
import TextDisplay from '../../../../@jumbo/utils/TextDisplay';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Profile from '../Profile';



const breadcrumbs = [
  { label: <TextDisplay name="Settings" />, link: '/settings' },
  { label: <TextDisplay name="Configurations" />, isActive: true },
];

const Dashboard = () => {
  return (
    <PageContainer heading={"Configurations"} breadcrumbs={breadcrumbs}>
      <GridContainer>
        <Grid item xs={12}>
          <Divider />
          <div style={{ marginTop: 24 }}>
            {/* <h3>Knowledge Base and Support</h3> */}
            <Profile />
          </div>
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default Dashboard;
