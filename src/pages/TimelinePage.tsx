import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';
import TimelineCard from '../components/TimelinePostCard';
import { Stack } from '@mui/material';

import { getTimeline } from '../services/post.service';

// const Timeline: React.FC = () => {
//   const timeline = getTimeline();
// }

export default function TimelinePage() {
  const [timelineContent, setTimelineContent] = useState<any[]>([]);

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
          <h1
            style={{
              color: '#1877F2',
              fontFamily: 'sans-serif',
              letterSpacing: '-3px',
            }}
          >
            Timeline
          </h1>
          <div id="timeline-content">
            {/* <TimelineCard /> */}
            <Stack spacing={2}>
              {timelineContent.map((post, index) => {
                console.log(post);
                return (
                  <div key={index}>
                    <h4>{post.content}</h4>
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
