import { useState } from 'react';
import Link from '@mui/material/Link';
import PostModal from './PostModal';

export default function LinkButton({ post, comments, handleLike }: any) {
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  return (
    <>
      <Link
        component="button"
        // variant="body1"
        onClick={() => {
          handleModalOpen();
        }}
        sx={{ textDecoration: 'none', color: 'inherit' }}
      >
        {comments.length == 1
          ? `${comments.length} comment`
          : `${comments.length} comments`}
      </Link>
      <PostModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        post={post}
        handleLike={handleLike}
      />
    </>
  );
}
