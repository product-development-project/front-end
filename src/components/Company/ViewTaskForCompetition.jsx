import Header from '../Header';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.css';
import axios from 'axios';
import Table from '../Exercises/OrderedTable';

export default function ViewTaskForCompetitionFunction() {
    const navigate = useNavigate();
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
        fetchExercises(username, currentId);
        fetchExercisesTypes();
    }, [navigate, username, currentId]);


    async function fetchExercises(username, currentId) {
        let result = await axios.get(`http://localhost:5163/api/Task/Competition/` + currentId, { headers: { 'Content-Type': 'application/json' } })
        setData(JSON.parse(JSON.stringify(result.data)));
    }

    async function fetchExercisesTypes() {
        let result = await axios.get(`http://localhost:5163/api/TaskType`, { headers: { 'Content-Type': 'application/json' } })
        setTypes(JSON.parse(JSON.stringify(result.data)));
    }

    return (
        <>
            <Header></Header>
            <div className='Exercises'>
                <Table data={data} types={types} navigate={navigate} />
            </div>
        </>
    );
};