import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import image1 from '../../assets/images/pomodoro_1.png';
import image2 from '../../assets/images/focus_2.png';
import image3 from '../../assets/images/coffee_3.png';

const FocusPage = () => {
  return (
    <>
      <Box
        component="main"
        sx={{ px: 8, textAlign: 'center', backgroundColor: '#fffdfb', py: 5 }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: '#9c684e' }}
          gutterBottom
        >
          Focus avec la méthode Pomodoro
        </Typography>

        <Typography variant="h6" sx={{ mb: 5, color: '#9c684e' }}>
          Concentrez-vous pleinement, sans vous épuiser. <br />
          Alternez travail et repos pour garder l’équilibre.
        </Typography>

        {/* Conteneur beige clair */}
        <Box
          sx={{
            backgroundColor: '#f9f2eb',
            padding: 4,
            borderRadius: 4,
            mx: { xs: 2, md: 10 },
          }}
        >
          <Grid container spacing={4} justifyContent="center" sx={{ mb: 5 }}>
            {/* Étape 1 */}
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: '#fff',
                  textAlign: 'center',
                  minHeight: 260, // 🔹 même hauteur pour toutes les cartes
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ color: '#9c684e', mb: 1 }}
                >
                  1
                </Typography>
                <Box
                  component="img"
                  src={image1}
                  alt="Notez vos tâches"
                  sx={{ width: 120, height: 'auto', mb: 2 }} // 🔹 image plus grande
                />
                <Typography sx={{ color: '#9c684e', fontWeight: 'bold' }}>
                  Notez vos tâches du jour
                </Typography>
              </Paper>
            </Grid>

            {/* Étape 2 */}
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: '#fff',
                  textAlign: 'center',
                  minHeight: 260,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ color: '#9c684e', mb: 1 }}
                >
                  2
                </Typography>
                <Box
                  component="img"
                  src={image2}
                  alt="Configurez votre temps de travail"
                  sx={{ width: 120, height: 'auto', mb: 2 }}
                />
                <Typography sx={{ color: '#9c684e', fontWeight: 'bold' }}>
                  Configurez votre temps de travail
                </Typography>
              </Paper>
            </Grid>

            {/* Étape 3 */}
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: '#fff',
                  textAlign: 'center',
                  minHeight: 260,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ color: '#9c684e', mb: 1 }}
                >
                  3
                </Typography>
                <Box
                  component="img"
                  src={image3}
                  alt="Configurez votre temps de travail"
                  sx={{ width: 100, height: 'auto', mb: 2 }}
                />
                <Typography sx={{ color: '#9c684e', fontWeight: 'bold' }}>
                  Gardez l’équilibre entre focus et pause
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Bouton */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#a87052',
              color: '#fff',
              px: 4,
              py: 1.5,
              borderRadius: 3,
              fontWeight: 'bold',
              fontSize: '1.1rem',
              '&:hover': {
                backgroundColor: '#915e45',
              },
            }}
          >
            Commencer dès maintenant
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default FocusPage;
