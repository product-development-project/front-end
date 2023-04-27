import TopBar from '../TopBar';
import Header from '../Header';
import { Button } from '../UI/Button';
import React, { useState, useEffect } from 'react'
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';
import './style.css';
import axios from 'axios';


export default function ViewAds() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [editPopupIsOpen, setEditPopupIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [deletePopupIsOpen, setDeletePopupIsOpen] = useState(false);
    const [data, setData] = useState([]);
    const [types, setTypes] = useState([]);


    let username = localStorage.getItem('username')
    const tokenWithQuotes = localStorage.getItem('access-token');
    const token = tokenWithQuotes.substring(1, tokenWithQuotes.length - 1);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    useEffect(() => {
        if (!localStorage.getItem('access-token')) {
            navigate('/');
        }
        fetchCompanyAds(username);
        fetchExercisesTypes();
        console.log(data);
    }, [navigate, username]);
    
    async function fetchCompanyAds(username)
    {
        let result = await axios.get(`http://localhost:5163/api/Ad/CompanyAds`, { headers: { 'Content-Type': 'application/json'}})
        setData(JSON.parse(JSON.stringify(result.data)));
    }

      async function fetchExercisesTypes()
  {
        let result = await axios.get(`http://localhost:5163/api/TaskType`, { headers: { 'Content-Type': 'application/json'}})
        setTypes(JSON.parse(JSON.stringify(result.data)));
  }

    return (
        <>
        <Header></Header>
        <table>
            {data.map((dataa, index) => (
                <tr key={dataa.id} className="border-bottom delayed-animation" style={{animationDelay: `${index * 50}ms`}}>
                    <td>{dataa.id}</td>
                    <td>{dataa.name}</td>
                    <td>{dataa.start}</td>
                    <td>{dataa.end}</td>
                    <td>
                        <Button
                            value="View LoggedUsers"
                            name="go-to-task"
                            onClick={() => navigate(`/home/Company/ViewAds/${dataa.id}`)}
                        />
                    </td>
                </tr>
            ))}
        </table>
        <Footer>
        </Footer>
        </>
    );
};