import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import TopBar from './TopBar';
import { Form, FormInput } from "./UI/Form";
import axios from 'axios'
import { Buffer } from 'buffer';

export default function LogIn() {
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  
  function decodeJwt(token) {
    const base64Payload = token.split('.')[1];
    const payloadBuffer = Buffer.from(base64Payload, 'base64');
    const payload = JSON.parse(payloadBuffer.toString('utf8'));
    return payload;
  }

  const handleSave = event => {
    event.preventDefault();
    let request = JSON.stringify({ username, password });
  
    axios.post('http://localhost:5163/api/login', request, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          let data = decodeJwt(JSON.stringify(response.data));
          localStorage.setItem('access-token', JSON.stringify(response.data.accessToken));
          //localStorage.setItem('refresh-token', response);
          localStorage.setItem('username', data[Object.keys(data)[0]]);
          localStorage.setItem('roles', data[Object.keys(data)[3]]);
          localStorage.setItem('id', data[Object.keys(data)[2]]);
          navigate("/home");
        })
        .catch(error => {
          if (error.response) {
            console.log(username);
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
        });
  };


  return (
    <>
      <TopBar title='workIT'
      backButtonDisabled={true}
      />
      <Form
        title='Login'
        submitButtonTitle='Login'
        errorMessage={errorMessage}
        onSubmit={handleSave}
      >
        <FormInput
          onChange={event => {
            setErrorMessage('');
            setUsername(event.target.value);
          }}
          type='text'
          label='Username'
          placeholder='Username'
          name='username'
          value={username}
          errorMessage='Field is required'
          required={true}
        />
        <FormInput
          onChange={event => {
            setErrorMessage('');
            setPassword(event.target.value);
          }}
          type='password'
          label='Password'
          placeholder='Password'
          name='password'
          value={password}
          errorMessage='Field is required'
          required={true}
        />
      </Form>
    </>
  );
};