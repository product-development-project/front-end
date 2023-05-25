import Header from '../Header';
import { Button } from '../UI/Button';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.css';
import axios from 'axios';

export default function CreateTaskForCompany() {
  const navigate = useNavigate();
  const [types, setTypes] = useState([]);

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
    date: new Date().toISOString().substr(0, 10),
    type_id: ''
  });

  useEffect(() => {
    if (!localStorage.getItem('access-token')) {
      navigate('/');
    }
    fetchExercisesTypes();
  }, [navigate]);

  async function fetchExercisesTypes() {
    let result = await axios.get(`http://localhost:5163/api/TaskType`, { headers: { 'Content-Type': 'application/json'}});
    setTypes(JSON.parse(JSON.stringify(result.data)));
  }

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
        confirmed: false,
        educational: false,
        date: formData.date,
        type_id: formData.type_id
      };
      let json = JSON.stringify(data);
      const response = await axios.post('http://localhost:5163/api/Task/Company', json, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(navigate(-1));
      setFormData({
        name: '',
        problem: '',
        difficulty: '',
        confirmed: false,
        educational: false,
        date: '',
        type_id: ''
      });
    } catch (error) {
      console.error(error);
    }
  };
    return (
      <div style={{ background: 'linear-gradient(59deg, rgba(23,55,117,1) 0%, rgba(75,100,148,1) 100%)', height: '100vh' }}>
      <Header />
      <table>
        <tr className="row-with-border">
          <td>
            <label>
              Name:
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>
          </td>
        </tr>
        <tr className="row-with-border">
          <td>
            <label>
                Problem:
                <input type="file" name="problem" onChange={handleFileChange} accept="" required />
            </label>
          </td>
        </tr>
        <tr>
          <td>
            <label>
              Difficulty:
              <select name="difficulty" value={formData.difficulty} onChange={handleChange} required>
                <option value="">-- Select difficulty --</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </label>
          </td>
        </tr>
        <tr>
          <td>
            <label>
              Type:
              <select name="type_id" value={formData.type_id} onChange={handleChange} required>
                <option value="">-- Select type --</option>
                {types.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </label>
          </td>
        </tr>
        <tr>
          <td>
            <label>
              Date:
              <input type="date" name="date" value={formData.date} onChange={handleChange} required />
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
    </div>
  );
};