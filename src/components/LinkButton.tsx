import Link from '@mui/material/Link';

export default function LinkButton({ comments, handleModalOpen }: any) {
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
    </>
  );
}
