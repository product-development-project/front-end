import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormInput } from '../UI/Form';
import TopBar from "../TopBar";
import axios from 'axios';
import { Button } from "react-bootstrap";

export default function ProfileForm() {
    let username = localStorage.getItem('username')
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    console.log(user);

    useEffect(() => {
        fetchUserInfo(username);
    }, [navigate]);

    async function fetchUserInfo(username) {
        let result = await axios.get(`http://localhost:5163/api/User/${username}`, { headers: { 'Content-Type': 'application/json' } })
        setUser(JSON.parse(JSON.stringify(result.data)));
    };

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    };

    const handleSave = (e) => {
        e.preventDefault();
        let request = {
            email: user.email,
            name: user.name,
            phoneNumber: user.phoneNumber
        }
        axios
            .put(`http://localhost:5163/api/User/${username}`, request, { headers: { 'Content-Type': 'application/json' } })
            .then((result) => {
                navigate(-1);
            })
            .catch((error) => {
                if (error.response) {
                    console.warn(error.response.data);
                    setErrorMessage(error.response.data);
                } else if (error.request) {
                    console.warn('Request failed:', error.request);
                    setErrorMessage('Request failed');
                } else {
                    console.warn('Error:', error.message);
                    setErrorMessage(error.message);
                }
            })
    };

    return (
        <div style={{ background: 'linear-gradient(59deg, rgba(23,55,117,1) 0%, rgba(75,100,148,1) 100%)', height: '100vh' }}>

            <TopBar
                title='workIT'
                backButtonDisabled={true} />
            <Form
                title={'Edit profile'}
                submitButtonTitle={'Save'}
                onSubmit={handleSave}
            >
                <FormInput
                    onChange={handleChange}
                    type="text"
                    label="username"
                    placeholder="Username"
                    name="name"
                    value={user?.name}
                    errorMessage={user?.name?.length < 0 ? 'Field is required' : ''}
                    required={true}
                />
                <FormInput
                    onChange={handleChange}
                    type="text"
                    label="Email"
                    placeholder="Email"
                    name="email"
                    value={user?.email}
                    errorMessage={user?.email?.length < 0 ? 'Field is required' : ''}
                    required={true}
                    pattern="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"
                />
                <FormInput
                    onChange={handleChange}
                    type="text"
                    label="Phone number"
                    placeholder="Phone number"
                    name="phoneNumber"
                    value={user?.phoneNumber}
                    errorMessage={user?.phoneNumber?.length < 0 ? 'Field is required' : ''}
                    required={true}
                />
            </Form>
            <center style={{ paddingLeft: '60px', paddingRight: '60px', marginTop: '-200px'}}>
                <Button
                    id="submitButton"
                    value="Back"
                    name="back-button"
                    onClick={() => navigate(-1)}
                >Back</Button>
            </center>
        </div>
    );
}