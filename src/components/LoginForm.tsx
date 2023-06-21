import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Divider, Typography } from '@mui/material';
import { login } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

export default function LoginForm({ toggleLogin }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const loginHandler = (e: any) => {
    e.preventDefault();

    login(email, password)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          navigate('/timeline');
          window.location.reload();
          console.log(response.data);
        }
      })
      .catch((err) => {
        // 400 error messages from backend
        console.log(
          `~ERROR~ err.response.data.errors: ${err.response.data.errors}`
        );
        console.log(`~ERROR~ err: ${err}`);
      });
  };

  return (
    <Box
      component="form"
      onSubmit={loginHandler}
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
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <TextField
        id="outlined-basic"
        type="password"
        label="Password"
        variant="outlined"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <Button variant="contained" type="submit">
        Log In
      </Button>
      <a href="">Forgot account?</a>
      <div id="divider">
        <Divider> or </Divider>
      </div>
      <Button variant="contained" onClick={toggleLogin}>
        Create new account
      </Button>
      <Button variant="contained">Log in with a test account</Button>
    </Box>
  );
}
