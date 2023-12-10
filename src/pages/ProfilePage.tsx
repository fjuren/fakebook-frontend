import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';
import { Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import CustomAvatar from '../components/CustomAvatar';

import { getUserProfile, postFriendRequest } from '../services/user.service';
import { getUserProfilePosts } from '../services/post.service';
import { unFriend } from '../services/user.service';
import TimelinePostCard from '../components/TimlinePostCard';
import ProfilePicButton from '../components/ProfilePicButton';
import { AppContext, PostLikesContextProvider } from '../utils/AppContext';

interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  friends: any[];
  friendRequest: any[];
  userRequests: any[];
  avatar: string;
}

const initialUserProfile: UserProfile = {
  _id: '',
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
  const [authUserContent, setAuthUserContent] = useState<UserProfile>({
    ...initialUserProfile,
  });
  // user is the signed in user and captured as context
  const {
    user,
    friendRequest,
    setFriendRequest,
    unfriend,
    setUnfriend,
    profilePic,
  } = useContext(AppContext);
  // userID is the user of the visited profile page
  const { userID } = useParams();

  const addFriend = (profileUserID: string, authedUserID: string) => {
    setFriendRequest((prevFriendRequst: string[]) => [
      ...prevFriendRequst,
      authedUserID,
    ]);
    postFriendRequest(profileUserID, authedUserID);
  };

  const handleDelete = (profileUserID: string, authedUserID: string) => {
    // authedUserID = current user logged in and accepting the friend request
    // profileUserID = user who submitted the friend request
    unFriend(true, authedUserID, profileUserID);
    setUnfriend((prevRequest: string[]) => [...prevRequest, authedUserID]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userID) {
          const profileResponse = await getUserProfile(userID);
          setProfileContent(profileResponse.data);

          const postsResponse = await getUserProfilePosts(userID);
          setUserPosts(postsResponse.data.userProfilePosts.posts);
        }
        if (user._id) {
          const authUserResponse = await getUserProfile(user._id);
          setAuthUserContent(authUserResponse.data);
        } else {
          console.log('Profile not found'); // TODO: create an error page for these types of things
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [userID]);

  console.log('profileContent', profileContent);
  console.log('authuserContent', authUserContent);
  return (
    <>
      <div id="profilePage">
        <ThemeProvider theme={theme}>
          <div id="profile-content">
            <div className="profile-pic">
              <CustomAvatar
                avatarURL={profilePic ? profilePic : profileContent?.avatar}
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
                avatar group:
                <AvatarGroup total={profileContent?.friends.length}>
                  {profileContent?.friends.map((friend, index) => (
                    <div key={index}>
                      <Avatar alt={friend.firstName} src={friend.avatar} />
                    </div>
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
                  ) : authUserContent.friends.includes(profileContent._id) ? (
                    unfriend && unfriend.includes(user._id) ? (
                      <Button variant="outlined" disabled>
                        Unfriended
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        onClick={() =>
                          handleDelete(userID as string, user._id as string)
                        }
                      >
                        Unfriend
                      </Button>
                    )
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
                </div>
              ) : null}
            </div>
            <div className="posts">
              <Typography
                sx={{
                  color: theme.typography.body2,
                  lineHeight: 1.1875,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                }}
              >
                {profileContent.firstName}'s Posts:
              </Typography>
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
          </div>
        </ThemeProvider>
      </div>
    </>
  );
}
