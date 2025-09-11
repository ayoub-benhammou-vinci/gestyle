import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import ChecklistIcon from '@mui/icons-material/Checklist';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <Box
      component="main"
      sx={{ padding: 8, textAlign: 'center', backgroundColor: '#fffdfb' }}
    >
      <Typography
        variant="h3"
        fontWeight="bold"
        sx={{ color: '#9c684e' }}
        gutterBottom
      >
        Bienvenue dans votre espace personnel !
      </Typography>

      <Typography variant="h5" sx={{ mb: 5, color: '#9c684e' }}>
        Gagnez en clarté, en organisation et en inspiration <br />
        grâce à nos deux outils de travail pensés pour vous.
      </Typography>

      <Grid container spacing={8} justifyContent="center">
        {/* To-do list */}
        <Grid item xs={12} md={5}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              borderRadius: 4,
              backgroundColor: '#f9f2eb',
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ color: '#9c684e' }}
              gutterBottom
            >
              To-do list <ChecklistIcon />
            </Typography>
            <Typography sx={{ mb: 3, color: '#9c684e' }}>
              Organisez vos tâches perso ou en équipe, <br />
              et restez motivé ensemble jour après jour.
            </Typography>
          </Paper>
        </Grid>

        {/* Focus */}
        <Grid item xs={12} md={5}>
          <Paper
            elevation={3}
            sx={{ padding: 3, borderRadius: 4, backgroundColor: '#f9f2eb' }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ color: '#9c684e' }}
              gutterBottom
            >
              Focus <TrackChangesIcon />
            </Typography>
            <Typography sx={{ mb: 3, color: '#9c684e' }}>
              Boostez votre concentration grâce à la méthode Pomodoro. <br />
              Seul ou accompagné, restez focus sans vous épuiser.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#a87052',
          color: '#fff',
          borderRadius: '12px',
          paddingX: 8,
          py: 1.5,
          '&:hover': {
            backgroundColor: '#915e45',
          },
          marginTop: 8,
        }}
        onClick={() => navigate('/focus')}
      >
        Cliquez ici
      </Button>
    </Box>
  );
};

export default Homepage;
