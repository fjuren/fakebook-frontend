import { useState } from 'react';
import { IconButton } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ProfilePicModal from './ProfilePicModal';

export default function ProfilePicButton({
  avatar,
  firstName,
}: {
  avatar: string;
  firstName: string;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  return (
    <>
      <IconButton
        component="span"
        size="medium"
        onClick={() => {
          handleModalOpen();
        }}
      >
        <AddAPhotoIcon />
      </IconButton>
      <ProfilePicModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        avatar={avatar}
        firstName={firstName}
      />
    </>
  );
}
