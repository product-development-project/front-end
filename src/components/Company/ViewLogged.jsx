import Header from '../Header';
import { Button } from '../UI/Button';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.css';
import axios from 'axios';

export default function ViewLogged() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [editPopupIsOpen, setEditPopupIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [deletePopupIsOpen, setDeletePopupIsOpen] = useState(false);
    const [data, setData] = useState([]);
    const [types, setTypes] = useState([]);
    var parts = window.location.href.split("/");
    var currentId = (parts[parts.length - 1]).toString();

    let username = localStorage.getItem('username')
    const tokenWithQuotes = localStorage.getItem('access-token');
    const token = tokenWithQuotes.substring(1, tokenWithQuotes.length - 1);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    useEffect(() => {
        if (!localStorage.getItem('access-token')) {
            navigate('/');
        }
        fetchCompanyAdsLogged(username, currentId);
        fetchExercisesTypes();
    }, [navigate, username, currentId]);


    async function fetchCompanyAdsLogged(username, currentId) {
        let result = await axios.get(`http://localhost:5163/api/Ad/CompanyAds/` + currentId + `/Logged`, { headers: { 'Content-Type': 'application/json' } })
        setData(JSON.parse(JSON.stringify(result.data)));
    }

    async function fetchExercisesTypes() {
        let result = await axios.get(`http://localhost:5163/api/TaskType`, { headers: { 'Content-Type': 'application/json' } })
        setTypes(JSON.parse(JSON.stringify(result.data)));
    }

    return (
        <>
            <Header></Header>
            <table>
                {data.map((dataa, index) => (
                    <tr key={index} className="border-bottom delayed-animation" style={{ animationDelay: `${index * 50}ms` }}>
                        <td>{dataa.userName}</td>
                        <td>{dataa.correctnesPoints}</td>
                        <td>{dataa.recourcesPoints}</td>
                        <td>{dataa.timePoints}</td>
                        <td>{dataa.totalPoints}</td>
                    </tr>
                ))}
            </table>
        </>
    );
};