import * as React from 'react'
import { styled, useTheme } from "@mui/material/styles";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import {
  Box,
  Grid,
  InputLabel,
  FormHelperText,
  Stack,
  OutlinedInput,
  Typography, 
  FormControl,
  Button,
  IconButton,
  InputAdornment
} from '"@material-ui/core"'

// const CardWrapper = styled()(({ theme }) => ({
//   backgroundColor: theme.palette.background.paper,
//   color: '#fff',
//   overflow: 'hidden',
//   height: '100%',
//   boxShadow: '0 5px 15px 0 grey',
//   marginBottom: 30,
//   '&:hover': {
//     boxShadow: '0 5px 15px 0 grey',
//   }
// }));

const UserInformation = (props) => {
  const theme = useTheme();
  const { userSecurityInfo, ...otherProps } = props;
  const [editing, setEditing] = React.useState(false);
  
  const [changePass, setChangePass] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState({
    old: false, new: false, confirm: false,
  });

  const handleClickShowPassword = (key) => {
    let passState = showPassword;
    passState[key] = !showPassword[key] ? true : false;
    setShowPassword({ ...passState });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Card {...otherProps}>
      <Box
        initialValues={userSecurityInfo}
        enableReinitialize={true}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          console.log(values)
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Box sx={{ p: 1.25 }}>
              <Grid container direction="column">
                <Grid item>

                </Grid>
                <Grid item>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor='profile-email'>Email</InputLabel>
                    <OutlinedInput
                      id="profile-email"
                      type="email"
                      name="email"
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Email"
                      disabled={editing}
                    />
                  </FormControl>

                  <Stack direction="row" justifyContent="end">
                    <Typography
                      component={Button}
                      sx={{ color: 'blue', alignSelf: 'flex-end' }}
                      onClick={() => setChangePass(true)}
                    >
                      Change Password?
                    </Typography>
                  </Stack>

                  {changePass && (
                    <>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.oldPass && errors.oldPass)}
                        sx={{ ...theme.typography.customInput }}
                      >
                        <InputLabel>Old Password</InputLabel>
                        <OutlinedInput
                          type={showPassword.old ? "test" : "password"}
                          value={values.oldPass}
                          name="oldPass"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Old Password"
                          endAdornment={
                            <InputAdornment>
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => handleClickShowPassword('old')}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                size="large"
                              >
                                {showPassword.old ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        {touched.oldPass && errors.oldPass && (
                          <FormHelperText error id="standard-weight-helper-text-oldPass-profile">
                            {errors.oldPass}
                          </FormHelperText>
                        )}
                      </FormControl>

                      <FormControl
                        fullWidth
                        error={Boolean(touched.newPass && errors.newPass)}
                        sx={{ ...theme.typography.customInput }}
                      >
                        <InputLabel>New Password</InputLabel>
                        <OutlinedInput
                          type={showPassword.new ? "test" : "password"}
                          value={values.newPass}
                          name="newPass"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="New Password"
                          endAdornment={
                            <InputAdornment>
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => handleClickShowPassword('new')}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                size="large"
                              >
                                {showPassword.new ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>

                      <FormControl
                        fullWidth
                        error={Boolean(touched.confirmNewPass && errors.confirmNewPass)}
                        sx={{ ...theme.typography.customInput }}
                      >
                        <InputLabel>Confirm New Password</InputLabel>
                        <OutlinedInput
                          type={showPassword.confirm ? "test" : "password"}
                          value={values.confirmNewPass}
                          name="confirmNewPass"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Confirm Password"
                          endAdornment={
                            <InputAdornment>
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => handleClickShowPassword('confirm')}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                size="large"
                              >
                                {showPassword.confirm ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>

                      <Stack direction="row" justifyContent="end">
                        <Typography
                          component={Button}
                          sx={{ color: 'red', alignSelf: 'flex-end' }}
                          onClick={() => setChangePass(false)}
                        >
                          Cancel
                        </Typography>
                      </Stack>
                    </>
                  )}
                </Grid>
                <Grid item>

                </Grid>
              </Grid>
            </Box>
          </form>
        )}
      </Box>
    </Card>
  );
}

export default UserInformation;