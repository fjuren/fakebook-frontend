import { useState } from 'react';
import { Box, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import CustomAvatar from './CustomAvatar';

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

  const addProfilePic = () => {
    alert('pic');
  };

  const addMedia = (e: any) => {
    const file = e.target.files[0];
    const fileType = file.type;
    setFile(file);
    setFileType(fileType);
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
          <h2>Choose profile picture</h2>
          <div className="profile-pic-modal">
            <CustomAvatar
              avatarURL={avatar}
              userFirstnameLetter={firstName.substring(0, 1)}
              sx={{ fontSize: 84, width: 168, height: 168 }}
            ></CustomAvatar>
          </div>
          <div>
            <input
              id="add-media"
              type="file"
              accept="image/*, video/*, .gif"
              onChange={addMedia}
              style={{ display: 'none' }}
            />
            <label htmlFor="add-media">
              <Button variant="outlined" component="span" size="medium">
                Edit
              </Button>
            </label>
          </div>
          <Button variant="outlined" type="submit" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
