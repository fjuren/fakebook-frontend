import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../services/user.service';
import ProfilePostCard from '../components/ProfilePostCard';
import { Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Typography from '@mui/material/Typography';
import CustomAvatar from '../components/CustomAvatar';

interface UserProfile {
  firstName: string;
  lastName: string;
  friends: any[];
  friendRequest: any[];
  userRequests: any[];
  posts: any[];
  avatar: string;
}

const initialUserProfile: UserProfile = {
  firstName: '',
  lastName: '',
  friends: [],
  friendRequest: [],
  userRequests: [],
  posts: [],
  avatar: '',
};

export default function ProfilePage() {
  const [profileContent, setProfileContent] = useState<UserProfile>(initialUserProfile);
  const navigate = useNavigate();

  useEffect(() => {
    getUserProfile()
      .then((response) => {
        setProfileContent(response.data);
        console.log(response.data);
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
          <CustomAvatar avatarURL={profileContent?.avatar} userFirstnameLetter={profileContent?.firstName.substring(0, 1)} sx={{ fontSize: 84, width: 168, height: 168 }}></CustomAvatar>

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
              {profileContent?.posts.map((post, index) => {
                return (
                  <div key={index}>
                    <ProfilePostCard post={post} user={profileContent} />
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
