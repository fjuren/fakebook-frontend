import React, { useState } from 'react';
import Link from '@mui/material/Link';
import PostModal from './PostModal';

export default function LinkButton({ comments }: any) {
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
        comments={comments}
      />
    </>
  );
}
