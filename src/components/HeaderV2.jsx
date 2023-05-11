import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from './UI/Button';
import TopBar from './TopBar';

export default function HeaderV2(props) {
  const navigate = useNavigate();

  return (
    <TopBar
      title='workIT'
      backButtonDisabled={true}
    >
      <Button
        value="Register"
        name="register-button"
        onClick={() => navigate('/register')}
        style={{
          marginTop: '15px'
        }}
      />
      <Button
        value="Login"
        name="login-button"
        onClick={() => navigate('/login')}
        style={{
          marginTop: '15px'
        }}
      />
    </TopBar>
  )
}