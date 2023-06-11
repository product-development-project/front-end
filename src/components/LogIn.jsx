import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    setErrorMessage("");
  }, []);

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
        let user = JSON.parse(JSON.stringify(response.data))
        let data = decodeJwt(JSON.stringify(response.data));
        localStorage.setItem('access-token', JSON.stringify(user.accessToken));
        localStorage.setItem('username', data[Object.keys(data)[0]]);
        localStorage.setItem('roles', data[Object.keys(data)[3]]);
        localStorage.setItem('id', data[Object.keys(data)[2]]);
        navigate("/home");
      })
      .catch(error => {
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
      });
  };

  return (
    <div style={{ background: 'linear-gradient(59deg, rgba(23,55,117,1) 0%, rgba(75,100,148,1) 100%)', height: '100vh' }}>
      <TopBar title='workIT'
        backButtonDisabled={true}
      />
      <Form
        title='Login'
        submitButtonTitle='Login'
        backButtonTitle={'Back'}
        onBack={() => navigate(-1)}
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
          required={true}
        />
      </Form>
    </div>
  );
};