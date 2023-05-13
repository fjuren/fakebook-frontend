// import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function SignupForm() {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <h1>Create a new account</h1>
      <p>It's quick and easy</p>
      <TextField id="outlined-basic" label="First name" variant="outlined" />
      <TextField id="outlined-basic" label="Last name" variant="outlined" />
      <TextField id="outlined-basic" label="Email" variant="outlined" />
      <TextField id="outlined-basic" label="New password" variant="outlined" />
      <TextField
        id="outlined-basic"
        label="Confirm password"
        variant="outlined"
      />

      {/* Sign Up */}
      <Button variant="contained">Sign Up</Button>
      <Button variant="contained">Log in with a test account</Button>
      {/* Already have an account? */}
      <a href="/login">Already have an account?</a>
    </Box>
  );
}
