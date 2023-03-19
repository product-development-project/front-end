import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import TopBar from './TopBar';
import Footer from './Footer';
import { Button } from './UI/Button';
import VideoPlayer from "react-background-video-player";
import Video from './Media/Videos/homeBackground.mp4'

export default function Homev2() {
    const navigate = useNavigate();
    const section1Ref = useRef(null);
    const section2Ref = useRef(null);
    const section3Ref = useRef(null);
    const section4Ref = useRef(null);

    return (
        <>
            <section ref={section1Ref}></section>
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
            
            <main>
                <div style={{height: '1000px', width:'100%'}}>
                <VideoPlayer
                    className="video"
                    src={Video}
                    autoPlay={true}
                    muted={true}
                />

                <h1 style={{color:'red', position:'relative', zIndex:'2'}}>Home</h1>
                    <p style={{color:'red',fontSize:'30px', fontWeight:'bold', position:'relative', zIndex:'2'}}>Norint kad rašytu ant video viršaus, reikia stiliuje uždėti position:'relative' ir zIndex:'2'</p>
                </div>
                <div style={{height: '1000px'}}>
                    <section ref={section2Ref}>
                        <h1>FAO</h1>
                        <p>FAQ section</p>
                    </section>
                </div>
                <div style={{height: '1000px'}}>
                    <section ref={section3Ref}>
                        <h1>Contacts</h1>
                        <p>Contacts section</p>
                    </section>
                </div>
                <div style={{height: '1000px'}}>
                    <section ref={section4Ref}>
                        <h1>Help</h1>
                        <p>Help section</p>
                    </section>
                </div>

            </main>
            <div style={{paddingBottom: '80px'}}></div>
            <Footer sectionRefs={[section1Ref, section2Ref, section3Ref, section4Ref]} />
        </>
    )
}