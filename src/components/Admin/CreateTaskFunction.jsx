import TopBar from '../TopBar';
import Header from '../Header';
import { Button } from '../UI/Button';
import React, { useState, useEffect } from 'react'
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';
import './style.css';
import axios from 'axios';


export default function CreateTask() {
  const navigate = useNavigate();
  const [types, setTypes] = useState([]);

const handleFileChange = (event) => {
  const file = event.target.files[0];
  const arrayBuffer = file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  const byteString = bytes.toString();
  setFormData({ ...formData, problem: byteString });
};
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
        confirmed: formData.confirmed,
        educational: formData.educational,
        date: formData.date,
        type_id: formData.type_id
      };
      console.log(formData.problem);
      let json = JSON.stringify(data);
      const response = await axios.post('http://localhost:5163/api/Task', json, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(navigate("/home/Admin"));
      console.log(response.data);
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
    <>
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
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
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
              Confirmed:
              <input type="checkbox" name="confirmed" checked={formData.confirmed} onChange={handleChange} />
            </label>
          </td>
        </tr>
        <tr>
          <td>
            <label>
              Educational:
              <input type="checkbox" name="educational" checked={formData.educational} onChange={handleChange} />
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
        <tr>
          <td>
            <Button
                value="Approve"
                name="Add task"
                onClick={handleSubmit}
              />
          </td>
        </tr>
      </table>
    </>
  );
};