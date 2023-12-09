import { useState } from 'react';
import Link from '@mui/material/Link';
import PostModal from './PostModal';

export default function LinkButton({
  post,
  comments,
  localLikes,
  setLocalLikes,
  handleLike,
}: any) {
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  return (
    <>
      <Link
        component="button"
        variant="body2"
        onClick={() => {
          handleModalOpen();
        }}
      >
        {comments.length} Comments
      </Link>
      <PostModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        post={post}
        localLikes={localLikes}
        setLocalLikes={setLocalLikes}
        handleLike={handleLike}
        // comments={comments}
      />
    </>
  );
}
