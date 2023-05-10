import React, { useEffect, useState } from "react";
import { Form, FormInput } from '../UI/Form';
import TopBar from "../TopBar";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export default function ProfileForm({ onClose }) {
    let username = localStorage.getItem('username')
    const [data, setData] = useState([]);
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        fetchUserInfo(username);
    });

    async function fetchUserInfo(username)
    {
        let result = await axios.get(`http://localhost:5163/api/User/${username}`, { headers: { 'Content-Type': 'application/json'}})
        setData(JSON.parse(JSON.stringify(result.data)));
    }
    
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSave = (e) => {
        e.preventDefault();
        let request = {
                name: user.name,
                email: user.email,
                username: user.username,
                phoneNumber: user.phoneNumber
            }
            axios
            .put(`http://localhost:5163/api/User/${user.username}`, request, { headers: { 'Content-Type': 'application/json' } })
            .then((result) => {
                onClose();
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
        }

    return (
        <>
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
                    type='text'
                    label='Name'
                    placeholder='Name'
                    name='name'
                    value={data?.name}
                    errorMessage={data?.name?.length > 0 ? 'Name must begin with an upper case letter and only contain letters' :'Field is required'}
                    required={true}
                    pattern='[A-ZŽĶĻŅČĢŠĪĀĒŪ]{1}[a-zžšķļņģčīāūē\\s]+'
                />
                <FormInput
                    onChange={handleChange}
                    type='text'
                    label='Surname'
                    placeholder='Surname'
                    name='surname'
                    value={data?.surname}
                    errorMessage={data?.surname?.length > 0 ? 'Surname must begin with an upper case letter and only contain letters' :'Field is required'}
                    required={true}
                    pattern='[A-ZŽĶĻŅČĢŠĪĀĒŪ]{1}[a-zžšķļņģčīāūē\\s]+'
                />
                <FormInput
                    onChange={handleChange}
                    type='text'
                    label='Email'
                    placeholder='Email'
                    name='email'
                    value={data?.email}
                    errorMessage={data?.email?.length > 0 ? 'Email is not valid' : 'Field is required'}
                    required={true}
                    pattern='^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$'
                />
                <FormInput
                    onChange={handleChange}
                    type='text'
                    label='Phone number'
                    placeholder='Phone number'
                    name='phoneNumber'
                    value={data?.phoneNumber}
                    errorMessage='Field is required'
                    required={true}
                />
            </Form>
        </>
    );
}