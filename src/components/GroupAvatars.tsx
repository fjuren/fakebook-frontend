import AvatarGroup from '@mui/material/AvatarGroup';
import CustomAvatar from './CustomAvatar';

export default function GroupAvatars({
  userFriends,
  maxNum,
}: {
  userFriends: any;
  maxNum: number;
}) {
  console.log(userFriends);
  return (
    <AvatarGroup max={maxNum}>
      {userFriends.map((friend: any, index: number) => {
        <CustomAvatar
          key={index}
          avatarURL={friend.user.avatarURL}
          userFirstnameLetter={friend.user.firstName}
          alt={`${friend.user.firstName} ${friend.user.lastName}`}
          src={friend.user.avatarURL}
        />;
      })}
    </AvatarGroup>
  );
}
