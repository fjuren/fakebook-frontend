import React from 'react';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';

import { getTimeline } from '../services/post.service';

// const Timeline: React.FC = () => {
//   const timeline = getTimeline();
// }

export default function TimelinePage() {
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
        </ThemeProvider>
      </div>
    </>
  );
}
