import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import TimelinePostCardModal from './TimelinePostCardModal';

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
  post,
  localLikes,
  setLocalLikes,
  handleLike,
}: {
  open: boolean;
  onClose: () => void;
  post: any;
  localLikes: any;
  setLocalLikes: any;
  handleLike: any;
}) {
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TimelinePostCardModal
            post={post}
            localLikes={localLikes}
            setLocalLikes={setLocalLikes}
            handleLike={handleLike}
          />
        </Box>
      </Modal>
    </div>
  );
}
