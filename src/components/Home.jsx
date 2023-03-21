import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import TopBar from './TopBar';
import Footer from './Footer';
import FAQ from './FAQ';
import Contacts from './Contacts';
import Help from './Help';
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
                title='workIT'
                backButtonDisabled={true}
            >
                <Button
                    value="Job ads"
                    name="job-ads-button"
                    onClick={() => navigate('/job/ads')}
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
            
            <main>
                <div style={{height: '1000px', width:'100%'}}>
                    <div style={{opacity: 0.2}}>
                        <VideoPlayer
                        className="video"
                        src={Video}
                        autoPlay={true}
                        muted={true}
                        />
                    </div>
                    
                    <h1 style={{color:'red', position:'relative', zIndex:'2'}}>Want to get started in IT industry?</h1>
                    <p style={{color:'red',fontSize:'30px', fontWeight:'bold', position:'relative', zIndex:'2'}}>Join us and explore all companies job offers</p>
                    <div style={{position:'relative', zIndex:'2'}}>
                        <Button
                        value="Get started!"
                        name="register-button"
                        onClick={() => navigate('/register')}
                        style={{
                            marginTop: '15px'
                        }}
                    />
                    </div>
                </div>
                <div style={{height: '1000px'}}>
                    <section ref={section2Ref}>
                        <h1>FAQ</h1>
                        <FAQ></FAQ>
                    </section>
                </div>
                <div style={{height: '1000px'}}>
                    <section ref={section3Ref}>
                        <h1>Contacts</h1>
                        <Contacts></Contacts>
                    </section>
                </div>
                <div style={{height: '1000px'}}>
                    <section ref={section4Ref}>
                        <h1>Help</h1>
                        <Help></Help>
                    </section>
                </div>

            </main>
            <div style={{paddingBottom: '80px'}}></div>
            <Footer sectionRefs={[section1Ref, section2Ref, section3Ref, section4Ref]} />
        </>
    )
}