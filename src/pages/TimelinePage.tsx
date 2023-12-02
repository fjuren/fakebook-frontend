import { useEffect, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';
import TimelinePostCard from '../components/TimlinePostCard';
import { CircularProgress, Stack } from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

import { getTimelinePosts } from '../services/post.service';

export default function TimelinePage() {
  const [timelinePosts, setTimelinePosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchTimelinePosts = async () => {
      if (loading || !hasMorePosts) return;

      setTimeout(async () => {
        try {
          const response = await getTimelinePosts(page);
          if (response.data.length === 0) {
            setHasMorePosts(false);
          } else {
            setTimelinePosts((prevPosts) => [...prevPosts, ...response.data]);
            setPage((prevPage) => prevPage + 1);
          }
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      }, 500);
    };

    if (initialLoad) {
      setInitialLoad(false);
      fetchTimelinePosts();
    }

    // scroll event listener
    const handleScroll = () => {
      const { scrollHeight, scrollTop, clientHeight } =
        document.documentElement;

      // scrolled to the bottom of the page?
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        fetchTimelinePosts();
        setLoading(true);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // clean event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [page, loading, hasMorePosts, initialLoad]);

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
              {timelinePosts.map((post, index) => {
                return (
                  <div key={index}>
                    <TimelinePostCard post={post} postUser={post.user} />
                  </div>
                );
              })}
              {loading && hasMorePosts && (
                <div style={{ textAlign: 'center' }}>
                  <CircularProgress />
                </div>
              )}
              {!loading && !hasMorePosts && <div>No more posts. </div>}
            </Stack>
          </div>
        </ThemeProvider>
      </div>
    </>
  );
}
