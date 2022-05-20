import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';





export default function AddressForm() {
    
        //dropdown Gender
        const [gender, setGender] = React.useState('');

        const handleChange = (event) => {
          setGender(event.target.value);
        };  

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Personal Information
      </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First name"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                />
                </Grid>
                            <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="lastName"
                                name="lastName"
                                label="Last name"
                                fullWidth
                                autoComplete="family-name"
                                variant="standard"
                            />
                            </Grid>
                <Grid item xs={6}>
                <TextField
                    id="date"
                    label="Birthdate"
                    type="date"
                    variant="standard"
                    defaultValue=""
                    sx={{ width: 180 }}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                </Grid>

                <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={gender}
                    label="Gender"
                    endIcon={<KeyboardArrowDownIcon />}
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Male</MenuItem>
                    <MenuItem value={20}>Female</MenuItem>
                   </Select>
                 </FormControl>
                </Grid>

                <Grid item xs={12}>
                <TextField
                    id="address1"
                    name="address1"
                    label="Address"
                    fullWidth
                    autoComplete=""
                    variant="standard"
                />
                </Grid>
            <Grid item xs={6}>
            <TextField
                id="contactnumber"
                name="contactnumber"
                label="Contact Number"
                fullWidth
                autoComplete=""
                variant="standard"
            />
            </Grid>
      </Grid>
            <Typography variant="h6" gutterBottom sx={{ mt: 5}}>
              Login Credentials
            </Typography>
            <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
                <TextField
                    required
                    id="username"
                    name="username"
                    label="Username"
                    fullWidth
                    autoComplete="username"
                    variant="standard"
                />
                </Grid>
                      <Grid item xs={7} >
                       <TextField
                          required
                          id="email"
                          name="email"
                          label="Email"
                          type="email"
                          fullWidth
                          autoComplete="email"
                          variant="standard"
                        />
                      </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        required
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        fullWidth
                        autoComplete="password"
                        variant="standard"
                    />
                    </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        required
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        fullWidth
                        autoComplete="confirmPassword"
                        variant="standard"
                    />
                  </Grid>
                </Grid>
    </React.Fragment>
  );
}