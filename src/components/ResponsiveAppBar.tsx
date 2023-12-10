import React, { useContext, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import { getUser } from '../services/auth.service';
import CustomAvatar from './CustomAvatar';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';
import { logout } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../utils/AppContext';

// const pages = ['Timeline']; // Leaving this in case I need to create many pages
// const settings = ['Profile', 'Logout']; // consider map function if more settings are added

function ResponsiveAppBar({
  userID,
  userAvatar,
  userFirstnameLetter,
  userName,
  handleLogout,
}: any) {
  const navigate = useNavigate();

  const { profilePic } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        getUser();
      } catch (err) {
        console.log(err);
      } finally {
        // Uncomment the setLoading line if you need it
        // setLoading(false);
      }
    };
    fetchData();
  }, [profilePic]);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleProfile = () => {
    setAnchorElUser(null);
    navigate(`/profile/${userID}`);
  };

  const handleFriends = () => {
    setAnchorElUser(null);
    navigate(`/friends/${userName}/?userOrAuthUserID=${userID}`);
  };

  const handleUserLogout = () => {
    logout().then(() => {
      // console.log(response.data);
      setAnchorElUser(null);
      handleLogout(null);
      navigate('/');
    });
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: theme.palette.secondary.light,
            color: theme.typography.body1,
            // position: 'fixed',
            marginBottom: '10px',
          }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <a href="/">
                <img
                  src="/fakebook.svg"
                  // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt="Fakebook logo"
                  loading="lazy"
                />
              </a>
              {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  // letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                fakebook
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  <MenuItem key="Timeline" onClick={handleCloseNavMenu}>
                    <Typography
                      textAlign="center"
                      variant="h6"
                      noWrap
                      component="a"
                      href="/timeline"
                      sx={{
                        color: theme.typography.body1,
                        textDecoration: 'none',
                      }}
                    >
                      Timeline
                    </Typography>
                  </MenuItem>
                  <MenuItem key="Friends" onClick={handleCloseNavMenu}>
                    <Typography
                      textAlign="center"
                      variant="h6"
                      noWrap
                      component="a"
                      onClick={handleFriends}
                      // href={`/friends/${userID}`}
                      sx={{
                        color: theme.typography.body1,
                        textDecoration: 'none',
                      }}
                    >
                      Friends
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Button
                  key="Timeline"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  <Typography
                    textAlign="center"
                    variant="h6"
                    noWrap
                    component="a"
                    href="/timeline"
                    sx={{
                      color: theme.typography.body1,
                      textDecoration: 'none',
                    }}
                  >
                    Timeline
                  </Typography>
                </Button>
                <Button key="Friends" onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    variant="h6"
                    noWrap
                    component="a"
                    onClick={handleFriends}
                    // href={`/friends/${userID}`}
                    sx={{
                      color: theme.typography.body1,
                      textDecoration: 'none',
                    }}
                  >
                    Friends
                  </Typography>
                </Button>
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <CustomAvatar
                      avatarURL={profilePic ? profilePic : userAvatar}
                      userFirstnameLetter={userFirstnameLetter}
                    ></CustomAvatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem key="Profile" onClick={handleProfile}>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem key="Logout" onClick={handleUserLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    </>
  );
}
export default ResponsiveAppBar;
