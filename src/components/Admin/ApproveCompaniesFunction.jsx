import Header from '../Header';
import { Button } from '../UI/Button';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.css';
import axios from 'axios';

export default function ApproveCompanies() {
  const navigate = useNavigate();
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
    let result = await axios.get(`http://localhost:5163/api/Admin/Company`, { headers: { 'Content-Type': 'application/json' } });
    setData(JSON.parse(JSON.stringify(result.data)));
    console.log(result.data);
  }

  async function Approve(username) {
    let result2 = await axios.put(`http://localhost:5163/api/ChangeRoleCompany/` + username, { headers: { 'Content-Type': 'application/json' } });
    fetchUsers();
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Button
                  value="Approve"
                  name="Add task"
                  onClick={() => Approve(user.name)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </>
  );
};