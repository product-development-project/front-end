import Header from '../Header';
import { Button } from '../UI/Button';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.css';
import axios from 'axios';

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

export default function ViewCreatedTasksFunctionForCompany() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [types, setTypes] = useState([]);

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
    let result = await axios.get(`http://localhost:5163/api/Task/ViewCompanyTask`, { headers: { 'Content-Type': 'application/json' } });
    setData(JSON.parse(JSON.stringify(result.data)));
    console.log(result.data);
  }
  async function fetchExercisesTypes() {
    let result = await axios.get(`http://localhost:5163/api/TaskType`, { headers: { 'Content-Type': 'application/json' } })
    setTypes(JSON.parse(JSON.stringify(result.data)));
  }
  return (
    <>
      <Header></Header>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Types</th>
            <th>Date</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map(task => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.name}</td>
              <td>{task.difficulty}</td>
              <td>{types.find(t => t.id === task.type_id)?.name}</td>
              <td>{formatDate(task.date)}</td>
              <td>
                <Button
                  value="Check"
                  name="Add task"
                  onClick={() => navigate(`/home/task/${task.id}`)}
                />
              </td>
              <td>
                <Button
                  value="Add test cases"
                  name="Add task"
                  onClick={() => navigate(`/home/Company/ViewTasks/Task/${task.id}/TestCase`)}
                />
              </td>
              <td>
                <Button
                  value="View test cases"
                  name="Add task"
                  onClick={() => navigate(`/home/Company/ViewTasks/Task/${task.id}/TestCase/View`)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </>
  );
};