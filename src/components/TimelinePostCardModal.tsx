import { useState, useEffect, useContext } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
// import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import { red } from '@mui/material/colors';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import { Button, ButtonProps } from '@mui/material';
import CustomAvatar from './CustomAvatar';
import CommentBox from './CommentBox';
import Box from '@mui/material/Box';
import MyComment from './MyComment';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

import { conditionalDateDisplay } from '../utils/helpers';
import { AppContext } from '../utils/AppContext';
import { PostLikesContext } from '../utils/AppContext';

interface ExpandMoreProps extends ButtonProps {
  expand: boolean | string; // added string here due to reactordom error in console when rendering
}

interface commentsInt {
  content: string;
  userLikes?: [];
  user: { _id: string; firstName: string; lastName: string; avatar: string };
  commentCreated: Date; // note: This is stored in an ISO 8601 format and is UTC
}

const ContentContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  paddingLeft: '8px',
});

const AvatarContainer = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  marginRight: '8px',
  // paddingTop: '8px',
});

const CommentContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  paddingBottom: '8px',
});

interface CommentBoxData {
  commentCreated: string;
  commentLikes: any[];
  content: string;
  user: string;
}

// TODO: build interface after updating timeline API data
// interface Post {
//   post: {
//     title: string;
//   };
// }
export default function TimelinePostCardModal({ post, handleLike }: any) {
  const [expanded, setExpanded] = useState(false);
  const { comments, setComments, user } = useContext(AppContext);
  const { postLikes } = useContext(PostLikesContext);
  const navigate = useNavigate();

  const navToProfile = (userID: any) => {
    navigate(`/profile/${userID}`);
  };

  // Check if comments context has new comments. If so, add to end of post.comments
  const commentsToRender =
    comments.length > 0 ? [...post.comments, ...comments] : post.comments;
  // Check if post is liked by the logged in user
  const isLikedByCurrentUser = postLikes.includes(user._id);

  const countLikes = (postLikes: string[] | []) => {
    const countPostLikes = postLikes.length;
    return countPostLikes;
  };

  // Triggered by the commentBox component
  const postCommentHandler = async (newCommentData: CommentBoxData) => {
    addCommentToContext(newCommentData);
  };

  const addCommentToContext = (newCommentData: CommentBoxData) => {
    // need to insert the user info via react context to the data created and returned from my api
    const commentData = {
      // Returned API data
      commentCreated: newCommentData.commentCreated,
      commentLikes: newCommentData.commentLikes,
      content: newCommentData.content,
      user: {
        // user data from context for quick render of comment
        avatar: user.avatar,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
    setComments([...comments, commentData]);
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        avatar={
          <IconButton onClick={() => navToProfile(post.user._id)} sx={{ p: 0 }}>
            <CustomAvatar
              avatarURL={post.user.avatar}
              userFirstnameLetter={post.user.firstName.substring(0, 1)}
            ></CustomAvatar>
          </IconButton>
        }
        // action=headerClick}
        title={post.user.firstName + ' ' + post.user.lastName}
        subheader={conditionalDateDisplay(post.postCreated)}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.content}
        </Typography>
      </CardContent>
      {post.image !== '' ? (
        <CardMedia
          component="img"
          height="194"
          image={post.image}
          alt="image"
        />
      ) : null}
      {countLikes(postLikes)}
      <br></br>
      {post.comments.length} Comments
      <CardActions disableSpacing>
        <Button
          size="medium"
          startIcon={
            isLikedByCurrentUser ? <ThumbUpIcon /> : <ThumbUpAltOutlinedIcon />
          }
          onClick={handleLike}
        >
          <p>Like</p>
        </Button>
      </CardActions>
      <Stack spacing={1}>
        {commentsToRender.map((commentData: commentsInt, index: number) => {
          return (
            <ContentContainer key={index}>
              <AvatarContainer>
                <IconButton
                  onClick={() => navToProfile(commentData.user._id)}
                  sx={{ p: 0 }}
                >
                  <CustomAvatar
                    avatarURL={commentData.user.avatar}
                    userFirstnameLetter={commentData.user.firstName.substring(
                      0,
                      1
                    )}
                  />
                </IconButton>
              </AvatarContainer>
              <CommentContainer>
                <MyComment
                  commentUserName={
                    commentData.user.firstName + ' ' + commentData.user.lastName
                  }
                  commentContent={commentData.content}
                  commentDate={conditionalDateDisplay(
                    commentData.commentCreated
                  )}
                />
              </CommentContainer>
            </ContentContainer>
          );
        })}
      </Stack>
      <ContentContainer>
        <AvatarContainer>
          <IconButton onClick={() => navToProfile(user._id)} sx={{ p: 0 }}>
            <CustomAvatar
              avatarURL={user.avatar}
              userFirstnameLetter={user.firstName.substring(0, 1)}
            />
          </IconButton>
        </AvatarContainer>
        <CommentContainer>
          <CommentBox
            postID={post._id}
            postCommentHandler={postCommentHandler}
          />
        </CommentContainer>
      </ContentContainer>
    </Card>
  );
}
