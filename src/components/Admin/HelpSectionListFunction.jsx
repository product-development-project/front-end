import Header from '../Header';
import { Button } from '../UI/Button';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.css';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function ApproveTasks() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('access-token')) {
      navigate('/');
    }
    fetchHelp();
  }, [navigate]);

  const tokenWithQuotes = localStorage.getItem('access-token');
  const token = tokenWithQuotes.substring(1, tokenWithQuotes.length - 1);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  async function fetchHelp() {
    let result = await axios.get(`http://localhost:5163/api/Admin/Help`, { headers: { 'Content-Type': 'application/json' } });
    setData(JSON.parse(JSON.stringify(result.data)));
  };

  async function Approve(Id) {
    let response = await axios.put(`http://localhost:5163/api/Admin/Help/` + Id, { headers: { 'Content-Type': 'application/json' } });
    if (response.status === 200) {
      setOpenSnackbar(true);
      fetchHelp();
    } else {
      setErrorMessage(response.statusText);
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

  return (
    <>
      <Header></Header>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email Address</th>
            <th>Phone</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map(task => (
            <tr key={task.id}>
              <td>{task.name}</td>
              <td>{task.emailAddress}</td>
              <td>{task.phone}</td>
              <td>{task.description}</td>
              <td>
                <Button
                  value="Approve"
                  name="Add task"
                  onClick={() => Approve(task.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
            Approved successfully!
          </Alert>
        )}
      </Snackbar>
    </>
  );
};