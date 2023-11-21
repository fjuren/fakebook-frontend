import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';
import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { getAllFriendRequests } from '../services/user.service';

// ------------ ATTENTION -----------
// THIS PAGE WILL BE RENDERED BASED ON WHICH USER ID IS BEING PASSED THROUGH AND WHETHER IT MATCHES THE CURRENTLY LOGGED IN USER
// The user will come to this page if they hit their friends list from the ResponsiveAppBar primary nav bar (param = authedUser), or if they select the friends list from either their own or some other user's profile page (param = userID)
// The url path is /friends/firstName.lastName.<ID of user>. firstName.LastName in the client-facing URL is entirely for readability, not meant to be called in the API (people can have the same name as well)
// The API endpoint is /friends/?<userOrAuthUserID>. The ID is all the API needs to handle the get request
// ----------------------------------
export default function FriendsPage(authedUser: any) {
  const [friendRequests, setFriendRequests] = useState<any[]>([]);
  const [allFriends, setAllFriends] = useState<any[]>([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userOrAuthUserID = queryParams.get('userOrAuthUserID'); // Read attention note above. This is current state
  const navigate = useNavigate();

  useEffect(() => {
    if (userOrAuthUserID) {
      getAllFriendRequests(userOrAuthUserID, authedUser.authedUser._id)
        .then((response) => {
          setAllFriends(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log('Profile not found'); // TODO create error page for these types of things
    }
  }, []);
  return (
    <>
      <div id="friendsPage">
        <ThemeProvider theme={theme}>
          <div id="friendRequests-content">
            <Stack spacing={2}>
              {friendRequests.map((index) => {
                return (
                  <div key={index}>
                    {/* <TimelinePostCard post={post} postUser={post.user} /> */}
                  </div>
                );
              })}
            </Stack>
          </div>
          {/* <div id="allFriends-content">
            <Stack spacing={2}>
              {allFriends.map((post, index) => {
                return (
                  <div key={index}>
                    <TimelinePostCard post={post} postUser={post.user} />
                  </div>
                );
              })}
            </Stack>
          </div> */}
        </ThemeProvider>
      </div>
    </>
  );
}
