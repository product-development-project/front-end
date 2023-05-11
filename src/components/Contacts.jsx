import React from 'react';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

export default function AutoGrid() {
  const contacts = [
    {
      name: 'Edgaras Blauzdys',
      email: 'e.blauzdys@ktu.edu',
      style: {
        backgroundColor: '#fff',
        padding: '16px',
        textAlign: 'center',
        color: 'rgba(0, 0, 0, 0.87)',
        margin: '-8px',
        fontSize: '0.875rem',
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        fontWeight: 400,
        lineHeight: 1.43,
        letterSpacing: '0.01071em',
      },
    },
    {
      name: 'Augustė Čičinskaitė',
      email: 'auguste.cicinskaite@ktu.edu',
      style: {
        backgroundColor: '#fff',
        padding: '16px',
        textAlign: 'center',
        color: 'rgba(0, 0, 0, 0.87)',
        margin: '-8px',
        fontSize: '0.875rem',
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        fontWeight: 400,
        lineHeight: 1.43,
        letterSpacing: '0.01071em',
      },
    },
    {
      name: 'Augustas Druceika',
      email: 'augustas.druceika@ktu.edu',
      style: {
        backgroundColor: '#fff',
        padding: '16px',
        textAlign: 'center',
        color: 'rgba(0, 0, 0, 0.87)',
        margin: '-8px',
        fontSize: '0.875rem',
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        fontWeight: 400,
        lineHeight: 1.43,
        letterSpacing: '0.01071em',
      },
    },
    {
      name: 'Justinas Končius',
      email: 'justinas.koncius@ktu.edu',
      style: {
        backgroundColor: '#fff',
        padding: '16px',
        textAlign: 'center',
        color: 'rgba(0, 0, 0, 0.87)',
        margin: '-8px',
        fontSize: '0.875rem',
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        fontWeight: 400,
        lineHeight: 1.43,
        letterSpacing: '0.01071em',
      },
    },
    {
      name: 'Rokas Miliūnas',
      email: 'rokas.miliunas@ktu.edu',
      style: {
        backgroundColor: '#fff',
        padding: '16px',
        textAlign: 'center',
        color: 'rgba(0, 0, 0, 0.87)',
        margin: '-8px',
        fontSize: '0.875rem',
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        fontWeight: 400,
        lineHeight: 1.43,
        letterSpacing: '0.01071em',
      },
    },
    {
      name: 'Marijus Petkevičius',
      email: 'ma.petkevicius@ktu.edu',
      style: {
        backgroundColor: '#fff',
        padding: '16px',
        textAlign: 'center',
        color: 'rgba(0, 0, 0, 0.87)',
        margin: '-8px',
        fontSize: '0.875rem',
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        fontWeight: 400,
        lineHeight: 1.43,
        letterSpacing: '0.01071em',
      },
    },

  ];

  const helpStyle = {
    backgroundColor: '#fff',
    padding: '16px',
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.87)',
    margin: '-8px',
    fontSize: '1.2rem',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: '0.00938em',
  };

  const chatStyle = {
    backgroundColor: '#fff',
    padding: '16px',
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.87)',
    margin: '-8px',
    fontSize: '1.2rem',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: '0.00938em',
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            {contacts.map((contact, index) => (
              <Paper key={index} style={contact.style}>
                Contact: {contact.name}
                <br />
                Email: {contact.email}
              </Paper>
            ))}
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper style={helpStyle}>
              <h2>Send Help</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget est eu libero
                feugiat malesuada. Nam dictum mauris vitae tincidunt ultrices.
              </p>
              <Button variant="contained" style={{ color: 'blue', backgroundColor: 'lightblue' }}>
                Contact
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper style={chatStyle}>
              <h2>Live Chat</h2>
              <p>
                Welcome to our live chat support. Please enter your message below to start a chat
                with our support team.
              </p>
              <br></br>
              <Button variant="contained" style={{ color: 'blue', backgroundColor: 'lightblue' }}>
                Open live chat
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}