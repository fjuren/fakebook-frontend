import '../assets/styles/FriendRequest.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import GroupAvatars from './GroupAvatars';
import CustomAvatar from './CustomAvatar';
import { Button } from '@mui/material';
import { AppContext } from '../utils/AppContext';
import { unFriend } from '../services/user.service';

export default function Friends(userData: any) {
  const { user, unfriend, setUnfriend } = useContext(AppContext);
  const navigate = useNavigate();

  const navToProfile = (userID: string) => {
    navigate(`/profile/${userID}`);
  };

  const handleDelete = () => {
    // user._id = current user logged in and accepting the friend request
    // userData.user._id = user who submitted the friend request
    unFriend(true, user._id, userData.user._id);
    setUnfriend((prevRequest: string[]) => [...prevRequest, user._id]);
  };
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
      {unfriend && unfriend.includes(user._id) ? (
        <>
          <div className="FriendRequestItem4">
            <Button variant="contained" onClick={() => navToProfile(user._id)}>
              View profile
            </Button>
          </div>
          <div className="FriendRequestItem5">
            <Button variant="outlined" disabled onClick={handleDelete}>
              Unfriended
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="FriendRequestItem4">
            <Button variant="contained" onClick={() => navToProfile(user._id)}>
              View profile
            </Button>
          </div>
          <div className="FriendRequestItem5">
            <Button variant="outlined" onClick={handleDelete}>
              Unfriend
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
