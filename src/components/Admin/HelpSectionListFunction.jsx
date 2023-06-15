import Header from '../Header';
import { Button } from '../UI/Button';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.css';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import { Popup } from "../UI/Popup";
import Alert from '@mui/material/Alert';
import getBackendApiLink from "../BackEnd";

const backendApiLink = getBackendApiLink();
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
    let result = await axios.get(backendApiLink + `Admin/Help`, { headers: { 'Content-Type': 'application/json' } });
    setData(JSON.parse(JSON.stringify(result.data)));
  };

  async function Approve() {
    let response = await axios.put(backendApiLink + `Admin/Help/` + helpId, { headers: { 'Content-Type': 'application/json' } });
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
    <div style={{ background: 'linear-gradient(59deg, rgba(23,55,117,1) 0%, rgba(75,100,148,1) 100%)', height: '100vh' }}>
      <Header></Header>
      <table>
        <thead>
          <tr
            className="border-bottom delayed-animation"
            style={{ animationDelay: `${50}ms`, color: 'rgb(211, 209, 209)' }}
          >
            <td>Name</td>
            <td>Email Address</td>
            <td>Phone</td>
            <td>Description</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {data.map((help, index) => (
            <tr key={help.id}
              className='delayed-animation'
              style={{ animationDelay: `${index * 50}ms` }}>
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