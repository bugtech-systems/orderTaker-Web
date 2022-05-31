import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


//Redux
import { useDispatch, useSelector } from "react-redux";


export default function BasicForm({values, onChange}) {
      const [roles, setRoles] = useState(['User', 'Moderator', 'Admin'])

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Personal Information
      </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} lg={6}>
                <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First name"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    onChange={onChange('firstName')}
                    value={values.firstName}
                />
                </Grid>
                            <Grid item xs={12} lg={6}>
                            <TextField
                                required
                                id="lastName"
                                name="lastName"
                                label="Last name"
                                fullWidth
                                autoComplete="family-name"
                                variant="standard"
                                onChange={onChange('lastName')}
                                value={values.lastName}
                            />
                            </Grid>
                <Grid item xs={12} lg={6}>
                <TextField
                    id="date"
                    label="Birthdate"
                    type="date"
                    variant="standard"
                    defaultValue=""
                    fullWidth
                    InputLabelProps={{
                    shrink: true,
                    }}
                    onChange={onChange('birthDate')}
                    value={values.birthDate}
                />
                </Grid>

                <Grid item xs={12} lg={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.gender}
                    label="Gender"
                    variant="standard"
                    endIcon={<KeyboardArrowDownIcon />}
                    onChange={onChange('gender')}
                    fullWidth
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                   </Select>
                 </FormControl>
                </Grid>
            <Grid item xs={6}>
            <TextField
                id="contactnumber"
                name="contactnumber"
                label="Contact Number"
                fullWidth
                autoComplete=""
                variant="standard"
                onChange={onChange('contact')}
                value={values.contact}
            />
            </Grid>
            <Grid item xs={6} >
                       <TextField
                          required
                          id="email"
                          name="email"
                          label="Email"
                          type="email"
                          fullWidth
                          autoComplete="email"
                          variant="standard"
                          onChange={onChange('email_address')}
                          value={values.email_address}
                        />
                      </Grid>
                      <Grid item xs={12}>
                <TextField
                    id="address1"
                    name="address1"
                    label="Address"
                    fullWidth
                    autoComplete=""
                    variant="standard"
                    onChange={onChange('address')}
                    value={values.address}
                />
                </Grid>
      </Grid>
            <Typography variant="h6" gutterBottom sx={{ mt: 5}}>
              Login Credentials
            </Typography>
            <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.roles}
                    label="Gender"
                    variant="standard"
                    endIcon={<KeyboardArrowDownIcon />}
                    onChange={onChange('roles')}
                    fullWidth
                  >
                    {roles.map((a, index) => {
                      return(
                        <MenuItem key={index} value={String(a).toLowerCase()}>{a}</MenuItem>
                      )
                    })}
                   </Select>
                 </FormControl>
                </Grid>
            <Grid item xs={12} lg={12}>
                <TextField
                    // required
                    id="username"
                    name="username"
                    label="Username"
                    fullWidth
                    // autoComplete="username"
                    variant="standard"
                    onChange={onChange('username')}
                    value={values.username}
                />
                </Grid>
                <Grid item xs={12} lg={12}>
                    <TextField
                        // required
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        fullWidth
                        // autoComplete="password"
                        variant="standard"
                        onChange={onChange('password')}
                        value={values.password}
                    />
                    </Grid>
                </Grid>
    </React.Fragment>
  );
}