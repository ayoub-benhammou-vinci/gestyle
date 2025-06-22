// src/components/Navbar.tsx
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Button,
  Badge,
  Avatar,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

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

        {/* Right side - Nav buttons + notifications + profile */}
        <Box display="flex" alignItems="center" gap={4}>
          <Button onClick={() => navigate('/todo')} sx={navButtonStyle}>
            To-do
          </Button>
          <Button onClick={() => navigate('/focus')} sx={navButtonStyle}>
            Focus
          </Button>

          <IconButton onClick={() => navigate('/notifications')}>
            <Badge badgeContent={1} color="error">
              <NotificationsIcon sx={{ color: '#a06b4f' }} />
            </Badge>
          </IconButton>

          <IconButton onClick={() => navigate('/profile')}>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: '#e2d6cc',
              }}
            />
          </IconButton>
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
