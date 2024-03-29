import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import AuthorizationPage from './pages/AuthorizationPage';
import TimelinePage from './pages/TimelinePage';
import FriendsPage from './pages/FriendsPage';
import CreatePostPage from './pages/CreatePostPage';
import { getUser } from './services/auth.service';
import './App.css';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import ProfilePage from './pages/ProfilePage';

import { AppContextProvider } from './utils/AppContext';

function App() {
  const [authUser, setAuthUser] = useState(() => {
    return getUser();
  });
  const handleLogout = () => {
    setAuthUser(null);
  };

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
    <AppContextProvider minimalUserData={minimalUserData}>
      <>
        <Router>
          <div className="navbar">
            {authUser ? (
              <ResponsiveAppBar
                userID={authUser.user._id}
                userAvatar={authUser.user.avatar}
                userFirstnameLetter={authUser.user.firstName}
                userName={
                  authUser.user.firstName + '.' + authUser.user.lastName
                }
                handleLogout={handleLogout}
              />
            ) : null}
          </div>

          <div id="pages">
            <Routes>
              <Route
                path="/"
                element={
                  !authUser ? (
                    <AuthorizationPage />
                  ) : (
                    <Navigate to="/timeline" />
                  )
                }
              ></Route>
              <Route
                path="/timeline"
                element={authUser ? <TimelinePage /> : <Navigate to="/" />}
              ></Route>
              <Route
                // the "userOrAuthUserID" id here could be the user of the authed individual, or it could be the user of someone else. It's based on which userID is being requested, and further checks and API calls in FriendsPage will be based on whether the requesting user is an authed user trying to access their own content, or if it is an authed user tyring to access someone else's content
                path="/friends/:userName"
                // path="/friends/:userName"
                element={
                  authUser ? (
                    <FriendsPage authedUser={minimalUserData} />
                  ) : (
                    <Navigate to="/" />
                  )
                }
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
          </div>
        </Router>
      </>
    </AppContextProvider>
  );
}

export default App;
