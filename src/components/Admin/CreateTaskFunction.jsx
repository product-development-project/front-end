import Header from '../Header';
import { Button } from '../UI/Button';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.css';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import getBackendApiLink from "../BackEnd";

const backendApiLink = getBackendApiLink();
export default function CreateTask() {
  const navigate = useNavigate();
  const [types, setTypes] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const buffer = reader.result;
      const base64Data = arrayBufferToBase64(buffer);
      setFormData({ ...formData, problem: base64Data });
    };
    reader.readAsArrayBuffer(file);
  };

  function arrayBufferToBase64(buffer) {
    const binary = [];
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.length; i++) {
      binary.push(String.fromCharCode(bytes[i]));
    }
    const base64String = window.btoa(binary.join(''));
    return base64String;
  }


  const tokenWithQuotes = localStorage.getItem('access-token');
  const token = tokenWithQuotes.substring(1, tokenWithQuotes.length - 1);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const [formData, setFormData] = useState({
    name: '',
    problem: '',
    difficulty: '',
    confirmed: false,
    educational: false,
    date: '',
    type_id: ''
  });

  useEffect(() => {
    if (!localStorage.getItem('access-token')) {
      navigate('/');
    }
    fetchExercisesTypes();
  }, [navigate]);

  async function fetchExercisesTypes() {
    let result = await axios.get(backendApiLink + `TaskType`, { headers: { 'Content-Type': 'application/json' } });
    setTypes(JSON.parse(JSON.stringify(result.data)));
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = {
        name: formData.name,
        problem: formData.problem,
        difficulty: formData.difficulty,
        confirmed: formData.confirmed,
        educational: formData.educational,
        type_id: formData.type_id
      };
      let json = JSON.stringify(data);
      const response = await axios.post(backendApiLink + 'Task', json, {
        headers: { 'Content-Type': 'application/json' },
      })
      if (response.status === 201) {
        setOpenSnackbar(true);
        setFormData({
          name: '',
          problem: '',
          difficulty: '',
          confirmed: false,
          educational: false,
          type_id: ''
        });
      }
    } catch (error) {
      setErrorMessage(error.response.data.title);
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
    <div style={{ background: 'linear-gradient(59deg, rgba(23,55,117,1) 0%, rgba(75,100,148,1) 100%)', height: '100vh' }}>
      <Header />
      <table>
        <tr className="row-with-border">
          <td>
            <input type="text" placeholder="Name" name="name" value={formData.name} onChange={handleChange} required />

          </td>
        </tr>
        <tr className="row-with-border">
          <td>
            <input type="file" name="problem" onChange={handleFileChange} accept="" required />
          </td>
        </tr>
        <tr>
          <td>
            <select name="difficulty" value={formData.difficulty} onChange={handleChange} required>
              <option value="">-- Select difficulty --</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>
            <select name="type_id" value={formData.type_id} onChange={handleChange} required>
              <option value="">-- Select type --</option>
              {types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </td>
        </tr>
        <tr>
          <td>
            <label style={{ color: 'black' }}>
              Confirmed:
              <input type="checkbox" name="confirmed" checked={formData.confirmed} onChange={handleChange} />
            </label>
          </td>
        </tr>
        <tr>
          <td>
            <label style={{ color: 'black' }}>
              Educational:
              <input type="checkbox" name="educational" checked={formData.educational} onChange={handleChange} />
            </label>
          </td>
        </tr>
      </table>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button
            value="Create Task"
            name="create-task"
            onClick={handleSubmit}
            style={{ width: '150px' }}
          />
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
            Created successfully!
          </Alert>
        )}
      </Snackbar>
    </div>
  );
};