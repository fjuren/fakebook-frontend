import AvatarGroup from '@mui/material/AvatarGroup';
import CustomAvatar from './CustomAvatar';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function GroupAvatars({
  userFriends,
  maxNum,
}: {
  userFriends: any;
  maxNum: number;
}) {
  const navigate = useNavigate();

  const navToProfile = (userID: any) => {
    navigate(`/profile/${userID}`);
  };
  return (
    <AvatarGroup max={maxNum}>
      {userFriends.map((friend: any, index: number) => (
        <IconButton
          key={index}
          onClick={() => navToProfile(friend._id)}
          sx={{ p: 0 }}
        >
          <CustomAvatar
            avatarURL={friend.avatar}
            userFirstnameLetter={friend.firstName}
            alt={`${friend.firstName} ${friend.lastName}`}
            src={friend.avatar}
          />
        </IconButton>
      ))}
    </AvatarGroup>
  );
}
