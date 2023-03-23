import TopBar from '../TopBar';
import { Button } from '../UI/Button';
import React, { useState, useEffect } from 'react'
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';

export default function Leaderboard() {
    const navigate = useNavigate();

    return (
        <>
        <TopBar 
            title='workIT'
            backButtonDisabled={true}
        >
             <Button
                    value="Profile"
                    name="profile-button"
                    onClick={() => navigate('/home/profile')}
                    style={{
                        marginTop: '15px'
                    }}
                />
                <Button
                    value="Leaderboard"
                    name="leaderboard-button"
                    onClick={() => navigate('/home/leaderboard')}
                    style={{
                        marginTop: '15px'
                    }}
                />
                <Button
                    value="Exercise"
                    name="exercise-button"
                    onClick={() => navigate('/home/exercises')}
                    style={{
                        marginTop: '15px'
                    }}
                />
                <Button
                    value="Job competition"
                    name="job-competition-button"
                    onClick={() => navigate('/home/job/ads')}
                    style={{
                        marginTop: '15px'
                    }}
                />

        </TopBar>

        <Footer>
        </Footer>
    </>
    );
};