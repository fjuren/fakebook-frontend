import { useContext, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';

import CustomAvatar from './CustomAvatar';
import { updateProfilePic } from '../services/user.service';
import { AppContext } from '../utils/AppContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  padding: 0,
};

export default function PostModal({
  open,
  onClose,
  avatar,
  firstName,
}: {
  open: boolean;
  onClose: () => void;
  avatar: string;
  firstName: string;
}) {
  const [file, setFile] = useState<any>(null);
  const [fileType, setFileType] = useState<any>(null);
  const [filePreview, setFilePreview] = useState<any>(null);
  const { user } = useContext(AppContext);

  const edit = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setFile(file);
        setFilePreview(dataUrl);

        const fileType = file.type;
        setFileType(fileType);
      };
      reader.readAsDataURL(file);
    }
  };

  const cancel = () => {
    setFilePreview(null);
    onClose();
  };

  const saveProfilePic = () => {
    // e.preventDefault();
    const profileImage: FormData = new FormData();
    profileImage.append('file', file); // file as image/video/GIF
    profileImage.set('type', fileType);

    updateProfilePic(profileImage, user._id)
      .then((response: any) => {
        if (response.status === 200) {
          onClose();
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography>Choose profile picture</Typography>
          <div className="profile-pic-modal">
            {filePreview ? (
              <CustomAvatar
                avatarURL={filePreview}
                userFirstnameLetter={firstName.substring(0, 1)}
                sx={{ fontSize: 84, width: 168, height: 168 }}
              ></CustomAvatar>
            ) : (
              <CustomAvatar
                avatarURL={avatar}
                userFirstnameLetter={firstName.substring(0, 1)}
                sx={{ fontSize: 84, width: 168, height: 168 }}
              ></CustomAvatar>
            )}
          </div>
          <div>
            <input
              id="add-media"
              type="file"
              accept="image/*"
              onChange={edit}
              style={{ display: 'none' }}
            />
            <label htmlFor="add-media">
              <Button variant="outlined" component="span" size="medium">
                Edit
              </Button>
            </label>
          </div>
          <Button variant="outlined" type="submit" onClick={cancel}>
            Cancel
          </Button>
          <Button variant="contained" type="submit" onClick={saveProfilePic}>
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
