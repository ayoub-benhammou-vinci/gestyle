import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Link,
  Alert,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from '@mui/material';
import type { UserContextType } from '../types';
import { useContext, useEffect, useState, type SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { loginUser, authenticatedUser } =
    useContext<UserContextType>(UserContext);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (authenticatedUser) {
      navigate('/');
    }
    setEmail('');
    setPassword('');
    setError('');
  }, [navigate, authenticatedUser]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password }, rememberMe);
      console.log(JSON.stringify(response));
      navigate('/');
    } catch (err) {
      console.error('LoginPage::error: ', err);
      setError('Email ou mot de passe invalide.');
    }
  };

  return (
    <Box sx={{ flex: 1, py: 3, textAlign: 'center' }}>
      {/* Titre */}
      <Typography variant="h4" fontWeight="bold" sx={{ color: '#9c684e' }}>
        Se connecter
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
            <Box
              component="form"
              sx={{ textAlign: 'left' }}
              onSubmit={handleSubmit}
            >
              <Typography sx={{ color: '#9c684e', mb: 1 }}>
                Adresse e-mail
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                sx={{ mb: 2, backgroundColor: '#fff' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
              />

              <Typography sx={{ color: '#9c684e', mb: 1 }}>
                Mot de passe
              </Typography>
              <TextField
                fullWidth
                type="password"
                variant="outlined"
                sx={{ mb: 2, backgroundColor: '#fff' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Se souvenir de moi"
                  sx={{
                    color: '#9c684e',
                    display: 'flex',
                    justifyContent: 'center',
                    mb: 2,
                  }}
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe((e.target as HTMLInputElement).checked)
                  }
                />
              </FormGroup>
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
                type="submit"
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
