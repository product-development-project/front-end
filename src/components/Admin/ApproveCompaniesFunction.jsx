import Header from '../Header';
import { Button } from '../UI/Button';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.css';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function ApproveCompanies() {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem('access-token')) {
      navigate('/');
    }
    fetchUsers();
  }, [navigate]);

  const tokenWithQuotes = localStorage.getItem('access-token');
  const token = tokenWithQuotes.substring(1, tokenWithQuotes.length - 1);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  async function fetchUsers() {
    let result = await axios.get(`http://localhost:5163/api/Admin/Company`, { headers: { 'Content-Type': 'application/json' } });
    setData(JSON.parse(JSON.stringify(result.data)));
    console.log(result.data);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  async function Approve(username) {
    let response = await axios.put(`http://localhost:5163/api/ChangeRoleCompany/` + username, { headers: { 'Content-Type': 'application/json' } });
    if (response.status == "200") {
      setOpenSnackbar(true);
    }
    fetchUsers();
  };

  return (
    <>
      <Header></Header>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Button
                  value="Approve"
                  name="Add task"
                  onClick={() => Approve(user.name)}
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
        <Alert onClose={handleCloseSnackbar} severity="success">
          Approved successfully!
        </Alert>
      </Snackbar>
    </>
  );
};