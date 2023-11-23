import '../assets/styles/FriendRequest.css';
import GroupAvatars from './GroupAvatars';
import CustomAvatar from './CustomAvatar';
import { Button } from '@mui/material';

export default function FriendRequests(userData: any) {
  const handleConfirm = () => {
    alert('confirm');
  };

  const handleDelete = () => {
    alert('baleted');
  };
  console.log(userData.user.avatar);
  return (
    <div className="FriendRequestContainer">
      <div className="FriendRequestItem1">
        <CustomAvatar
          avatarURL={userData.user.avatar}
          userFirstnameLetter={userData.user.firstName.substring(0, 1)}
        />
      </div>
      <div className="FriendRequestItem2">{`${userData.user.firstName} ${userData.user.lastName}`}</div>
      <div className="FriendRequestItem3">
        {userData.user.friends.length === 0 ? (
          'You have no mutual friends'
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
