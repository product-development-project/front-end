import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from './UI/Button';
import Logo from './Media/Photos/LogoTop.png'
import styled from 'styled-components';

const LogoContainer = styled.div`    
    &:hover {
    cursor: pointer;   
    }
`;

export default function TopBar(props) {
    const navigate = useNavigate();

    return (
        <div
            style={{
                background: 'linear-gradient(59deg, rgba(23,55,117,1) 0%, rgba(75,100,148,1) 100%)',
                height: "60px",
                display: "flex",
                justifyContent: "space-between",
                position: 'relative',
                zIndex: '2',
                borderBottom: '4px solid white'      
            }}
        >
            <LogoContainer
                style={{
                    fontSize: '35px',
                    paddingLeft: '0px'
                }}
            >
                <btn onClick={() => {
                    if (!localStorage.getItem('access-token')) {
                        navigate('/');
                    } else {
                        navigate('/home');
                    }
                    }}>
                    <img src={Logo} alt='img' style={{height:'100%', width:'350%', objectFit:'cover'}}></img>
                </btn>
            </LogoContainer>
            <div
                style={{
                    display: 'flex'
                }}
            >
                {props.children}
            </div>
        </div>
    )
}