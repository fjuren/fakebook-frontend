import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import '../assets/styles/modals.css';

import TimelinePostCardModal from './TimelinePostCardModal';

// const style = {

// };

export default function PostModal({
  open,
  onClose,
  post,
  handleLike,
}: {
  open: boolean;
  onClose: () => void;
  post: any;
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
        <Box className="postModal">
          <TimelinePostCardModal post={post} handleLike={handleLike} />
        </Box>
      </Modal>
    </div>
  );
}
