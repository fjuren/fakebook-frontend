import { useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { timelinePost } from '../services/post.service';
import Breadcrumb from '../components/Breadcrumb';
import Spinner from '../components/Spinner';

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
  const [loadingPage, setLoadingPage] = useState(false);

  const [file, setFile] = useState<any>(null);
  const [fileType, setFileType] = useState<any>(null);
  const navigate = useNavigate();

  const postHandler = async (e: any) => {
    e.preventDefault();
    // content: string;
    // image?: string;
    // likes?: Types.ObjectId[];
    // user: Types.ObjectId;
    // comments?: Types.ObjectId[];
    // postCreated: Date; // note: This is stored in an ISO 8601 format and is UTC
    setLoadingPage(true);
    if (content.length < 6) {
      setContentError(true);
      setContentErrorText('Your post is too short');
      setLoadingPage(false);
      return;
    } else {
      setContentError(false);
      setContentErrorText('');
    }

    const postData: FormData = new FormData();
    postData.append('content', content); // string from post
    postData.append('file', file); // file as image/video/GIF
    postData.set('type', fileType);

    try {
      const response = await timelinePost(postData);

      if (response.status === 200) {
        navigate('/timeline');
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingPage(false);
    }
  };

  const addMedia = (e: any) => {
    const file = e.target.files[0];
    const fileType = file.type;
    setFile(file);
    setFileType(fileType);
  };

  return (
    <>
      <div id="createPostPage">
        <ThemeProvider theme={theme}>
          <div>
            <Breadcrumb
              parentRoute="/timeline"
              parentPage="Timeline"
              currentPage="Create Post"
            />
          </div>
          <div
            style={{
              marginTop: '3rem',
              paddingTop: '3rem',
              paddingBottom: '5rem',
            }}
          >
            <Box
              component="form"
              onSubmit={postHandler}
              sx={{
                '& > :not(style)': { m: 1, width: '20rem' },
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
                rows={8}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                error={contentError}
                helperText={contentErrorText}
              />
              <div>
                <input
                  id="add-media"
                  type="file"
                  accept="image/*, video/*, .gif"
                  onChange={addMedia}
                  style={{ display: 'none' }}
                />
                <label htmlFor="add-media">
                  <Button component="span" size="medium">
                    <AddPhotoAlternateIcon />
                    <p>Add photo</p>
                  </Button>
                </label>
              </div>
              <div>
                {file ? (
                  <Typography style={{ color: 'green' }}>
                    {file.name} added!
                  </Typography>
                ) : null}
              </div>
              <Button variant="contained" type="submit">
                Post
              </Button>
              {loadingPage ? (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Spinner />
                </div>
              ) : null}
            </Box>
          </div>
        </ThemeProvider>
      </div>
    </>
  );
}
