import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button, CssBaseline, TextField, CircularProgress, FormControlLabel, Checkbox, Grid, Typography, Container, Box, InputAdornment, IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import VisibleIcon from '@mui/icons-material/Visibility';
import VisibleOffIcon from '@mui/icons-material/VisibilityOff';


//logo
import alayon from "../../../assets/RoundHeaded.png"


//Redux
import { useDispatch, useSelector } from "react-redux";
import { login } from '../../../redux/actions/auth.action';
import { LOGIN, SET_ERRORS } from '../../../redux/actions/types';



const theme = createTheme();

export default function SignIn() {
  const dispatch = useDispatch();
  const uiData = useSelector(state => state.ui);

  const {loading, errors} = useSelector(state => state.ui);
  const [values, setValues] = useState({});
  const [isHidden, setHidden] = useState(true);

  const handleChange = prop => event => {
    console.log(prop)
    delete errors[prop]
    setValues({...values, [prop]: event.target.value});
    dispatch({type: SET_ERRORS, payload: errors})
  }



  const handleSubmit = (event) => {
    event.preventDefault();
      dispatch(login(values))
  };

  
  return (
    
    <ThemeProvider theme={theme}>
      {/* {isAuthenticated && <Redirect to="/app"/>} */}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            alt="Alayon"
            src={alayon}
            sx={{ width: 150, height: 250}}
          />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} validate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              // required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={values.username}
              onChange={handleChange('username')}
              error={errors.username}
              helperText={errors.username && errors.username}
            />
            <TextField
              margin="normal"
              // required
              fullWidth
              name="password"
              label="Password"
              type={isHidden ? 'password' : 'text'}
              id="password"
              autoComplete="current-password"
              value={values.password}
              onChange={handleChange('password')}
              InputProps={{
                endAdornment: <InputAdornment position="end">
                  <IconButton onClick={() => setHidden(!isHidden)}>
                  {isHidden ? <VisibleOffIcon/> : <VisibleIcon/>}
                  </IconButton>
                </InputAdornment>,
              }}
              error={errors.password}
              helperText={errors.password && errors.password}
            />
            <Box style={{display: 'flex', flexDirection: 'row-reverse', }}>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"

            />
            </Box>
            <Box sx={{ m: 1, position: 'relative' }}>
        <Button
          variant="contained"
          sx={{ mt: 3, mb: 2}}
          disabled={loading}
            type="submit"
            fullWidth
        >
          Login
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              color: 'whitesmoke',
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Box>
            {/* <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button> */}
            <Grid container>
              <Grid item xs>
               
              </Grid>
              <Grid item>
                <span>Don't have an account? </span>
                <Link to="/signup" variant="body2">
                  {"Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>

    
  );
}