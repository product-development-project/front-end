import React, { useEffect, useState } from "react";
import { Form, FormInput } from '../UI/Form';
import TopBar from "../TopBar";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { Button } from "@material-ui/core";

export default function ProfileForm({ onClose }) {
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [client, setClient] = useState(null);

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSave = (e) => {
        e.preventDefault();
        let request = {
                iata: user.iata,
                icao: user.icao,
                callsign: user.callsign,
                country: user.country,
                name: user.name,
                email: user.email,
                username: user.username,
                password: user.password,
            }
            axios
            .put(`http://localhost:5163/api/profile/edit/${user.id}`, request, { headers: { 'Content-Type': 'application/json' } })
            .then((result) => {
                localStorage.setItem('user', JSON.stringify(result.data));
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
                    //value={user?.name}
                    //errorMessage={user?.name.length > 0 ? 'Name must begin with an upper case letter and only contain letters' :'Field is required'}
                    required={true}
                    pattern='[A-ZŽĶĻŅČĢŠĪĀĒŪ]{1}[a-zžšķļņģčīāūē\\s]+'
                />
                <FormInput
                    onChange={handleChange}
                    type='text'
                    label='Surname'
                    placeholder='Surname'
                    name='surname'
                    //value={user?.surname}
                    //errorMessage={user?.surname.length > 0 ? 'Surname must begin with an upper case letter and only contain letters' :'Field is required'}
                    required={true}
                    pattern='[A-ZŽĶĻŅČĢŠĪĀĒŪ]{1}[a-zžšķļņģčīāūē\\s]+'
                />
                <FormInput
                    onChange={handleChange}
                    type='text'
                    label='Email'
                    placeholder='Email'
                    name='email'
                    //value={user?.email}
                    //errorMessage={user?.email?.length > 0 ? 'Email is not valid' : 'Field is required'}
                    required={true}
                    pattern='^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$'
                />
                <FormInput
                    onChange={handleChange}
                    type='text'
                    label='Phone number'
                    placeholder='Phone number'
                    name='phoneNumber'
                    //value={user?.phoneNumber}
                    errorMessage='Field is required'
                    required={true}
                />
            </Form>
            
            <Button
            onClick={onClose}
            style={{
                width: '400px',
                fontSize: '400px'

            }}>
                Cancel

            </Button>
        </>
    );
}