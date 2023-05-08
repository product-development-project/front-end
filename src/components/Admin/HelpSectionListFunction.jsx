import TopBar from '../TopBar';
import Header from '../Header';
import { Button } from '../UI/Button';
import React, { useState, useEffect } from 'react'
import Footer from '../Footer';
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

export default function ApproveTasks() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [types, setTypes] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem('access-token')) {
            navigate('/');
        }
        fetchHelp();
    }, [navigate]);


    const tokenWithQuotes = localStorage.getItem('access-token');
    const token = tokenWithQuotes.substring(1, tokenWithQuotes.length - 1);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    async function fetchHelp() 
    {
        let result = await axios.get(`http://localhost:5163/api/Admin/Help`, { headers: { 'Content-Type': 'application/json'}});
        setData(JSON.parse(JSON.stringify(result.data)));
        console.log(result.data);
    }
    async function Approve(Id)
    {
        
        const confirmed = window.confirm("Are you sure you want to approve this help?");
        if (confirmed) {
            let result2 = await axios.put(`http://localhost:5163/api/Admin/Help/` + Id, { headers: { 'Content-Type': 'application/json'}});
            fetchHelp();
        }
    }
    return (
        <>
        <Header></Header>


         <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email Address</th>
            <th>Phone</th>
            <th>Description</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map(task => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.name}</td>
              <td>{task.emailAddress}</td>
              <td>{task.phone}</td>
              <td>{task.description}</td>
              <td>
                <Button
                value="Approve"
                name="Add task"
                onClick={() => Approve(task.id)}
              />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </>
    );
};