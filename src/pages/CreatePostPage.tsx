import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Link } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import IconButton from '@mui/material/IconButton';
import { timelinePost } from '../services/post.service';

// new way to do makeStyles - due to MUI update to V5 & React 18 compatibility
const TextFieldHideRequiredAsterisk = styled(TextField)({
  '& .MuiInputLabel-asterisk': {
    display: 'none',
  },
});

export default function CreatePostPage() {
  const [content, setContent] = useState('');
  const [contentError, setContentError] = useState(false);
  const [contentErrorText, setContentErrorText] = useState('');

  const navigate = useNavigate();

  const postHandler = async (e: any) => {
    e.preventDefault();
    // content: string;
    // image?: string;
    // likes?: Types.ObjectId[];
    // user: Types.ObjectId;
    // comments?: Types.ObjectId[];
    // postCreated: Date; // note: This is stored in an ISO 8601 format and is UTC
    if (content.length < 6) {
      setContentError(true);
      setContentErrorText('Your post is too short');
      return;
    } else {
      setContentError(false);
      setContentErrorText('');
    }

    const image = '';

    timelinePost(content, image) // need to add media
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          navigate('/timeline');
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addMedia = (e: any) => {
    e.preventDefault();
    alert('option to add photo');
  };

  return (
    <>
      <div id="createPostPage">
        <ThemeProvider theme={theme}>
          <div>
            <p>breadcrumb</p>
          </div>
          <div>
            <Box
              component="form"
              onSubmit={postHandler}
              sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="on"
            >
              <Typography variant="h5">Create a post</Typography>
              <TextFieldHideRequiredAsterisk
                id="content"
                type="text"
                label="What's on your mind?"
                variant="outlined"
                multiline
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                error={contentError}
                helperText={contentErrorText}
              />
              <div>
                <IconButton
                  color="primary"
                  aria-label="add photos"
                  onClick={(e) => addMedia(e)}
                >
                  <AddPhotoAlternateIcon />
                </IconButton>
              </div>
              <div>Add photos</div>
              <Button variant="contained" type="submit">
                Post
              </Button>
            </Box>
          </div>
        </ThemeProvider>
      </div>
    </>
  );
}
