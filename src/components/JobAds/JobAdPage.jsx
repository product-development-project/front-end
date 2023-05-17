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
    color: theme.palette.text.secondary,
    margin: '10px',
  },
}));

export default function JobAdsPage() {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');
  const [editPopupIsOpen, setEditPopupIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [deletePopupIsOpen, setDeletePopupIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [addata, setAddata] = useState([]);
  const [taskdata, setTaskdata] = useState([]);
  const [pointsdata, setPointsdata] = useState([]);
  const [types, setTypes] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState(1);
  const [currentAdId, setCurrentAdId] = useState(null);
  const username = localStorage.getItem('username');

  const tokenWithQuotes = localStorage.getItem('access-token');
  const token = tokenWithQuotes.substring(1, tokenWithQuotes.length - 1);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  useEffect(() => {
    if (!localStorage.getItem('access-token')) {
      navigate('/');
    }
    setCurrentAdId(getCurrentAdIdFromURL());
    fetchAd(currentAdId);
    fetchTaskForAd(currentAdId);
    fetchPointsForAd(currentAdId, username);
  }, [navigate, currentAdId,username]);

  useEffect(() => {
    setCurrentAdId(getCurrentAdIdFromURL());
    if (currentAdId) {
      fetchAd(currentAdId);
      fetchTaskForAd(currentAdId);
      fetchPointsForAd(currentAdId, username);
    }
  }, [navigate, currentAdId,username]);

  function getCurrentAdIdFromURL() {
    const parts = window.location.href.split('/');
    return parts[parts.length - 1];
  }


  async function fetchAd(adId) {
    try {
        console.log(adId);
      const result = await axios.get(`http://localhost:5163/api/Ad/`+adId, {
        headers: { 'Content-Type': 'application/json' }
      });
      setAddata(JSON.parse(JSON.stringify(result.data)));
      console.log(addata);
    } catch (error) {
      console.log(error);
      setErrorMessage('Failed to fetch data');
    }
  }

  async function fetchTaskForAd(adId){
        try {
      const result = await axios.get(`http://localhost:5163/api/Task/Competition/${adId}`, {
        headers: { 'Content-Type': 'application/json' }
      });
      setTaskdata(JSON.parse(JSON.stringify(result.data)));
      console.log(taskdata);
    } catch (error) {
      console.log(error);
      setErrorMessage('Failed to fetch data');
    }
  }

  async function fetchPointsForAd(adId, username){
            try {
      const result = await axios.get(`http://localhost:5163/api/PointsAd/`+adId+`/`+username, {
        headers: { 'Content-Type': 'application/json' }
      });
      setPointsdata(JSON.parse(JSON.stringify(result.data)));
      console.log(pointsdata);
    } catch (error) {
      console.log(error);
      setErrorMessage('Failed to fetch data');
    }
  }

  
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
                <Paper className={classes.paper}>{addata.description}</Paper>
              </Grid>
              <Grid container spacing={4}>
                <Grid item xs={6} sm={3}>
                  <Paper className={classes.paper} style={{ height: '75%' }}>Correctnes points: {pointsdata.correctnesPoints}</Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Paper className={classes.paper} style={{ height: '75%' }}>Time points: {pointsdata.timePoints}</Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Paper className={classes.paper} style={{ height: '75%' }}>Recourses points: {pointsdata.recourcesPoints}</Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Paper className={classes.paper} style={{ height: '75%' }}>Total points: {pointsdata.totalPoints}</Paper>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            {taskdata.map((item, index) => (
                <Paper key={index} className={classes.paper}>
                    <Button value={item.name} name="go-to-ad" onClick={() => navigate(`/home/ad/${currentAdId}/task/${item.id}`)} style={{ width: '80%' }} />
                </Paper>
            ))}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
