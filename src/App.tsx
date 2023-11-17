import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import AuthorizationPage from './pages/AuthorizationPage';
import TimelinePage from './pages/TimelinePage';
import CreatePostPage from './pages/CreatePostPage';
import { getUser, logout } from './services/auth.service';
import './App.css';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import ProfilePage from './pages/ProfilePage';
import { TimelinePostCardProvider } from './utils/TimelinePostCardContext';

function App() {
  // getUser checks localStorage
  const [authUser, setAuthUser] = useState(getUser());
  const handleLogout = () => {
    setAuthUser(null);
  };
  // console.log(authUser);

  // minimalUserData only available if user is authenticated/logged in
  const minimalUserData = authUser
    ? {
        avatar: authUser.user.avatar,
        firstName: authUser.user.firstName,
        lastName: authUser.user.lastName,
        _id: authUser.user._id,
      }
    : null;

  return (
    <TimelinePostCardProvider minimalUserData={minimalUserData}>
      <>
        <Router>
          {authUser ? (
            <ResponsiveAppBar
              userID={authUser.user._id}
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
              path="/profile/:userID"
              element={authUser ? <ProfilePage /> : <Navigate to="/" />}
            ></Route>
          </Routes>
        </Router>
      </>
    </TimelinePostCardProvider>
  );
}

export default App;
