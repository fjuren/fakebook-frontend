import { Avatar, AvatarProps } from '@mui/material'; // using ...props to allow custom sx to componentent

interface CustomAvatarProps extends AvatarProps {
  avatarURL: string;
  userFirstnameLetter: string;
}

export default function CustomAvatar({
  avatarURL,
  userFirstnameLetter,
  ...props
}: CustomAvatarProps) {
  return (
    <>
      {avatarURL !== '' ? (
        <Avatar alt="Profile picture" src={avatarURL} {...props} />
      ) : (
        <Avatar alt="Profile picture" {...props}>
          {userFirstnameLetter}
        </Avatar>
      )}
    </>
  );
}
