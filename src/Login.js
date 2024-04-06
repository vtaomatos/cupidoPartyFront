import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Paper, TextField, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundImage: 'url(https://source.unsplash.com/random?sensual)', // Replace with your image URL
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#ff4081', // Warm color
  },
}));

function Login() {
  const classes = useStyles();
  const [documento, setDocumento] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    setError(null);
  
    axios.post('http://localhost:3001/login', { documento })
      .then(response => {
        if (response.data.success) {
          navigate('/catalogo');
        } else {
          setError(response.data.message);
        }
      })
      .catch(error => {
        console.error('Failed to login', error);
        setError('Failed to login');
      });
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          Entrar
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="documento"
            label="Documento"
            name="documento"
            autoComplete="documento"
            autoFocus
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleLogin}
          >
            Entrar
          </Button>
          {error && <p>{error}</p>}
        </form>
      </Paper>
    </div>
  );
}

export default Login;
