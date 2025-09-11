import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import RowRadioButtonsGroup from '../../utils/RadioButton';

const RegisterPage = () => {
  return (
    <Box sx={{ flex: 1, py: 5, textAlign: 'center' }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ color: '#9c684e', mb: 4 }}
      >
        Inscription
      </Typography>

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
        <Grid container spacing={3}>
          {/* Colonne gauche */}
          <Grid item xs={12} md={6}>
            <Box textAlign="left">
              <Box sx={{ color: '#9c684e', mb: 3.8 }}>
                <RowRadioButtonsGroup
                  option1="Féminin"
                  option2="Masculin"
                  option3="Autre"
                />
              </Box>

              <Typography sx={{ color: '#9c684e', mb: 1 }}>Pseudo</Typography>
              <TextField
                fullWidth
                variant="outlined"
                sx={{ backgroundColor: '#fff' }}
              />
            </Box>
          </Grid>

          {/* Colonne droite */}
          <Grid item xs={12} md={6}>
            <Box textAlign="left">
              <Typography sx={{ color: '#9c684e', mb: 1 }}>
                Adresse e-mail
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                sx={{ mb: 1, backgroundColor: '#fff' }}
              />

              <Typography sx={{ color: '#9c684e', mb: 1 }}>
                Mot de passe
              </Typography>
              <TextField
                fullWidth
                type="password"
                variant="outlined"
                sx={{ mb: 1, backgroundColor: '#fff' }}
              />

              <Typography sx={{ color: '#9c684e', mb: 1 }}>
                Répéter le mot de passe
              </Typography>
              <TextField
                fullWidth
                type="password"
                variant="outlined"
                sx={{ backgroundColor: '#fff' }}
              />
            </Box>
          </Grid>
        </Grid>

        {/* Bouton */}
        <Box mt={4}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#a87052',
              color: '#fff',
              paddingX: 4,
              paddingY: 1,
              borderRadius: 3,
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#915e45',
              },
            }}
          >
            S’inscrire
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default RegisterPage;
