import '../assets/styles/FriendRequest.css';
import { useContext } from 'react';
import GroupAvatars from './GroupAvatars';
import { IconButton } from '@mui/material';
import CustomAvatar from './CustomAvatar';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { postFriendRequestAnswer } from '../services/user.service';
import { AppContext } from '../utils/AppContext';

export default function FriendRequests(userData: any) {
  const {
    user,
    acceptFriendRequest,
    setAcceptFriendRequest,
    declineFriendRequest,
    setDeclineFriendRequest,
  } = useContext(AppContext);
  const navigate = useNavigate();

  const navToProfile = (userID: string) => {
    navigate(`/profile/${userID}`);
  };

  const handleConfirm = () => {
    // user._id = current user logged in and accepting the friend request
    // userData.user._id = user who submitted the friend request
    postFriendRequestAnswer(true, user._id, userData.user._id);
    setAcceptFriendRequest((prevRequest: string[]) => [
      ...prevRequest,
      user._id,
    ]);
  };

  const handleDelete = () => {
    postFriendRequestAnswer(false, user._id, userData.user._id);
    setDeclineFriendRequest((prevRequest: string[]) => [
      ...prevRequest,
      user._id,
    ]);
  };

  return (
    <div className="FriendRequestContainer">
      <div className="FriendRequestItem1">
        <IconButton
          onClick={() => navToProfile(userData.user._id)}
          sx={{ p: 0 }}
        >
          <CustomAvatar
            avatarURL={userData.user.avatar}
            userFirstnameLetter={userData.user.firstName.substring(0, 1)}
          />
        </IconButton>
      </div>
      <div className="FriendRequestItem2">
        {
          <a href={`/profile/${userData.user._id}`}>
            {userData.user.firstName} {userData.user.lastName}
          </a>
        }
      </div>
      <div className="FriendRequestItem3">
        {/* TODO these don't show mutual friends yet, just friends of the the requesting user */}
        {userData.user.friends.length === 0 ? (
          'No mutual friends'
        ) : userData.user.friends[0]._id == user._id ? ( // also checks if the 'mutual friend' is the authed user. If so, you can't be 'mutual friends' with yourself
          'No mutual friends'
        ) : (
          <>
            Mutual friends:
            <GroupAvatars userFriends={userData.user.friends} maxNum={2} />
          </>
        )}
      </div>
      {(userData.user.friends && userData.user.friends.includes(user._id)) ||
      (acceptFriendRequest && acceptFriendRequest.includes(user._id)) ? (
        <>
          <div className="FriendRequestItem4">
            <Button
              variant="contained"
              onClick={() => navToProfile(userData.user._id)}
            >
              Friend added! View profile
            </Button>
          </div>
          <div className="FriendRequestItem5"></div>
        </>
      ) : (userData.user.friends && userData.user.friends.includes(user._id)) ||
        (declineFriendRequest && declineFriendRequest.includes(user._id)) ? (
        <>
          <div className="FriendRequestItem4"></div>
          <div className="FriendRequestItem5">
            <Button variant="outlined" disabled>
              Deleted
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="FriendRequestItem4">
            <Button variant="contained" onClick={handleConfirm}>
              Confirm
            </Button>
          </div>
          <div className="FriendRequestItem5">
            <Button variant="outlined" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
