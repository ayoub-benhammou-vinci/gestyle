import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';
import { useEffect, useState, type SyntheticEvent } from 'react';
import type { NewTask } from '../types';
import { UserContext } from '../../contexts/UserContext';
import type { UserContextType } from '../types';
import { useContext } from 'react';

const createTask = async (newTask: NewTask): Promise<NewTask | undefined> => {
  try {
    const options = {
      method: 'POST',
      body: JSON.stringify(newTask),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch('/api/tasks', options);
    if (!response.ok) {
      throw new Error('Failed to create task');
    }

    const t = await response.json();
    return t;
  } catch (error) {
    console.error('Error creating task:', error);
    return undefined;
  }
};

const FocusConfigurationPage = () => {
  const { authenticatedUser } = useContext<UserContextType>(UserContext);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      if (authenticatedUser) {
        const response = await createTask({
          title,
          content,
          email: authenticatedUser.email,
        });
        console.log(JSON.stringify(response));
        handleClose();
      }
    } catch (err) {
      console.error('FocusConfigurationPage::error: ', err);
    }
  };

  useEffect(() => {
    setTitle('');
    setContent('');
  }, []);

  return (
    <>
      <Box
        component="main"
        sx={{ padding: 6, textAlign: 'center', backgroundColor: '#fffdfb' }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: '#9c684e' }}
          gutterBottom
        >
          Configuration de la méthode Pomodoro
        </Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: '#f9f2eb',
          padding: 2,
          borderRadius: 4,
          mx: 10,
          px: 15,
        }}
      >
        <Grid container spacing={4} sx={{ pt: 2 }}>
          {/* Colonne gauche */}
          <Grid item xs={12} md={6}>
            <Typography sx={{ color: '#9c684e', mb: 1 }}>
              Temps de travail (minutes)
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              sx={{ mb: 3, backgroundColor: '#fff' }}
            />

            <Typography sx={{ color: '#9c684e', mb: 1 }}>
              Temps de pause (minutes)
            </Typography>
            <TextField
              fullWidth
              type="number"
              variant="outlined"
              sx={{ mb: 2, backgroundColor: '#fff' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#a87052',
                color: '#fff',
                paddingY: 1,
                borderRadius: 3,
                fontWeight: 'bold',
                mt: 4,
              }}
              onClick={handleOpen}
            >
              Ajouter une tâche
            </Button>

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="child-modal-title"
              aria-describedby="child-modal-description"
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 600,
                  height: 400,
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  boxShadow: 24,
                  p: 4,
                  backgroundColor: '#f9f2eb',
                }}
              >
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    color: '#9c684e',
                    textAlign: 'center',
                    mb: 3,
                    fontWeight: 'bold',
                  }}
                >
                  Ajouter une tâche
                </Typography>
                <Grid
                  container
                  direction="column"
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Grid item xs={12} md={6}>
                    <Typography sx={{ color: '#9c684e', mb: 1 }}>
                      Titre
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      sx={{ mb: 2, backgroundColor: '#fff' }}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography sx={{ color: '#9c684e', mb: 1 }}>
                      Description
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      sx={{ mb: 2, backgroundColor: '#fff' }}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: '#a87052',
                        color: '#fff',
                        paddingY: 1,
                        borderRadius: 3,
                        fontWeight: 'bold',
                        mt: 4,
                        textAlign: 'center',
                      }}
                      onClick={handleSubmit}
                    >
                      Ajouter
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Modal>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default FocusConfigurationPage;
