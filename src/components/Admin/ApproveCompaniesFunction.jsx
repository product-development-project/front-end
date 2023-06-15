import Header from '../Header';
import { Button } from '../UI/Button';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.css';
import axios from 'axios';
import { Popup } from "../UI/Popup";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import getBackendApiLink from "../BackEnd";

const backendApiLink = getBackendApiLink();
export default function ApproveCompanies() {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [approveConfirmIsOpen, setApproveConfirmIsOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
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
    let result = await axios.get(backendApiLink + `Admin/Company`, { headers: { 'Content-Type': 'application/json' } });
    setData(JSON.parse(JSON.stringify(result.data)));
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  async function Approve() {
    let response = await axios.put(backendApiLink + `ChangeRoleCompany/` + username, { headers: { 'Content-Type': 'application/json' } });
    if (response.status === 200) {
      setOpenSnackbar(true);
      fetchUsers();
    } else {
      setErrorMessage(response.statusText);
      setOpenSnackbar(true);
    }
  };

  const toggleApprovePopup = (username) => {
    setUsername(username);
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
            <td>Username</td>
            <td>Email</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={user.id}
              className='delayed-animation'
              style={{ animationDelay: `${index * 50}ms` }}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Button
                  value="Promote"
                  name="approve-company"
                  onClick={() => toggleApprovePopup(user.name)}
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
            Promoted successfully!
          </Alert>
        )}
      </Snackbar>
      {approveConfirmIsOpen &&
        <Popup
          content={<div>Are you sure you want to promote this user to company delegate?</div>}
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