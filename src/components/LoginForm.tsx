// import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';

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
      <h3>Log Into Fakebook</h3>
      <TextField id="outlined-basic" label="Email" variant="outlined" />
      <TextField id="outlined-basic" label="Password" variant="outlined" />

      {/* Sign Up */}
      <Button variant="contained">Log In</Button>
      {/* Already have an account? */}
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
