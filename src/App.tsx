import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthorizationPage from './pages/AuthorizationPage';
import TimelinePage from './pages/TimelinePage';
import CreatePostPage from './pages/CreatePostPage';
import { getUser, logout } from './services/auth.service';
import './App.css';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import ProfilePage from './pages/ProfilePage';

function App() {
  // getUser checks localStorage
  const [authUser, setAuthUser] = useState(getUser());
  const handleLogout = () => {
    setAuthUser(null);
  };

  return (
    <>
      <BrowserRouter>
        {authUser ? (
          <ResponsiveAppBar
            userAvatar={authUser.user.avatar}
            userFirstnameLetter={authUser.user.firstName.substring(0, 1)}
            handleLogout={handleLogout}
          />
        ) : null}
        <Routes>
          <Route
            path="/"
            element={
              !authUser ? <AuthorizationPage /> : <Navigate to="/timeline" />
            }
          ></Route>
          <Route
            path="/timeline"
            element={authUser ? <TimelinePage user={authUser} /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/create-post"
            element={authUser ? <CreatePostPage /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/profile"
            element={authUser ? <ProfilePage /> : <Navigate to="/" />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
