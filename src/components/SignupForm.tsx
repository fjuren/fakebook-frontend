import { useState } from 'react';
import { Box, TextField, Button, Typography, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { validateEmail, validatePassword } from '../utils/helpers';
import { signup } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

// new way to do makeStyles - due to MUI update to V5 & React 18 compatibility
const TextFieldHideRequiredAsterisk = styled(TextField)({
  '& .MuiInputLabel-asterisk': {
    display: 'none',
  },
});

export default function SignupForm({ toggleLogin }: any) {
  // field values
  const [firstName, setFname] = useState('');
  const [lastName, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // field validation values
  const [fnameError, setFnameError] = useState(false);
  const [fnameErrorText, setFnameErrorText] = useState('');

  const [lnameError, setLnameError] = useState(false);
  const [lnameErrorText, setLnameErrorText] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [emailErrorText, setEmailErrorText] = useState('');

  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorText, setPasswordErrorText] = useState('');

  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordErrorText, setConfirmPasswordErrorText] = useState('');

  const navigate = useNavigate();

  const signupHandler = (e: any) => {
    e.preventDefault();

    if (firstName.length === 0) {
      setFnameError(true);
      setFnameErrorText('Please enter your first name');
      return;
    } else {
      setFnameError(false);
      setFnameErrorText('');
    }
    if (lastName.length === 0) {
      setLnameError(true);
      setLnameErrorText('Please enter your last name');
      return;
    } else {
      setLnameError(false);
      setLnameErrorText('');
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
    if (confirmPassword !== password) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorText(
        'Your passwords do not match. Please try again'
      );
      return;
    } else {
      setConfirmPasswordError(false);
      setConfirmPasswordErrorText('');
    }

    // TODO
    // [ ] create process.env development & production urls
    signup(firstName, lastName, email, password, confirmPassword)
      .then((response) => {
        if (response.status === 200) {
          navigate('/timeline');
          window.location.reload();
        }
      })
      .catch((err) => {
        // handler if email already exists
        if (err.response.data.error.includes('Email')) {
          setEmailError(true);
          setEmailErrorText(err.response.data.error);
        }
        console.log(err.response.data);
      });
  };

  return (
    <Box
      component="form"
      onSubmit={signupHandler}
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="on"
    >
      <Typography variant="h5">Create a new account</Typography>
      <Typography variant="body1"> It's quick and easy</Typography>
      <TextFieldHideRequiredAsterisk
        id="fname"
        type="text"
        label="First name"
        variant="outlined"
        value={firstName}
        onChange={(e) => setFname(e.target.value)}
        error={fnameError}
        helperText={fnameErrorText}
      />
      <TextFieldHideRequiredAsterisk
        id="lname"
        type="text"
        label="Last name"
        variant="outlined"
        value={lastName}
        onChange={(e) => setLname(e.target.value)}
        error={lnameError}
        helperText={lnameErrorText}
      />
      <TextFieldHideRequiredAsterisk
        id="email"
        type="email"
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={emailError}
        helperText={emailErrorText}
      />
      <TextFieldHideRequiredAsterisk
        id="password"
        type="password"
        label="New password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={passwordError}
        helperText={passwordErrorText}
      />
      <TextFieldHideRequiredAsterisk
        id="confirmPassword"
        type="password"
        label="Confirm password"
        variant="outlined"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={confirmPasswordError}
        helperText={confirmPasswordErrorText}
      />

      <Button variant="contained" type="submit">
        Sign Up
      </Button>
      <Button variant="contained">Log in with a test account</Button>
      <Link component="button" variant="body2" onClick={toggleLogin}>
        Already have an account?
      </Link>
    </Box>
  );
}
