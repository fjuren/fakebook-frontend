import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthorizationPage from './pages/AuthorizationPage';
import TimelinePage from './pages/TimelinePage';
import { getUser, logout } from './services/auth.service';
import './App.css';

function App() {
  const [authUser, setAuthUser] = useState(getUser());

  console.log(authUser);

  const logOut = () => {
    logout();
  };

  console.log('authUser: ');
  console.log(authUser);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              !authUser ? <AuthorizationPage /> : <Navigate to="/timeline" />
            }
          ></Route>
          <Route
            path="/timeline"
            element={authUser ? <TimelinePage /> : <Navigate to="/" />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
