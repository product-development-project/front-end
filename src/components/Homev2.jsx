import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import TopBar from './TopBar';
import Footer from './Footer';
import { Button } from './UI/Button';

export default function Homev2() {
    const navigate = useNavigate();
    return (
        <>
            <TopBar
                title='Programming competition website'
                backButtonDisabled={true}
            >
                <Button
                    value="Profile"
                    name="profile-button"
                    onClick={() => navigate('/profile')}
                    style={{
                        marginTop: '15px'
                    }}
                />
                <Button
                    value="Leaderboard"
                    name="leaderboard-button"
                    onClick={() => navigate('/leaderboard')}
                    style={{
                        marginTop: '15px'
                    }}
                />
                <Button
                    value="Exercise"
                    name="exercise-button"
                    onClick={() => navigate('/exercises')}
                    style={{
                        marginTop: '15px'
                    }}
                />
                <Button
                    value="Job competition"
                    name="job-competition-button"
                    onClick={() => navigate('/job/ads')}
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