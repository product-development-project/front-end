import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import axios from 'axios';
import '../JobAds/style.css';
import { Button } from '../UI/Button';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'black',
    margin: '10px',
  },
}));

export default function JobAdsPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [addata, setAddata] = useState([]);
  const [taskdata, setTaskdata] = useState([]);
  const [pointsdata, setPointsdata] = useState([]);
  const [currentAdId, setCurrentAdId] = useState(null);
  const [loggedUser, setLoggedUser] = useState([]);
  const username = localStorage.getItem('username');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const tokenWithQuotes = localStorage.getItem('access-token');
  const token = tokenWithQuotes.substring(1, tokenWithQuotes.length - 1);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  let userId = localStorage.getItem('id');
  let role = localStorage.getItem('roles');
  const currentDate = new Date();

  useEffect(() => {
    if (!localStorage.getItem('access-token')) {
      navigate('/');
    }
    setCurrentAdId(getCurrentAdIdFromURL());
    fetchAd(currentAdId);
    fetchTaskForAd(currentAdId);
    fetchPointsForAd(currentAdId, username);
  }, [navigate, currentAdId, username]);

  useEffect(() => {
    setCurrentAdId(getCurrentAdIdFromURL());
    if (currentAdId) {
      if (userId) {
        fetchLogged();
      }
      fetchAd(currentAdId);
      fetchTaskForAd(currentAdId);
      fetchPointsForAd(currentAdId, username);
    }
  }, [navigate, currentAdId, username]);

  function getCurrentAdIdFromURL() {
    const parts = window.location.href.split('/');
    return parts[parts.length - 1];
  }

  async function fetchAd(adId) {
    try {
      const result = await axios.get(`http://localhost:5163/api/Ad/` + adId, {
        headers: { 'Content-Type': 'application/json' }
      });
      setAddata(JSON.parse(JSON.stringify(result.data)));
    } catch (error) {
      // setErrorMessage('Failed to fetch data');
      // setOpenSnackbar(true);
    }
  }

  async function fetchTaskForAd(adId) {
    try {
      const result = await axios.get(`http://localhost:5163/api/Task/Competition/${adId}`, {
        headers: { 'Content-Type': 'application/json' }
      });
      setTaskdata(JSON.parse(JSON.stringify(result.data)));
    } catch (error) {
      // setErrorMessage('Failed to fetch data');
      // setOpenSnackbar(true);
    }
  }

  async function fetchPointsForAd(adId, username) {
    try {
      const result = await axios.get(`http://localhost:5163/api/PointsAd/` + adId + `/` + username, {
        headers: { 'Content-Type': 'application/json' }
      });
      setPointsdata(JSON.parse(JSON.stringify(result.data)));
    } catch (error) {
      // setErrorMessage('Failed to fetch data');
      // setOpenSnackbar(true);
    }
  }

  async function fetchLogged() {
    try {
      const result = await axios.get(`http://localhost:5163/api/Logged/ad/${currentAdId}/user/${userId}`, {
        headers: { 'Content-Type': 'application/json' }
      });
      setLoggedUser(JSON.parse(JSON.stringify(result.data)));
    } catch (error) {
      // setErrorMessage('Failed to fetch data');
      // setOpenSnackbar(true);
    }
  }

  const handleSubmit = async () => {
    try {
      const data = {
        ad_id: currentAdId,
      };
      let json = JSON.stringify(data);
      const response = await axios.post('http://localhost:5163/api/Logged', json, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.status === 201 || response.status === 201) {
        setOpenSnackbar(true);
      } else {
        setErrorMessage(response.statusText);
        setOpenSnackbar(true);
      }
    } catch (error) {
      setErrorMessage(error);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
    setErrorMessage('');
  };

  const classes = useStyles();
  return (
    <>
      <Header />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <Paper className={classes.paper}>Ad name: {addata.name}</Paper>
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Paper className={classes.paper}>Start date: {formatDate(addata.start)}</Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper className={classes.paper}>End date: {formatDate(addata.end)}</Paper>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Paper className={classes.paper}>Description: {addata.description}</Paper>
              </Grid>
              {
                role.includes("User") ?
                  <Grid container spacing={4} justifyContent="flex-end">
                    <Grid item xs={6} sm={3}>
                      <Paper className={classes.paper} style={{ height: '45%' }}>Correctnes points: {pointsdata.correctnesPoints}</Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Paper className={classes.paper} style={{ height: '45%' }}>Time points: {pointsdata.timePoints}</Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Paper className={classes.paper} style={{ height: '45%' }}>Recourses points: {pointsdata.recourcesPoints}</Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Paper className={classes.paper} style={{ height: '45%' }}>Total points: {pointsdata.totalPoints}</Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Button
                        value="Register for Competition"
                        name="register-for-competition-button"
                        onClick={() => handleSubmit()}
                        style={{
                          float: 'right'
                        }}
                      />
                      <Button
                        value="Back"
                        name="back-button"
                        onClick={() => {
                          navigate(-1)
                        }}
                        style={{
                          float: 'right',
                          width: '245px'
                        }}
                      />
                    </Grid>
                  </Grid>
                  :
                  <>
                    <Grid container spacing={4} justifyContent="flex-end">
                      <Grid item xs={6} sm={3}>
                        <Button
                          value="Back"
                          name="back-button"
                          onClick={() => {
                            navigate(-1)
                          }}
                          style={{
                            float: 'right',
                            width: '245px'
                          }}
                        />
                      </Grid>
                    </Grid>
                  </>
              }
            </Box>
          </Grid>
          {role.includes("Company") || role.includes("Admin") || (role.includes("User") && currentDate >= new Date(formatDate(addata.start)) && loggedUser.ad_id !== undefined && currentAdId === loggedUser.ad_id.toString()) ?
            <Grid item xs={12} sm={4}>
              {taskdata.map((item, index) => (
                <Paper key={index} className={classes.paper}>
                  <Button value={item.name} name="go-to-ad" onClick={() => navigate(`/home/ad/${currentAdId}/task/${item.id}`)} style={{ width: '80%' }} />
                </Paper>
              ))}
            </Grid>
            :
            <>
            </>
          }
        </Grid>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        {errorMessage ? (
          <Alert onClose={handleCloseSnackbar} severity="error">
            {errorMessage}
          </Alert>
        ) : (
          <Alert onClose={handleCloseSnackbar} severity="success">
            Registered successfully!
          </Alert>
        )}
      </Snackbar>
    </>
  );
}
