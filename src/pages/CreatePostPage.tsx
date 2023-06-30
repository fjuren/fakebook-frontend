import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';

export default function CreatePostPage() {
  return (
    <>
      <div id="createPostPage">
        <ThemeProvider theme={theme}>
          <div>
            <p>breadcrumb</p>
          </div>
          <div></div>
        </ThemeProvider>
      </div>
    </>
  );
}
