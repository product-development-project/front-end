import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Footer(props) {
    const navigate = useNavigate();

    return (
        <div
            style={{
                backgroundColor: "green",
                height: "50px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100%",
                marginBottom: '0px',
                paddingBottom: '15px',
                paddingTop: '15px'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    marginLeft: '60px',
                    fontSize: '25px',
                    cursor: 'pointer'
                }}>
                <ul><li onClick={() => navigate('/faq')}>FAQ</li></ul>
            </div>
            <div
                style={{
                    display: 'flex',
                    fontSize: '25px',
                    cursor: 'pointer'
                }}>
                <ul><li onClick={() => navigate('/contacts')}>Contacts</li></ul>
            </div>
            <div
                style={{
                    display: 'flex',
                    marginRight: '60px',
                    fontSize: '25px',
                    cursor: 'pointer'
                }}>
                <ul><li onClick={() => navigate('/help')}>Help</li></ul>
            </div>
        </div>
    );
};
