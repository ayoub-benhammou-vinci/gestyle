import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Link,
} from '@mui/material';

const LoginPage = () => {
  return (
    <Box sx={{ flex: 1, py: 6, textAlign: 'center' }}>
      {/* Titre */}
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ color: '#9c684e', mb: 4 }}
      >
        Se connecter
      </Typography>

      {/* Conteneur principal */}
      <Paper
        elevation={3}
        sx={{
          maxWidth: 900,
          margin: '0 auto',
          padding: 4,
          borderRadius: 5,
          backgroundColor: '#f5eee7',
        }}
      >
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          {/* Image gauche */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://www.risely.me/wp-content/uploads/2023/03/Risely-featured-image-teamwork-1240x698.webp"
              alt="Illustration de connexion"
              sx={{
                width: '100%',
                maxWidth: 400,
                borderRadius: 2,
                boxShadow: 1,
              }}
            />
          </Grid>

          {/* Formulaire */}
          <Grid item xs={12} md={6}>
            <Box component="form" sx={{ textAlign: 'left' }}>
              <Typography sx={{ color: '#9c684e', mb: 1 }}>
                Adresse e-mail ou pseudo
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                sx={{ mb: 2, backgroundColor: '#fff' }}
              />

              <Typography sx={{ color: '#9c684e', mb: 1 }}>
                Mot de passe
              </Typography>
              <TextField
                fullWidth
                type="password"
                variant="outlined"
                sx={{ mb: 3, backgroundColor: '#fff' }}
              />

              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: '#a87052',
                  color: '#fff',
                  paddingY: 1,
                  borderRadius: 3,
                  fontWeight: 'bold',
                  mb: 2,
                  '&:hover': {
                    backgroundColor: '#915e45',
                  },
                }}
              >
                Se connecter
              </Button>

              <Typography
                variant="body2"
                sx={{ color: '#a87052', textAlign: 'center' }}
              >
                Pas encore de compte,{' '}
                <Link href="#" underline="hover" color="#a87052">
                  créer en un
                </Link>
                <br />
                Mot de passe oublié ?{' '}
                <Link href="#" underline="hover" color="#a87052">
                  Réinitialisez-le
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default LoginPage;
