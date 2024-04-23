import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  button: {
    color: '#fff', // Cor do texto do botão
    '&:hover': {
      backgroundColor: '#283593', // Cor de fundo do botão ao passar o mouse
    },
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  appBar: {
    marginBottom: '1em',
    backgroundColor: '#3f51b5', // Cor de fundo da barra de aplicativos
  },
});

function Navbar() {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Button className={classes.button}>
          <Link className={classes.link} to="/">Home</Link>
        </Button>
        <Button className={classes.button}>
          <Link className={classes.link} to="/catalogo">Catalogo</Link>
        </Button>     
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
