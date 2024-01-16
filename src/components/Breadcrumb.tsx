import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

export default function Breadcrumb({
  parentRoute,
  parentPage,
  currentPage,
}: {
  parentRoute: string;
  parentPage: string;
  currentPage: string;
}) {
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    navigate(parentRoute);
  };

  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href={parentRoute}>
          {parentPage}
        </Link>
        <Typography color="text.primary">{currentPage}</Typography>
      </Breadcrumbs>
    </div>
  );
}
