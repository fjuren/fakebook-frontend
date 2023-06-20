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
    console.log(user);

    if (user) {
      setAuthUser(user);
    }

    console.log(authUser);

    const logOut = () => {
      logout();
    };
  }, []);

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
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthorizationPage />}></Route>
          <Route path="/timeline" element={<TimelinePage />}></Route>
        </Routes>
      </BrowserRouter> */}
    </>
  );
}

export default App;
