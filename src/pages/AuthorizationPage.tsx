import { useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';

import '../assets/styles/authorizationPage.css';

export default function AuthorizationPage() {
  const [loadLoginPage, setLoadLoginPage] = useState(true);

  const toggleLogin = () => {
    setLoadLoginPage(!loadLoginPage);
  };

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
          {loadLoginPage ? (
            <LoginForm toggleLogin={toggleLogin} />
          ) : (
            <SignupForm toggleLogin={toggleLogin} />
          )}
        </ThemeProvider>
      </div>
    </>
  );
}
