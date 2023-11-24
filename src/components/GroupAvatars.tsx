import AvatarGroup from '@mui/material/AvatarGroup';
import CustomAvatar from './CustomAvatar';

export default function GroupAvatars({
  userFriends,
  maxNum,
}: {
  userFriends: any;
  maxNum: number;
}) {
  // console.log(userFriends);
  return (
    <AvatarGroup max={maxNum}>
      {userFriends.map((friend: any, index: number) => {
        {
          console.log(friend);
        }
        <CustomAvatar
          key={index}
          avatarURL={friend.avatar}
          userFirstnameLetter={friend.firstName}
          alt={`${friend.firstName} ${friend.lastName}`}
          src={friend.avatar}
        />;
      })}
    </AvatarGroup>
  );
}
