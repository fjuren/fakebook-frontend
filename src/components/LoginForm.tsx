import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Divider, Typography } from '@mui/material';
import { login } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from '../utils/helpers';
import Spinner from './Spinner';

export default function LoginForm({ toggleLogin }: any) {
  const [loading, setLoading] = useState(false);
  // field values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // field validation
  const [emailError, setEmailError] = useState(false);
  const [emailErrorText, setEmailErrorText] = useState('');

  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorText, setPasswordErrorText] = useState('');

  const [, setOtherError] = useState(false);
  const [otherErrorText, setOtherErrorText] = useState('');

  const navigate = useNavigate();

  const loginHandler = (e: any) => {
    e.preventDefault();

    // client side validation
    if (email.length === 0) {
      setEmailError(true);
      setEmailErrorText('Please enter your email');
      return;
    } else {
      setEmailError(false);
      setEmailErrorText('');
    }
    if (!validateEmail(email)) {
      setEmailError(true);
      setEmailErrorText(
        'Please enter a valid email address. Eg example@gmail.com'
      );
      return;
    } else {
      setEmailError(false);
      setEmailErrorText('');
    }
    // if email doesn't exist? This validation is in API call below in login helper
    if (password.length === 0) {
      setPasswordError(true);
      setPasswordErrorText('Please enter your password');
      return;
    } else {
      setPasswordError(false);
      setPasswordErrorText('');
    }
    // if password is incorrect? This validation is in API call below in login helper
    if (!validatePassword(password)) {
      setPasswordError(true);
      setPasswordErrorText(
        'Your password must be 8-100 characters long, with at least one uppercase, one number and one special symbol. Eg !@#$%'
      );
      return;
    } else {
      setPasswordError(false);
      setPasswordErrorText('');
    }
    setLoading(true);
    // API call in login helper; includes validation from backend
    login(email, password)
      .then((response) => {
        if (response.status === 200) {
          event?.preventDefault();
          setLoading(false);
          window.location.reload();
          setOtherError(false);
          setOtherErrorText('');
          navigate('/timeline');
        }
      })
      .catch((err) => {
        setLoading(false);
        // handler if network error
        if (err.code == 'ERR_NETWORK') {
          setOtherError(true);
          setOtherErrorText('Network issue. Please try again later');
        }
        // handler if email doesn't exist
        if (err.response.data.error.includes('Email')) {
          setEmailError(true);
          setEmailErrorText(err.response.data.error);
        }
        // hander if password is incorrect
        if (err.response.data.error.includes('Password')) {
          setPasswordError(true);
          setPasswordErrorText(err.response.data.error);
        }
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
        error={emailError}
        helperText={emailErrorText}
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
        error={passwordError}
        helperText={passwordErrorText}
      />
      {loading ? <Spinner /> : null}
      <Button variant="contained" type="submit">
        Log In
      </Button>
      <p style={{ color: 'red' }}>{otherErrorText}</p>
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
