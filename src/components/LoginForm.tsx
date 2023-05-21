// import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Divider, Typography } from '@mui/material';

export default function LoginForm() {
  const navigate = useNavigate();

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h5">Log Into Fakebook</Typography>
      <TextField
        id="outlined-basic"
        type="email"
        label="Email"
        variant="outlined"
      />
      <TextField
        id="outlined-basic"
        type="password"
        label="Password"
        variant="outlined"
      />

      <Button variant="contained">Log In</Button>
      <a href="">Forgot account?</a>
      <div id="divider">
        <Divider> or </Divider>
      </div>
      <Button
        variant="contained"
        onClick={() => {
          navigate('/signup');
        }}
      >
        Create new account
      </Button>
      <Button variant="contained">Log in with a test account</Button>
    </Box>
  );
}
