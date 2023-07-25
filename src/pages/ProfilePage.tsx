import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';

export default function ProfilePage() {
  const [profileContent, setProfileContent] = useState<any[]>([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   getUser()
  //     .then((response) => {
  //       setProfileContent(response.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  return (
    <>
      <div id="profilePage">
        <ThemeProvider theme={theme}>
          <div id="profile-content">
            <Stack spacing={2}>
              {profileContent.map((post, index) => {
                return <div key={index}>{/* <PostCard post={post} /> */}</div>;
              })}
            </Stack>
          </div>
        </ThemeProvider>
      </div>
    </>
  );
}
