import * as React from 'react';
import { ThemeProvider } from '@mui/material';
import theme from '../theme';
import Box from '@mui/material/Box';
import { Grid, ListItem, List, ListItemText } from '@mui/material';
import CustomAvatar from './CustomAvatar';
import Typography from '@mui/material/Typography';

export default function MyComment({
  commentUserName,
  commentContent,
  commentDate,
}: {
  commentUserName: string;
  commentContent: string;
  commentDate: string;
}) {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Grid
          container
          style={{
            backgroundColor: theme.palette.secondary.main,
            borderRadius: 6,
            padding: '6px',
          }}
        >
          <Grid item xs={12}>
            <ListItemText
              disableTypography // removes mui default css
              style={{
                fontWeight: 'bold',
                margin: 0,
                fontFamily: 'Helvetica',
                fontSize: '.8rem',
                lineHeight: 1.43,
                color: 'rgba(0, 0, 0, 0.6)',
                display: 'inline-block',
              }}
              secondary={commentUserName}
            />
          </Grid>
          <Grid item xs={12}>
            <ListItemText
              disableTypography
              primary={commentContent}
              style={{
                fontWeight: '400',
                margin: 0,
                fontFamily: 'Helvetica',
                fontSize: '1rem',
                lineHeight: 1.43,
                color: 'rgba(0, 0, 0, 0.6)',
                display: 'inline-block',
              }}
            />
          </Grid>
        </Grid>
        <Typography style={{ fontSize: '.7rem', textAlign: 'start' }}>
          {commentDate}
        </Typography>
      </Box>
    </ThemeProvider>
  );
}

{
  /* <TextField
  inputProps={{
    readOnly: true,
  }}
  sx={{
    height: 'auto',
    '& .MuiChip-label': {
      display: 'block',
      whiteSpace: 'normal',
      fontWeight: 'bold',
      // background: 'rgb(0, 132, 255)',
    },
  }}
  label={commentObj}
/> */
}
