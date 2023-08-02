import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { IconButton, InputAdornment } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function CommentBox() {
  return (
    <Box
      component="form"
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
          InputProps={{
            endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="send" edge="end" sx={{position: 'absolute', bottom: 0, right: 10}}>
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ), sx: { borderRadius: 3 }, disableUnderline: true}}
        />
    </Box>
  );
}