import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../services/user.service';
import PostCard from '../components/PostCard';
import { Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Typography from '@mui/material/Typography';

interface UserProfile {
  firstName: string;
  lastName: string;
  friends: any[];
  friendRequest: any[];
  userRequests: any[];
  posts: any[];
  avatar: string;
}

export default function ProfilePage() {
  const [profileContent, setProfileContent] = useState<UserProfile | null>(
    null
  );
  const [postContent, setPostContent] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUserProfile()
      .then((response) => {
        setProfileContent(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div id="profilePage">
        <ThemeProvider theme={theme}>
          <div id="profile-content">
            <Avatar
              alt={profileContent?.firstName}
              src={profileContent?.avatar}
              sx={{ width: 168, height: 168 }}
            />
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
            <Stack spacing={2}>
              <div>{profileContent?.friendRequest}</div>
              <div>{profileContent?.userRequests}</div>
            </Stack>
            <Stack spacing={2}>
              {profileContent?.posts.map((post, index) => {
                return (
                  <div key={index}>
                    <PostCard post={post} />
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
