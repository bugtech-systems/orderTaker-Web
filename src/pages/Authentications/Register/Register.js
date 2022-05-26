import React, { useEffect, useState } from 'react';
import {
  Link
} from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BasicForm from './BasicForm';
import BusinessForm from './BusinessForm';


//Redux
import { useDispatch, useSelector } from "react-redux";



const steps = ['Personal Information', 'Business Information'];



const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [values, setValues] = useState({});

  const handleChange = prop => event => {
    setValues({...values, [prop]: event.target.value})
  }


  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <BusinessForm
          values={values}
          onChange={handleChange}
        />;
      case 1:
        return <BasicForm />;
      default:
        throw new Error('Unknown step');
    }
  }


  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };


  console.log(values)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            CREATE ACCOUNT
          </Typography>
        {activeStep <= 1 &&  <Typography component="h6" variant="h6" align="center">
            Already have an account?  <Link to="/login" style={{textDecoration: 'none', fontWeight: '550'}}>Sign In</Link>
          </Typography> }
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for signing up
                </Typography>
                <Link to="/login"  style={{textDecoration: 'none', fontWeight: '550'}}>
                <Button variant='contained'>
                  Let's Get Started!
                </Button>
                </Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}