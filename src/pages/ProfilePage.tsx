import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import { getUserProfile } from '../services/user.service';
import TimelinePostCard from '../components/TimelinePostCard';

interface UserProfile {
  firstName: string;
  lastName: string;
  friendRequest: any[];
  userRequests: any[];
  posts: any[];
  avatar: string;
}

export default function ProfilePage() {
  const [profileContent, setProfileContent] = useState<UserProfile | null>(
    null
  );
  const { user } = useParams();
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
            <Stack spacing={2}>
              <div>{profileContent?.firstName}</div>
              <div>{profileContent?.lastName}</div>
              <div>{profileContent?.friendRequest}</div>
              <div>{profileContent?.userRequests}</div>
              <div>{profileContent?.posts}</div>
              <div>{profileContent?.avatar}</div>
            </Stack>
          </div>
        </ThemeProvider>
      </div>
    </>
  );
}
