import {
  Box,
  Button,
  Checkbox,
  Grid,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState, type SyntheticEvent } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { type Task, type UserContextType } from '../types';
import { useContext } from 'react';
import { TaskContext } from '../../contexts/TaskContext';
import type { TaskContextType } from '../types';

const FocusConfigurationPage = () => {
  const { createTask, getTasks } = useContext<TaskContextType>(TaskContext);
  const { authenticatedUser } = useContext<UserContextType>(UserContext);
  const [tasks, setTasks] = useState<Task[]>([]);
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
        });
        console.log(JSON.stringify(response));
        handleClose();
      }
    } catch (err) {
      console.error('FocusConfigurationPage::error: ', err);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      if (authenticatedUser) {
        const tasks = await getTasks();
        if (tasks) {
          setTasks(tasks);
        }
      }
      setTitle('');
      setContent('');
    };

    fetchTasks();
  }, [authenticatedUser, getTasks]);

  return (
    <>
      <Box
        component="main"
        sx={{ padding: 4, textAlign: 'center', backgroundColor: '#fffdfb' }}
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
          mb: 5,
        }}
      >
        <Grid container spacing={2} sx={{ pt: 2 }}>
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
          </Grid>

          {/* Colonne droite */}
          <Grid item xs={12} md={6}>
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

          {/* Tableau + bouton sur toute la largeur */}
          {tasks.length > 0 ? (
            <Grid item xs={12}>
              <TableContainer component={Paper} sx={{ width: '100%' }}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#a87052' }}>
                      <TableCell sx={{ color: '#fff', fontWeight: 'bold' }} />
                      <TableCell
                        align="center"
                        sx={{ color: '#fff', fontWeight: 'bold' }}
                      >
                        Titre
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ color: '#fff', fontWeight: 'bold' }}
                      >
                        Description
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell>
                          <Checkbox defaultChecked />
                        </TableCell>
                        <TableCell align="center">{task.title}</TableCell>
                        <TableCell align="center">{task.content}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Bouton centré */}
              <Box
                sx={{ display: 'flex', justifyContent: 'space-around', mx: 20 }}
              >
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
                  Commencer
                </Button>
              </Box>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Typography sx={{ textAlign: 'center', mt: 4 }}>
                Aucune tâche à afficher
              </Typography>
            </Grid>
          )}
        </Grid>

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
                <Typography sx={{ color: '#9c684e', mb: 1 }}>Titre</Typography>
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
      </Box>
    </>
  );
};

export default FocusConfigurationPage;
