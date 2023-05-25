import Header from '../Header';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.css';
import axios from 'axios';
import { Button } from "../UI/Button";

export default function ViewLogged() {
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
        fetchCompanyAdsLogged(currentId);
        fetchExercisesTypes();
    }, [navigate, username, currentId]);


    async function fetchCompanyAdsLogged(currentId) {
        let result = await axios.get(`http://localhost:5163/api/Ad/CompanyAds/` + currentId + `/Logged`, { headers: { 'Content-Type': 'application/json' } })
        setData(JSON.parse(JSON.stringify(result.data)));
    }

    async function fetchExercisesTypes() {
        let result = await axios.get(`http://localhost:5163/api/TaskType`, { headers: { 'Content-Type': 'application/json' } })
        setTypes(JSON.parse(JSON.stringify(result.data)));
    }

    return (
        <div style={{ background: 'linear-gradient(59deg, rgba(23,55,117,1) 0%, rgba(75,100,148,1) 100%)', height: '100vh' }}>
            <Header></Header>
            <div style={{ display: "flex", justifyContent: "flex-start", paddingLeft: "20px", marginBottom: '-45px', paddingTop: '5px' }}>
                <Button
                    value="Back"
                    name="go-back"
                    onClick={() => navigate(-1)}
                />
            </div>
            <table>
                <thead>
                    <tr className="border-bottom delayed-animation" style={{ animationDelay: `${50}ms` }}>
                        <th>Username</th>
                        <th>Points for Correctness</th>
                        <th>Points for RAM Usage</th>
                        <th>Points for CPU Time</th>
                        <th>Total Points</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((userData, index) => (
                        <tr key={index} className="border-bottom delayed-animation" style={{ animationDelay: `${index * 50}ms` }}>
                            <td>{userData.userName}</td>
                            <td>{userData.correctnesPoints}</td>
                            <td>{userData.recourcesPoints}</td>
                            <td>{userData.timePoints}</td>
                            <td>{userData.totalPoints}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};