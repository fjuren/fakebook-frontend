import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';
import TimelinePostCard from '../components/TimlinePostCard';
import { Stack } from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

import { getTimeline } from '../services/post.service';

// const Timeline: React.FC = () => {
//   const timeline = getTimeline();
// }

export default function TimelinePage({ user }: any) {
  const [timelineContent, setTimelineContent] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getTimeline()
      .then((response) => {
        setTimelineContent(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div id="timelinePage">
        <ThemeProvider theme={theme}>
          <div>
            <Fab
              color="primary"
              sx={{
                backgroundColor: theme.palette.primary.main,
                position: 'fixed',
                bottom: 15,
                right: 0,
                zIndex: 2000,
              }}
              variant="extended"
              aria-label="add"
              onClick={() => {
                navigate('/create-post');
              }}
            >
              <AddIcon sx={{ mr: 1 }} />
              Create post
            </Fab>
          </div>
          <div id="timeline-content">
            <Stack spacing={2}>
              {timelineContent.map((post, index) => {
                return (
                  <div key={index}>
                    <TimelinePostCard post={post} user={user} />
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
