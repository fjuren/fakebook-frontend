// import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

export default function SignupForm() {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      // noValidate
      autoComplete="on"
    >
      <Typography variant="h5">Create a new account</Typography>
      <Typography variant="body1"> It's quick and easy</Typography>
      <TextField
        id="outlined-basic"
        type="text"
        label="First name"
        variant="outlined"
      />
      <TextField
        id="outlined-basic"
        type="text"
        label="Last name"
        variant="outlined"
      />
      <TextField
        id="outlined-basic"
        type="email"
        label="Email"
        variant="outlined"
      />
      <TextField
        id="outlined-basic"
        type="password"
        label="New password"
        variant="outlined"
      />
      <TextField
        id="outlined-basic"
        type="password"
        label="Confirm password"
        variant="outlined"
      />

      <Button variant="contained">Sign Up</Button>
      <Button variant="contained">Log in with a test account</Button>
      <a href="/login">Already have an account?</a>
    </Box>
  );
}
