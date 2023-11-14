import { useState } from 'react';
import theme from '../theme';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { IconButton, InputAdornment, ThemeProvider } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import { postComment } from '../services/comment.service';

export default function CommentBox({ postID, postCommentHandler }: any) {
  const [commentText, setCommentText] = useState('');
  const [commentTextError, setCommentTextError] = useState(false);
  const [commentTextErrorText, setCommentTextErrorText] = useState('');

  const commentHandler = async (e: any) => {
    e.preventDefault();

    if (commentText.length < 1) {
      setCommentTextError(true);
      setCommentTextErrorText('Please type a comment');
      return;
    } else {
      setCommentTextError(false);
      setCommentTextErrorText('');
    }

    // post comment to api
    postComment(commentText, postID).then((response) => {
      const newCommentData = response.data.newComment;
      postCommentHandler(newCommentData);
      setCommentText('');
    });
  };

  // Allows user to click enter for their comment if they prefer
  const handleTextFieldEnterPress = (e: any) => {
    if (e.key === 'Enter') {
      commentHandler(e);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="form"
        onSubmit={commentHandler}
        sx={{
          '& .MuiTextField-root': { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="filled-multiline-flexible"
          label="Write a comment..."
          multiline
          maxRows={30}
          variant="filled"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          error={commentTextError}
          helperText={commentTextErrorText}
          onKeyPress={handleTextFieldEnterPress}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="send"
                  edge="end"
                  sx={{ position: 'absolute', bottom: 0, right: 10 }}
                  type="submit"
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
            sx: {
              borderRadius: 3,
              backgroundColor: theme.palette.secondary.main,
            },
            disableUnderline: true,
          }}
        />
      </Box>
    </ThemeProvider>
  );
}
