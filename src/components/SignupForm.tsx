// import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

export default function SignupForm() {
  const [firstName, setFname] = useState('');
  const [lastName, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const signupHandler = (e: any) => {
    e.preventDefault();

    const data = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    };

    console.log(data);
    // TODO
    // [ ] create process.env development & production urls
    // [ ] field validation on front end
    axios
      .post('http://localhost:3000/api/users/signup', data)
      .then((response) => {
        if (response.status === 200) {
          navigate('/timeline'); // TODO handle authorization with JWT and update app.tsx to access routes once user is authenticated
        }
        console.log(response.data);
      })
      .catch((err) => {
        // 400 error messages from backend
        console.log(err.response.data.errors);
      });
  };

  return (
    <Box
      component="form"
      onSubmit={signupHandler}
      // onSubmit={(e) => {
      //   handleSignUp(e);
      // }}
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      // noValidate
      autoComplete="on"
    >
      <Typography variant="h5">Create a new account</Typography>
      <Typography variant="body1"> It's quick and easy</Typography>
      <TextField
        id="fname"
        type="text"
        label="First name"
        variant="outlined"
        value={firstName}
        onChange={(e) => setFname(e.target.value)}
      />
      <TextField
        id="lname"
        type="text"
        label="Last name"
        variant="outlined"
        value={lastName}
        onChange={(e) => setLname(e.target.value)}
      />
      <TextField
        id="email"
        type="email"
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        id="password"
        type="password"
        label="New password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        id="confirmPassword"
        type="password"
        label="Confirm password"
        variant="outlined"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <Button variant="contained" type="submit">
        Sign Up
      </Button>
      <Button variant="contained">Log in with a test account</Button>
      <a href="/login">Already have an account?</a>
    </Box>
  );
}
