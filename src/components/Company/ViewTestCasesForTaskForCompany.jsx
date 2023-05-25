import Header from '../Header';
import { Button } from '../UI/Button';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import axios from 'axios';
import { Popup } from "../UI/Popup";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function ViewTestCasesForTaskForCompanyFunction() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [deleteConfirmIsOpen, setDeleteConfirmIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [deleteItemId, setDeleteItemId] = useState(null);
  var parts = window.location.href.split("/");
  var currentTaskId = (parts[parts.length - 3]).toString();

  let username = localStorage.getItem('username');
  const tokenWithQuotes = localStorage.getItem('access-token');
  const token = tokenWithQuotes.substring(1, tokenWithQuotes.length - 1);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  useEffect(() => {
    if (!localStorage.getItem('access-token')) {
      navigate('/');
    }
    fetchCompanyAds(currentTaskId);
  }, [navigate, username]);

  async function fetchCompanyAds(currentTaskId) {
    try {
      let result = await axios.get(`http://localhost:5163/api/Task/${currentTaskId}/Result/GetManyByTaskForCompany`, { headers: { 'Content-Type': 'application/json' } });
      setData(JSON.parse(JSON.stringify(result.data)));
    } catch (error) {
    }
  };

  async function Delete() {
    try {
      let result = await axios.delete(`http://localhost:5163/api/Task/${currentTaskId}/Result/${deleteItemId}/Company`, { headers: { 'Content-Type': 'application/json' } });
      if (result.status === 204) {
        fetchCompanyAds(currentTaskId);
        setOpenSnackbar(true);
      } else {
        setErrorMessage(result.statusText);
        setOpenSnackbar(true);
      }
    } catch (error) {
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
    setErrorMessage('');
  };

  const toggleDeletePopup = (id) => {
    setDeleteItemId(id);
    setDeleteConfirmIsOpen(!deleteConfirmIsOpen);
  };

  return (
    <>
      <Header></Header>
      <table>
        <tr className="border-bottom delayed-animation" style={{ animationDelay: `${50}ms` }}>
          <td>Data</td>
          <td>Result</td>
          <td>Action</td>
        </tr>
        {data.map((dataa, index) => (
          <tr key={dataa.id} className="border-bottom delayed-animation" style={{ animationDelay: `${index * 50}ms` }}>
            <td>{dataa.data}</td>
            <td>{dataa.result}</td>
            <td>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button
                  value="Edit"
                  name="go-to-task"
                  onClick={() => navigate(`/home/Company/ViewTasks/Task/${currentTaskId}/TestCase/View/${dataa.id}`)}
                />
                <Button
                  value="Delete"
                  name="go-to-task"
                  onClick={() => toggleDeletePopup(dataa.id)}
                />
              </div>
            </td>
          </tr>
        ))}
      </table>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button
            value="Back"
            name="back-button"
            onClick={() => {
              navigate(-1)
            }}
            style={{ width: '200px' }}
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
            Deleted successfully!
          </Alert>
        )}
      </Snackbar>
      {deleteConfirmIsOpen &&
        <Popup
          content={<div>Are you sure you want to delete this Test Case?</div>}
          buttons={[
            {
              name: "Confirm",
              onClick: () => {
                Delete();
                toggleDeletePopup();
              }
            },
            {
              name: "Cancel",
              onClick: toggleDeletePopup
            },
          ]}
        />
      }
    </>
  );
}
