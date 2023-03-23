import TopBar from '../TopBar';
import React, { useState, useEffect } from 'react'
import { Button } from '../UI/Button';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';

export default function JobAds() {
    const navigate = useNavigate();

    return (
        <>
            <TopBar
                title='workIT'
                backButtonDisabled={true}
            >
                <Button
                    value="Upload Job Advertisement"
                    name="job-ad-button"
                    onClick={() => navigate('/home/job/ads/upload')}
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