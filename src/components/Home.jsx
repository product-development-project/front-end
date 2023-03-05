import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import TopBar from './TopBar';
import Footer from './Footer';
import { Button } from "./UI/Button";

export default function Home() {
    const navigate = useNavigate();
    return (
        <>
            <TopBar
                title='Programming competition website'
                backButtonDisabled={true}
            >
                <Button
                    value="Log In"
                    name="login-button"
                    onClick={() => navigate('/login')}
                    style={{
                        marginTop: '15px'
                    }}
                />
                <Button
                    value="Register"
                    name="register-button"
                    onClick={() => navigate('/register')}
                    style={{
                        marginTop: '15px'
                    }}
                />
            </TopBar>

            <Footer>
            </Footer>
        </>
    )
}