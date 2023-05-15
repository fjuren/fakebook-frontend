import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';

import '../assets/styles/authorizationPage.css';

export default function AuthorizationPage() {
  return (
    <>
      <div id="authPage">
        <ThemeProvider theme={theme}>
          <h1
            style={{
              color: '#1877F2',
              fontFamily: 'sans-serif',
              letterSpacing: '-3px',
            }}
          >
            fakebook
          </h1>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginForm />}></Route>
              <Route path="/signup" element={<SignupForm />}></Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </div>
    </>
  );
}
