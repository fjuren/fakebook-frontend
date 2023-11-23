import '../assets/styles/FriendRequest.css';
import GroupAvatars from './GroupAvatars';
import { IconButton } from '@mui/material';
import CustomAvatar from './CustomAvatar';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function FriendRequests(userData: any) {
  const navigate = useNavigate();

  const navToProfile = (userID: any) => {
    navigate(`/profile/${userID}`);
  };

  const handleConfirm = () => {
    alert('confirm');
  };

  const handleDelete = () => {
    alert('baleted');
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
        {userData.user.friends.length === 0 ? (
          'No mutual friends'
        ) : (
          <GroupAvatars userFriends={userData.user.friends} maxNum={2} />
        )}
      </div>
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
    </div>
  );
}
