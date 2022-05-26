import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function BusinessForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Business Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} >
          <TextField
            required
            id="businessName"
            label="Business Name"
            fullWidth
            autoComplete=""
            variant="standard"
          />
        </Grid>
        
        <Grid item xs={12} lg={6}>
          <TextField
            required
            id="contact"
            label="Business Contact #"
            fullWidth
            autoComplete=""
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            required
            id="email"
            label="Email Address"
            // helperText="Business Email"
            fullWidth
            autoComplete=""
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} >
          <TextField
            required
            id="businessAddress"
            label="Business Address"
            fullWidth
            autoComplete=""
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember Business Information details for next time"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}