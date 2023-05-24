import TopBar from '../TopBar';
import Header from '../Header';
import { Button } from '../UI/Button';
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './style.css';
import axios from 'axios';

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

export default function ViewTestCasesForTaskForCompanyFunction() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [editPopupIsOpen, setEditPopupIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [data, setData] = useState([]);
  const [types, setTypes] = useState([]);
  var parts = window.location.href.split("/");
  var currentTaskId = (parts[parts.length - 3]).toString();
  console.log(currentTaskId);

  let username = localStorage.getItem('username');
  const tokenWithQuotes = localStorage.getItem('access-token');
  const token = tokenWithQuotes.substring(1, tokenWithQuotes.length - 1);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  useEffect(() => {
    if (!localStorage.getItem('access-token')) {
      navigate('/');
    }
    fetchCompanyAds(currentTaskId);
    console.log(data);
  }, [navigate, username]);

  async function fetchCompanyAds(currentTaskId) {
    try {
      let result = await axios.get(`http://localhost:5163/api/Task/${currentTaskId}/Result/GetManyByTaskForCompany`, { headers: { 'Content-Type': 'application/json' } });
      setData(JSON.parse(JSON.stringify(result.data)));
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to fetch data.');
    }
  }

  async function Delete(currentTaskId, deleteItemId) {
    try {
      let result = await axios.delete(`http://localhost:5163/api/Task/${currentTaskId}/Result/${deleteItemId}/Company`, { headers: { 'Content-Type': 'application/json' } });
      console.log('asd');
      window.location.reload();
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to fetch data.');
    }
  }


  return (
    <>
      <Header></Header>
      <table>
        <tr className="border-bottom delayed-animation" style={{ animationDelay: `${50}ms` }}>
          <td>Ad Id</td>
          <td>Data</td>
          <td>Result</td>
          <td></td>
          <td></td>
        </tr>
        {data.map((dataa, index) => (
          <tr key={dataa.id} className="border-bottom delayed-animation" style={{ animationDelay: `${index * 50}ms` }}>
            <td>{dataa.id}</td>
            <td>{dataa.data}</td>
            <td>{dataa.result}</td>
            <td>
              <Button
                value="Edit"
                name="go-to-task"
                onClick={() => navigate(`/home/Company/ViewTasks/Task/${currentTaskId}/TestCase/View/${dataa.id}`)}
              />
            </td>
            <td>
              <Button
                value="Delete"
                name="go-to-task"
                onClick={() => Delete(currentTaskId, dataa.id)} // Set the ID of the item to be deleted
              />
            </td>
          </tr>
        ))}
      </table>
    </>
  );
}
