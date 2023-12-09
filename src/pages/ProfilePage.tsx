import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';
import { Stack, IconButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import CustomAvatar from '../components/CustomAvatar';

import { getUserProfile, postFriendRequest } from '../services/user.service';
import { getUserProfilePosts } from '../services/post.service';
import TimelinePostCard from '../components/TimlinePostCard';
import ProfilePicButton from '../components/ProfilePicButton';
import { AppContext, PostLikesContextProvider } from '../utils/AppContext';

interface UserProfile {
  firstName: string;
  lastName: string;
  friends: any[];
  friendRequest: any[];
  userRequests: any[];
  avatar: string;
}

const initialUserProfile: UserProfile = {
  firstName: '',
  lastName: '',
  friends: [],
  friendRequest: [],
  userRequests: [],
  avatar: '',
};

interface UserProfilePosts {
  comments: any[];
  content: string;
  image: string;
  likes: any[];
  user: {
    avatar: string;
    firstName: string;
    lastName: string;
  };
}

export default function ProfilePage() {
  const [profileContent, setProfileContent] = useState<UserProfile>({
    ...initialUserProfile,
    friendRequest: [],
  });
  const [userPosts, setUserPosts] = useState<UserProfilePosts[]>([]);
  // user is the signed in user and captured as context
  const { user, friendRequest, setFriendRequest } = useContext(AppContext);
  // userID is the user of the visited profile page
  const { userID } = useParams();

  const addFriend = (profileUserID: string, authedUserID: string) => {
    setFriendRequest((prevFriendRequst: string[]) => [
      ...prevFriendRequst,
      authedUserID,
    ]);
    postFriendRequest(profileUserID, authedUserID);
  };

  useEffect(() => {
    if (userID) {
      getUserProfile(userID)
        .then((response) => {
          setProfileContent(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
      getUserProfilePosts(userID)
        .then((response) => {
          setUserPosts(response.data.userProfilePosts.posts);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log('Profile not found'); // TODO create error page for these types of things
    }
  }, [userID]);

  return (
    <>
      <div id="profilePage">
        <ThemeProvider theme={theme}>
          <div id="profile-content">
            <div className="profile-pic">
              <CustomAvatar
                avatarURL={profileContent?.avatar}
                userFirstnameLetter={profileContent?.firstName.substring(0, 1)}
                sx={{ fontSize: 84, width: 168, height: 168 }}
              ></CustomAvatar>
              <ProfilePicButton
                avatar={profileContent.avatar}
                firstName={profileContent.firstName}
              />
            </div>

            <Typography
              sx={{
                color: theme.typography.body2,
                lineHeight: 1.1875,
                fontSize: '2rem',
                fontWeight: 'bold',
              }}
            >
              {profileContent?.firstName}
              {} {/* space */}
              {profileContent?.lastName}
            </Typography>
            {profileContent?.friends.length !== 0 ? (
              <div>
                <AvatarGroup total={profileContent?.friends.length}>
                  {profileContent?.friends.map((friend) => (
                    <Avatar alt={friend.firstName} src={friend.avatar} />
                  ))}
                </AvatarGroup>
              </div>
            ) : (
              <div>
                You haven't added any friends yet! Send friend requests to add
                new friends.
              </div>
            )}
            <div className="friendRequestBtns">
              {user._id !== userID ? (
                <div>
                  {(profileContent.friendRequest &&
                    profileContent.friendRequest.includes(user._id)) ||
                  (friendRequest && friendRequest.includes(user._id)) ? (
                    <Button variant="contained" disabled>
                      Friend request sent
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() =>
                        addFriend(userID as string, user._id as string)
                      }
                    >
                      Add friend
                    </Button>
                  )}
                  {profileContent.friends.includes(user._id) ? (
                    <Button variant="outlined">Unfriend</Button>
                  ) : null}
                </div>
              ) : null}
            </div>
            <Stack spacing={2}>
              {userPosts?.map((post: any, index: number) => {
                const initialPostLikes = post.likes;
                return (
                  <div key={index}>
                    <PostLikesContextProvider initialLikes={initialPostLikes}>
                      <TimelinePostCard post={post} user={post.user} />
                    </PostLikesContextProvider>
                  </div>
                );
              })}
            </Stack>
          </div>
        </ThemeProvider>
      </div>
    </>
  );
}
