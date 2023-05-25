import Header from '../Header';
import { Button } from '../UI/Button';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.css';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import { Popup } from "../UI/Popup";
import Alert from '@mui/material/Alert';

export default function ApproveTasks() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [approveConfirmIsOpen, setApproveConfirmIsOpen] = useState(false);
  const [helpId, setHelpId] = useState(null);
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

  async function Approve() {
    let response = await axios.put(`http://localhost:5163/api/Admin/Help/` + helpId, { headers: { 'Content-Type': 'application/json' } });
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

  const toggleApprovePopup = (id) => {
    setHelpId(id);
    setApproveConfirmIsOpen(!approveConfirmIsOpen);
  };

  return (
    <div style={{ background: 'linear-gradient(59deg, rgba(23,55,117,1) 0%, rgba(75,100,148,1) 100%)', height: '100%' }}>
      <Header></Header>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email Address</th>
            <th>Phone</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map(help => (
            <tr key={help.id}>
              <td>{help.name}</td>
              <td>{help.emailAddress}</td>
              <td>{help.phone}</td>
              <td>{help.description}</td>
              <td>
                <Button
                  value="Approve"
                  name="approve-help"
                  onClick={() => toggleApprovePopup(help.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button
            value="Back"
            name="back-button"
            onClick={() => {
              navigate(-1)
            }}
            style={{ width: '150px' }}
          />
        </div>
      </div>
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
      {approveConfirmIsOpen &&
        <Popup
          content={<div>Are you sure you want to approve this help?</div>}
          buttons={[
            {
              name: "Confirm",
              onClick: () => {
                Approve();
                toggleApprovePopup();
              }
            },
            {
              name: "Cancel",
              onClick: toggleApprovePopup
            },
          ]}
        />
      }
    </div>
  );
};