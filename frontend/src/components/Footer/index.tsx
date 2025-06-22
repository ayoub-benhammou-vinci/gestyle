// src/components/Footer.tsx
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#f9f1e7',
        py: 2,
        textAlign: 'center',
        mt: 'auto',
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          color: '#a06b4f',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          fontFamily: `'Segoe UI', 'Roboto', 'Helvetica', sans-serif`,
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        }}
      >
        Réalisé par Kakuze
      </Typography>
    </Box>
  );
};

export default Footer;
