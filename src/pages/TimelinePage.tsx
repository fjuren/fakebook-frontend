import { useEffect, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';
import { Stack } from '@mui/material';
import Spinner from '../components/Spinner';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

import TimelinePostCard from '../components/TimlinePostCard';
import { getTimelinePosts } from '../services/post.service';
import {
  PostCommentsContextProvider,
  PostLikesContextProvider,
} from '../utils/AppContext';

export default function TimelinePage() {
  const [timelinePosts, setTimelinePosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [loadingMorePosts, setLoadingMorePosts] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTimelinePosts = async () => {
      if (loadingMorePosts || !hasMorePosts) {
        return;
      } else {
        setLoadingPage(true);
      }

      setTimeout(async () => {
        try {
          const response = await getTimelinePosts(page);
          if (response.data.length === 0) {
            setHasMorePosts(false);
            setLoadingPage(false);
          } else {
            setLoadingPage(false);
            setTimelinePosts((prevPosts) => [...prevPosts, ...response.data]);
            setPage((prevPage) => prevPage + 1);
          }
        } catch (err) {
          console.log(err);
          setLoadingPage(false);
        } finally {
          setLoadingMorePosts(false);
          setLoadingPage(false);
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

      // scrolled to the bottom of the page? and is the current spinner active?
      if (
        scrollTop + clientHeight >= scrollHeight - 10 &&
        loadingPage !== true
      ) {
        fetchTimelinePosts();
        setLoadingMorePosts(true);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // clean event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [page, loadingMorePosts, hasMorePosts, initialLoad]);

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
          {loadingPage ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '10vh',
              }}
            >
              <Spinner />
            </div>
          ) : null}
          <Stack spacing={2}>
            {timelinePosts.map((post, index) => {
              const initialPostLikes = post.likes;
              const initialComments = post.comments;
              return (
                <div key={index} className="postContainer">
                  <PostCommentsContextProvider
                    initialComments={initialComments}
                  >
                    <PostLikesContextProvider initialLikes={initialPostLikes}>
                      <TimelinePostCard post={post} postUser={post.user} />
                    </PostLikesContextProvider>
                  </PostCommentsContextProvider>
                </div>
              );
            })}
            {loadingMorePosts && hasMorePosts && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Spinner />
              </div>
            )}
            {!loadingMorePosts && !hasMorePosts && <div>No more posts. </div>}
          </Stack>
        </ThemeProvider>
      </div>
    </>
  );
}
