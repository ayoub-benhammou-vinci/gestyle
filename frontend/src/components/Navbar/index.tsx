// src/components/Navbar.tsx
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import type { UserContextType } from '../types';
import { useContext, useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const { authenticatedUser, logout } =
    useContext<UserContextType>(UserContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logoutAndRedirect = () => {
    logout();
    navigate('/login');
    handleMenuClose();
  };

  const goToProfile = () => {
    navigate('/profile');
    handleMenuClose();
  };

  return (
    <AppBar
      position="static"
      sx={{ bgcolor: '#f9f1e7', boxShadow: 'none', px: 2 }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left side - Home */}
        <Box display="flex" alignItems="center">
          <IconButton onClick={() => navigate('/')} disableRipple>
            <HomeIcon sx={{ color: '#a06b4f', fontSize: 32 }} />
          </IconButton>
        </Box>

        {/* Right side - Nav buttons + profile */}
        <Box display="flex" alignItems="center" gap={4}>
          {authenticatedUser && (
            <>
              <IconButton onClick={handleMenuOpen}>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: '#e2d6cc',
                    backgroundColor: '#a06b4f',
                  }}
                />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={goToProfile} sx={{ color: '#a06b4f' }}>
                  Voir profil
                </MenuItem>
                <MenuItem onClick={logoutAndRedirect} sx={{ color: '#a06b4f' }}>
                  Se déconnecter
                </MenuItem>
              </Menu>
            </>
          )}

          {!authenticatedUser && (
            <>
              <IconButton onClick={() => navigate('/login')}>
                <Typography sx={navButtonStyle}>Se connecter</Typography>
              </IconButton>

              <IconButton onClick={() => navigate('/register')}>
                <Typography sx={navButtonStyle}>S'inscrire</Typography>
              </IconButton>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const navButtonStyle = {
  color: '#a06b4f',
  fontWeight: 'bold',
  textTransform: 'none',
  fontSize: '1.2rem',
  fontFamily: `'Segoe UI', 'Roboto', 'Helvetica', sans-serif`,
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  '&:hover': {
    textDecoration: 'underline',
    backgroundColor: 'transparent',
  },
};

export default Navbar;
