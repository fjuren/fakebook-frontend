import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';
import TimelinePostCard from '../components/TimelinePostCard';
import { Stack } from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

import { getTimeline } from '../services/post.service';

// const Timeline: React.FC = () => {
//   const timeline = getTimeline();
// }

export default function TimelinePage() {
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
          {/* <h1
            style={{
              color: '#1877F2',
              fontFamily: 'sans-serif',
              letterSpacing: '-3px',
            }}
          >
            Timeline
          </h1> */}
          <div>
            <Fab
              color="primary"
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
                    <TimelinePostCard post={post} />
                    {/* <h4>{post.content}</h4> */}
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
