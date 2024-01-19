import { useState, useContext } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
// import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import { red } from '@mui/material/colors';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { Button, ButtonProps } from '@mui/material';
import CustomAvatar from './CustomAvatar';
import CommentBox from './CommentBox';
import Box from '@mui/material/Box';
import LinkButton from './LinkButton';
import MyComment from './MyComment';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

import { likePost } from '../services/post.service';
import { conditionalDateDisplay } from '../utils/helpers';
import {
  AppContext,
  PostLikesContext,
  PostCommentsContext,
} from '../utils/AppContext';
import PostModal from './PostModal';

interface ExpandMoreProps extends ButtonProps {
  expand: boolean | string; // added string here due to reactordom error in console when rendering
}

interface commentsInt {
  content: string;
  userLikes?: [];
  user: { _id: string; firstName: string; lastName: string; avatar: string };
  commentCreated: Date; // note: This is stored in an ISO 8601 format and is UTC
}

const ExpandMoreButton = styled((props: ExpandMoreProps) => {
  const { ...other } = props;
  return <Button startIcon={<ChatBubbleOutlineOutlinedIcon />} {...other} />;
})(({ theme }) => ({
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

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
export default function TimelinePostCard({ post }: any) {
  const [expanded, setExpanded] = useState(false);
  const { profilePic, user } = useContext(AppContext)!;
  const { postLikes, setPostLikes } = useContext(PostLikesContext)!;
  const { comments, setComments } = useContext(PostCommentsContext)!;
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  const existingCommentIds = new Set(
    post.comments.map((comment: any) => comment._id)
  );

  const newComments = comments.filter(
    (comment: any) => !existingCommentIds.has(comment._id)
  );

  const renderLastComment =
    post.comments.length > 0 ? [post.comments[post.comments.length - 1]] : [];
  // Check if comments context has new comments. If so, add to end of post.comments
  const commentsToRender =
    newComments.length > 0
      ? [...renderLastComment, ...newComments]
      : renderLastComment;

  const allComments = [...post.comments, ...newComments];

  // Check if post is liked by the logged in user
  const isLikedByCurrentUser = postLikes.includes(user._id);

  const navToProfile = (userID: any) => {
    navigate(`/profile/${userID}`);
  };

  // Expands/collapses comment
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleLike = () => {
    // don't need ID here. Add it to 'like' context instead and decrypt id in BE.
    if (isLikedByCurrentUser) {
      // remove the user Id from list of post likes
      const updatedLike = postLikes.filter((id: any) => id !== user._id);
      // setPostLikes(updatedLike);
      setPostLikes(updatedLike);
    } else {
      // add the user Id to list of post likes
      setPostLikes([...postLikes, user._id]);
    }

    // calling API after conditional
    likePost(post._id);
  };

  const countLikes = (postLikes: string[] | []) => {
    const countPostLikes = postLikes.length;
    return countPostLikes;
  };

  const renderLikes = countLikes(postLikes);

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
    <Card className="post">
      <CardHeader
        avatar={
          <IconButton onClick={() => navToProfile(post.user._id)} sx={{ p: 0 }}>
            <CustomAvatar
              avatarURL={profilePic ? profilePic : post.user.avatar}
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
          image={post.image}
          alt="image"
          className="postImage"
          onClick={handleModalOpen}
          style={{ cursor: 'pointer' }}
        />
      ) : null}
      <div className="likecommentContainer">
        <div className="postLikes">
          {postLikes.length == 1
            ? `${renderLikes} like`
            : `${renderLikes} likes`}
        </div>
        <div className="postComments">
          <LinkButton
            post={post}
            comments={allComments}
            handleLike={handleLike}
            handleModalOpen={handleModalOpen}
          />
        </div>
      </div>
      <PostModal
        open={modalOpen}
        onClose={handleModalClose}
        post={post}
        handleLike={handleLike}
      />
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
        <ExpandMoreButton
          color="primary"
          expand={expanded.toString()} // added string here due to reactordom error in console when rendering
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <p>Comment</p>
        </ExpandMoreButton>
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
                    userFirstnameLetter={commentData.user.firstName}
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
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <ContentContainer>
          <AvatarContainer>
            <IconButton onClick={() => navToProfile(user._id)} sx={{ p: 0 }}>
              <CustomAvatar
                // TODO this still uses the incorrect data
                avatarURL={user.avatar}
                userFirstnameLetter={user.firstName.substring(0, 1)}
              />
            </IconButton>
          </AvatarContainer>
          <CommentContainer className="commentContainer">
            <CommentBox
              postID={post._id}
              postCommentHandler={postCommentHandler}
            />
          </CommentContainer>
        </ContentContainer>
      </Collapse>
    </Card>
  );
}
