import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthorizationPage from './pages/AuthorizationPage';
import TimelinePage from './pages/TimelinePage';
import CreatePostPage from './pages/CreatePostPage';
import { getUser, logout } from './services/auth.service';
import './App.css';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import ProfilePage from './pages/ProfilePage';
import { CommentProvider } from './utils/CommentContext';

function App() {
  // getUser checks localStorage
  const [authUser, setAuthUser] = useState(getUser());
  const handleLogout = () => {
    setAuthUser(null);
  };
  // console.log(authUser);

  const minimalUserData = {
    avatar: authUser.user.avatar,
    firstName: authUser.user.firstName,
    lastName: authUser.user.lastName,
  };

  return (
    <CommentProvider minimalUserData={minimalUserData}>
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
              element={authUser ? <TimelinePage /> : <Navigate to="/" />}
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
    </CommentProvider>
  );
}

export default App;
