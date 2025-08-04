import { Box, Grid, Paper, Typography } from '@mui/material';
import type { Task } from '../types';

const Todopage = () => {
  const tasks: Task[] = [
    {
      title: 'Faire ces devoirs',
      content: 'Terminez les maths ',
    },
    {
      title: 'Ingédients pour le repas de ce soir',
      content: 'Pommes de terre, tomates cerises et de la béchamel',
    },
    {
      title: "Terminez les préparatifs de la fête d'anniversaire",
      content: "Acheter des ballons d'anniversaire",
    },
  ];

  return (
    <Box
      component="main"
      sx={{
        padding: 4,
        textAlign: 'center',
        backgroundColor: '#fffdfb',
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ color: '#9c684e' }}
        gutterBottom
      >
        Créer votre liste de tâches
      </Typography>

      <Grid container spacing={5} justifyContent="center">
        {/* To-do list */}
        {tasks.map((task) => (
          <Grid item xs={8} md={10}>
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
                {task.title}
              </Typography>
              <Typography sx={{ mb: 3, color: '#9c684e' }}>
                {task.content}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Todopage;
