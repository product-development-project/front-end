import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import TopBar from './TopBar';
import { Form, FormInput } from "./UI/Form";

export default function LogIn() {
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSave = event => {
    event.preventDefault();
  };

  return (
    <>
      <TopBar title='Programming competition website' />
      <Form
        title='Log In'
        submitButtonTitle='Log In'
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