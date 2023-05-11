import TopBar from '../TopBar';
import Header from '../Header';
import { Button } from '../UI/Button';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.css';
import axios from 'axios';

const tokenWithQuotes = localStorage.getItem('access-token');
const token = tokenWithQuotes ? tokenWithQuotes.substring(1, tokenWithQuotes.length - 1) : null;

if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer${token}`;
}

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
export default function AddTaskForCompetitionFunction() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [types, setTypes] = useState([]);
  var parts = window.location.href.split("/");
  var currentId = (parts[parts.length - 1]).toString();
  const [result, setResult] = useState([]);
  let username = localStorage.getItem('username')
  const tokenWithQuotes = localStorage.getItem('access-token');
  const token = tokenWithQuotes.substring(1, tokenWithQuotes.length - 1);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  useEffect(() => {
    if (!localStorage.getItem('access-token')) {
      navigate('/');
    }
    fetchExercises(username, currentId);
    fetchExercisesTypes();
  }, [navigate, username, currentId]);

  async function fetchExercises(username, currentId) {
    let result = await axios.get(`http://localhost:5163/api/Task`, { headers: { 'Content-Type': 'application/json' } });
    setData(JSON.parse(JSON.stringify(result.data)));
  }

  async function fetchExercisesTypes() {
    let result = await axios.get(`http://localhost:5163/api/TaskType`, { headers: { 'Content-Type': 'application/json' } });
    setTypes(JSON.parse(JSON.stringify(result.data)));
  }

  async function addTask(task) {
    try {
      const result = await axios.post(
        `http://localhost:5163/api/Task/AddTaskCompetition/${task}/${currentId}`,
        {},
        { headers: { 'Content-Type': 'application/json' } }
      );
      setResult(result);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Header />
      <div className='Exercises'>
        {data.map((task, index) => (
          <tr key={task.id} className="border-bottom delayed-animation" style={{ animationDelay: `${index * 60}ms` }}>
            <td>{task.id}</td>
            <td>{task.name}</td>
            <td className={`difficulty ${task.difficulty.toLowerCase()}`}>{task.difficulty}</td>
            <td>{types.find(t => t.id === task.type_id)?.name}</td>
            <td>
              <Button
                value="Try out"
                name="go-to-task"
                onClick={() => navigate(`/home/task/${task.id}`)}
              />
            </td>
            <td>
              <Button
                value="Add"
                name="Add task"
                onClick={() => addTask(task.id)}
              />
            </td>
          </tr>
        ))}
      </div>
    </>
  );
};