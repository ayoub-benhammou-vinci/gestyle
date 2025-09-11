import {
  Alert,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import RowRadioButtonsGroup from '../../utils/RadioButton';
import { useContext, useEffect, useState, type SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import type { UserContextType } from '../types';

const RegisterPage = () => {
  const [sexe, setSexe] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const civilityMap = new Map<string, string>([
    ['Féminin', 'MADAM'],
    ['Masculin', 'MISTER'],
    ['Autre', 'OTHER'],
  ]);

  const { authenticatedUser, registerUser } =
    useContext<UserContextType>(UserContext);

  useEffect(() => {
    if (authenticatedUser) {
      navigate('/'); // Redirection vers la page d'accueil si l'utilisateur est déjà connecté
    }
    setSexe('');
    setPseudo('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
  }, [navigate, authenticatedUser]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    // If password and confirmPassword do not match, set an error message and return
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      console.error('Les mots de passe ne correspondent pas.');
      return;
    }

    // If sexe is not selected, set an error message and return
    let civility: string = '';

    if (civilityMap.get(sexe) !== undefined) {
      civility = civilityMap.get(sexe)!;
    } else {
      setError('Veuillez sélectionner une option pour le sexe.');
      return;
    }

    try {
      const response = await registerUser({
        civility,
        pseudo,
        email,
        password,
      });

      if (response) {
        navigate('/login'); // Redirection vers la page Login après inscription réussie
      } else {
        setError("Erreur d'inscription. Veuillez réessayer.");
      }
    } catch (err) {
      console.error('RegisterPage::error: ', err);
    }
  };
  return (
    <Box
      component="form"
      sx={{ flex: 1, py: 5, textAlign: 'center' }}
      onSubmit={handleSubmit}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ color: '#9c684e', mb: 4 }}
      >
        Inscription
      </Typography>

      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{
          color: '#9c684e',
          mb: 4,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {error && <Alert severity="error">{error}</Alert>}
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
                  value={sexe}
                  onChange={(val) => setSexe(val)}
                />
              </Box>

              <Typography sx={{ color: '#9c684e', mb: 1 }}>Pseudo</Typography>
              <TextField
                fullWidth
                variant="outlined"
                sx={{ backgroundColor: '#fff' }}
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
                required
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
              />

              <Typography sx={{ color: '#9c684e', mb: 1 }}>
                Mot de passe
              </Typography>
              <TextField
                fullWidth
                type="password"
                variant="outlined"
                sx={{ mb: 1, backgroundColor: '#fff' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                inputProps={{
                  pattern:
                    '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,}$',
                  title:
                    'Au moins 8 caractères avec 1 majuscule, 1 minuscule, 1 chiffre et 1 symbole',
                }}
                required
              />

              <Typography sx={{ color: '#9c684e', mb: 1 }}>
                Répéter le mot de passe
              </Typography>
              <TextField
                fullWidth
                type="password"
                variant="outlined"
                sx={{ backgroundColor: '#fff' }}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
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
            type="submit"
          >
            S’inscrire
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default RegisterPage;
