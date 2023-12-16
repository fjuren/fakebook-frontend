import { useContext, useState } from 'react';
import { Card, Box, Button, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Modal from '@mui/material/Modal';

import CustomAvatar from './CustomAvatar';
import { updateProfilePic } from '../services/user.service';
import { AppContext } from '../utils/AppContext';

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
  const [contentError, setContentError] = useState(false);
  const [contentErrorText, setContentErrorText] = useState('');
  const { user, setProfilePic } = useContext(AppContext)!;

  const edit = (e: any) => {
    const fileFromEdit = e.target.files[0];
    const fileTypeFromEdit = fileFromEdit.type;
    setContentError(false);
    setContentErrorText('');

    if (fileTypeFromEdit !== 'image/jpeg' && fileTypeFromEdit !== 'image/png') {
      setContentError(true);
      setContentErrorText('Whoops! Image files only (.jpeg or .png)');
      return;
    }
    if (fileFromEdit) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // gets file url
        const dataUrl = event.target?.result as string;
        setFile(fileFromEdit);
        setFilePreview(dataUrl);

        const fileType = fileFromEdit.type;
        setFileType(fileType);
        setContentError(false);
      };
      reader.readAsDataURL(fileFromEdit);
    } else {
      return;
    }
  };

  const cancel = () => {
    setFilePreview(null);
    onClose();
  };

  const saveProfilePic = () => {
    setContentError(false);
    setContentErrorText('');

    const profileImage: FormData = new FormData();
    profileImage.append('file', file);
    profileImage.set('type', fileType);
    if (file) {
      setContentError(false);
      updateProfilePic(profileImage, user._id)
        .then((response: any) => {
          if (response.status === 200) {
            setProfilePic(response.data.fileURL);
            onClose();
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    } else {
      setContentError(true);
      setContentErrorText(
        'Whoops! Please choose a new profile picture, or cancel'
      );
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="postModal">
          <Card>
            <div className="modalHeader">
              <Typography variant="h2">Choose profile picture</Typography>
            </div>
            <div className="profilePicModal">
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
            <div className="profilePicBtnsContainer">
              <div className="profilePicBtns">
                <Button
                  className="profilePicBtns"
                  variant="outlined"
                  type="submit"
                  onClick={cancel}
                >
                  Cancel
                </Button>
              </div>
              <input
                id="add-media"
                type="file"
                accept="image/*"
                onChange={edit}
                style={{ display: 'none' }}
              />
              <label htmlFor="add-media">
                <Button
                  className="profilePicBtns"
                  variant="outlined"
                  component="span"
                  size="medium"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload file
                </Button>
              </label>
              <div className="profilePicBtns">
                <Button
                  className="profilePicBtns"
                  variant="outlined"
                  type="submit"
                  onClick={saveProfilePic}
                >
                  Save
                </Button>
              </div>
            </div>
            <div className="error-message">
              {contentError ? (
                <Typography style={{ color: 'red' }}>
                  {contentErrorText}
                </Typography>
              ) : null}
            </div>
          </Card>
        </Box>
      </Modal>
    </div>
  );
}
