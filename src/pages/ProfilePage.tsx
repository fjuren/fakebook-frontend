import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';
import { Stack } from '@mui/material';
import GroupAvatars from '../components/GroupAvatars';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import CustomAvatar from '../components/CustomAvatar';
import IconButton from '@mui/material/IconButton';
import '../App.css';

import { getUserProfile, postFriendRequest } from '../services/user.service';
import { getUserProfilePosts } from '../services/post.service';
import { unFriend } from '../services/user.service';
import TimelinePostCard from '../components/TimlinePostCard';
import ProfilePicButton from '../components/ProfilePicButton';
import {
  AppContext,
  PostLikesContextProvider,
  PostCommentsContextProvider,
} from '../utils/AppContext';

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
  const navigate = useNavigate();

  const navToProfile = (userID: any) => {
    navigate(`/profile/${userID}`);
  };

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

  return (
    <>
      <div id="profilePage">
        <ThemeProvider theme={theme}>
          <div className="profilePageBanner">
            <div className="profileBannerContent">
              <div className="profilePicAvatarName">
                <CustomAvatar
                  avatarURL={profilePic ? profilePic : profileContent?.avatar}
                  userFirstnameLetter={profileContent?.firstName.substring(
                    0,
                    1
                  )}
                  sx={{ fontSize: 84, width: 168, height: 168 }}
                ></CustomAvatar>
                <ProfilePicButton
                  avatar={profileContent.avatar}
                  firstName={profileContent.firstName}
                />
              </div>
              <Typography
                className="profileName"
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

              <div className="profileFriends">
                <Typography
                  sx={{
                    color: theme.typography.body2,
                    lineHeight: 1.1875,
                    fontSize: '1rem',
                    fontWeight: 'bold',
                  }}
                >
                  Friends:
                </Typography>
                {profileContent?.friends.length >= 2 ? (
                  <div>
                    <GroupAvatars
                      userFriends={profileContent?.friends}
                      maxNum={profileContent?.friends.length}
                    />
                  </div>
                ) : profileContent?.friends.length === 1 ? (
                  <IconButton
                    onClick={() => navToProfile(profileContent.friends[0]._id)}
                    sx={{ p: 0 }}
                  >
                    <CustomAvatar
                      avatarURL={profileContent.friends[0].avatar}
                      userFirstnameLetter={profileContent.friends[0].firstName}
                    />
                  </IconButton>
                ) : (
                  <div>
                    You haven't added any friends yet! Send friend requests to
                    add new friends.
                  </div>
                )}
              </div>

              <div className="friendRequestBtns">
                {user._id !== userID ? (
                  <div>
                    {(profileContent.friendRequest &&
                      profileContent.friendRequest.includes(user._id)) ||
                    (friendRequest && friendRequest.includes(user._id)) ? (
                      <Button variant="contained" disabled>
                        Friend request sent
                      </Button>
                    ) : profileContent.friends.some(
                        (friend) => friend._id === user._id
                      ) ? (
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
            </div>
          </div>

          <div className="profilePosts">
            <div>
              <Typography
                sx={{
                  color: theme.typography.body2,
                  lineHeight: 1.1875,
                  fontSize: '2rem',
                  fontWeight: 'bold',
                }}
              >
                Posts
              </Typography>
              <br />
              {userPosts?.length !== 0 ? (
                <Stack spacing={2}>
                  {userPosts?.map((post: any, index: number) => {
                    const initialPostLikes = post.likes;
                    const initialComments = post.comments;
                    return (
                      <div key={index}>
                        <PostCommentsContextProvider
                          initialComments={initialComments}
                        >
                          <PostLikesContextProvider
                            initialLikes={initialPostLikes}
                          >
                            <TimelinePostCard post={post} user={post.user} />
                          </PostLikesContextProvider>
                        </PostCommentsContextProvider>
                      </div>
                    );
                  })}
                </Stack>
              ) : (
                <div>There are no posts yet</div>
              )}
            </div>
          </div>
        </ThemeProvider>
      </div>
    </>
  );
}
