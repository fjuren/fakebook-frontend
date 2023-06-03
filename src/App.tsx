import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthorizationPage from './pages/AuthorizationPage';
import TimelinePage from './pages/TimelinePage';
import { getUser, logout } from './services/auth.service';
import './App.css';

function App() {
  const [authUser, setAuthUser] = useState(undefined);

  console.log(authUser);

  useEffect(() => {
    const user = getUser();
    if (user) {
      setAuthUser(user);
    }
    // const getUser = JSON.parse(localStorage.getItem('token') || '{}');
    // const getUser: string | null = localStorage.getItem('token');
    // console.log(getUser);

    // if (getUser) {
    //   setAuthUser(getUser);
    // }
    const logOut = () => {
      logout();
    };
  }, []);

  // if (authUser) return <AuthorizationPage />;

  return (
    <>
      {authUser === undefined ? (
        <AuthorizationPage />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/timeline" element={<TimelinePage />}></Route>
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
