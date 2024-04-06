// Catalogo.js 
import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Grid, Radio, makeStyles } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import { FaHeart } from 'react-icons/fa'; // Import heart icon from react-icons
import { FaRegHeart } from 'react-icons/fa'; // Import empty heart icon from react-icons
import Menu from './Menu'; // Import Menu component

const useStyles = makeStyles({
  root: {
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
    padding: '20px',
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

function Catalogo() { 
  const [users, setUsers] = useState([]);
  const classes = useStyles(); // Use styles

  useEffect(() => {
    axios.get('http://localhost:3001/users')
      .then(response => {
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          console.error('Unexpected response data format!');
        }
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  return (
        <div className={classes.root}>
          <Menu/> 
          <h1>Welcome to Catalogo</h1>
          <Grid container spacing={3}>
            {users.length > 0 ? users.map((user, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    component="img"
                    alt={user.name}
                    image={user.photo}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {user.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {user.description}
                    </Typography>
                    <Checkbox
                      icon={<FaRegHeart />} // Default icon (empty heart)
                      checkedIcon={<FaHeart style={{ color: 'red' }} />} // Icon when checked (filled heart in red)
                      onChange={() => {
                        axios.post('http://localhost:3001/like', { name: user.name })
                          .then(response => {
                            console.log(response);
                          })
                          .catch(error => {
                            console.error('There was an error!', error);
                          });
                      }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            )) : <Typography variant="h5">No users found</Typography>}
          </Grid>
        </div>
      ); 
    } 
     
    export default Catalogo;
