import Header from '../Header';
import { Button } from '../UI/Button';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.css';
import axios from 'axios';

export default function CreateTestCaseForTaskForCompany() {
  const navigate = useNavigate();
  const [types, setTypes] = useState([]);
  var parts = window.location.href.split("/");
  var currentTaskId = (parts[parts.length - 2]).toString();

  const tokenWithQuotes = localStorage.getItem('access-token');
  const token = tokenWithQuotes.substring(1, tokenWithQuotes.length - 1);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const [formData, setFormData] = useState({
    data: '',
    result: '',
    example: false
  });

  useEffect(() => {
    if (!localStorage.getItem('access-token')) {
      navigate('/');
    }
    fetchExercisesTypes();
  }, [navigate]);

  async function fetchExercisesTypes() {
    let result = await axios.get(`http://localhost:5163/api/TaskType`, { headers: { 'Content-Type': 'application/json' } });
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
        data: formData.data,
        result: formData.result,
        example: formData.example
      };
      let json = JSON.stringify(data);
      const response = await axios.post('http://localhost:5163/api/Task/' + currentTaskId + '/Result/Company', json, {
        headers: { 'Content-Type': 'application/json' },
      })
        .then(navigate("/home/Company/ViewTasks"));
      setFormData({
        data: '',
        result: '',
        example: false
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
              Data:
              <input type="text" name="data" value={formData.data} onChange={handleChange} required />
            </label>
          </td>
        </tr>
        <tr className="row-with-border">
          <td>
            <label>
              Result:
              <input type="text" name="result" value={formData.result} onChange={handleChange} required />
            </label>
          </td>
        </tr>
        <tr>
          <td>
            <label>
              Is this test case an example?<br></br>
              <input type="checkbox" name="example" checked={formData.example} onChange={handleChange} />
            </label>
          </td>
        </tr>
      </table>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button
            value="Create Test Case"
            name="create-test-case"
            onClick={handleSubmit}
            style={{ width: '200px' }}
          />
        </div>
      </div>
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
    </div>
  );
};