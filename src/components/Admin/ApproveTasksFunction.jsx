import Header from '../Header';
import { Button } from '../UI/Button';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.css';
import { Popup } from "../UI/Popup";
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

export default function ApproveTasks() {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [approveConfirmIsOpen, setApproveConfirmIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [taskId, setTaskId] = useState(null);
  const [types, setTypes] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('access-token')) {
      navigate('/');
    }
    fetchTasks();
    fetchExercisesTypes();
  }, [navigate]);

  const tokenWithQuotes = localStorage.getItem('access-token');
  const token = tokenWithQuotes.substring(1, tokenWithQuotes.length - 1);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  async function fetchTasks() {
    let result = await axios.get(`http://localhost:5163/api/Admin/Task`, { headers: { 'Content-Type': 'application/json' } });
    setData(JSON.parse(JSON.stringify(result.data)));
  };

  async function fetchExercisesTypes() {
    let result = await axios.get(`http://localhost:5163/api/TaskType`, { headers: { 'Content-Type': 'application/json' } })
    setTypes(JSON.parse(JSON.stringify(result.data)));
  };

  async function Approve() {
    let response = await axios.put(`http://localhost:5163/api/Admin/Task/` + taskId, { headers: { 'Content-Type': 'application/json' } });
    if (response.status === 200) {
      setOpenSnackbar(true);
      fetchTasks();
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
    setTaskId(id);
    setApproveConfirmIsOpen(!approveConfirmIsOpen);
  };

  return (
    <div style={{ background: 'linear-gradient(59deg, rgba(23,55,117,1) 0%, rgba(75,100,148,1) 100%)', height: '100vh' }}>
      <Header></Header>
      <table>
        <thead>
          <tr>
            <th>Task name</th>
            <th>Difficulty</th>
            <th>Type</th>
            <th>Creation Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map(task => (
            <tr key={task.id}>
              <td>{task.name}</td>
              <td>{task.difficulty}</td>
              <td>{types.find(t => t.id === task.type_id)?.name}</td>
              <td>{formatDate(task.date)}</td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Button
                    value="View Task"
                    name="view-task"
                    onClick={() => navigate(`/home/task/${task.id}`)}
                  />
                  <Button
                    value="Approve"
                    name="approve-task"
                    onClick={() => toggleApprovePopup(task.id)}
                  />
                </div>
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
          content={<div>Are you sure you want to approve this task?</div>}
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