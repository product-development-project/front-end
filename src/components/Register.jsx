import React, { useState } from "react";
import { Form, FormInput } from './UI/Form';
import { useNavigate } from 'react-router-dom'
import TopBar from './TopBar';
import axios from 'axios'

export default function Register() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSave = (e) => {
        e.preventDefault();

        const request = {
            //name: user.name,
            //surname: user.surname,
            email: user.email,
            username: user.username,
            password: user.password,
        }

        axios
            .post(`http://localhost:5163/api/register`, request, { headers: { 'Content-Type': 'application/json' }})
            .then(() => {
                navigate('/login');
            })
            .catch(error => {
                if (error.response) {
                    console.log(user);
                    console.log(request);
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
            <TopBar title='workIT'
            backButtonDisabled={true}
            />
            <Form
                title='Register'
                submitButtonTitle='Register'
                onSubmit={handleSave}
            >
                {/* <FormInput
                    onChange={handleChange}
                    type='text'
                    label='Name'
                    placeholder='Name'
                    name='name'
                    value={user?.name}
                    errorMessage={user?.name.length > 0 ? 'Name must begint with an upper case letter and only contain letters' : 'Field is required'}
                    required={true}
                    pattern='[A-ZŽĶĻŅČĢŠĪĀĒŪ]{1}[a-zžšķļņģčīāūē\\s]+'
                /> */}
                {/* <FormInput
                    onChange={handleChange}
                    type='text'
                    label='Surname'
                    placeholder='Surname'
                    name='surname'
                    value={user?.surname}
                    errorMessage={user?.surname.length > 0 ? 'Surname must begint with an upper case letter and only contain letters' : 'Field is required'}
                    required={true}
                    pattern='[A-ZŽĶĻŅČĢŠĪĀĒŪ]{1}[a-zžšķļņģčīāūē\\s]+'
                /> */}
                <FormInput
                    onChange={handleChange}
                    type='text'
                    label='Email'
                    placeholder='Email'
                    name='email'
                    value={user?.email}
                    errorMessage={user?.email?.length > 0 ? 'Email is not valid' : 'Field is required'}
                    required={true}
                    pattern='^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$'
                />
                <FormInput
                    onChange={handleChange}
                    type='text'
                    label='Username'
                    placeholder='Username'
                    name='username'
                    value={user?.username}
                    errorMessage={user?.username?.length > 0 ? 'Username must be between 5-20 characters and cannot contain _ and . caracters in front or end' : 'Field is required'}
                    required={true}
                    pattern='^(?=[a-zA-Z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$'
                />
                <FormInput
                    onChange={handleChange}
                    type='password'
                    label='Password'
                    placeholder='Password'
                    name='password'
                    errorMessage={user?.password?.length > 0 ? 'Password must be 8-20 characters long and contain at least one letter, number and special character' : 'Field is required'}
                    required={true}
                    pattern='^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$'
                />
                <FormInput
                    onChange={handleChange}
                    type='password'
                    label='Confirm Password'
                    placeholder='Confirm password'
                    name='confirmPassword'
                    errorMessage={user?.confirmPassword?.length > 0 ? 'Passwords do not match' : 'Field is required'}
                    required={true}
                    pattern={user?.password}
                />
            </Form>
        </>
    );
};