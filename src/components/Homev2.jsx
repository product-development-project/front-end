import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import TopBar from './TopBar';
import Footer from './Footer';
import FAQ from './FAQ';
import Contacts from './Contacts';
import Help from './Help';
import { Button } from './UI/Button';
import Logo from './Media/Photos/Logo.png'

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
                    value="Logout"
                    name="logout-button"
                    onClick={() => {
                        localStorage.clear();
                        navigate("/");
                    }}
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
                    value="Job ads"
                    name="job-ads-button"
                    onClick={() => navigate('/home/job/ads')}
                    style={{
                        marginTop: '15px'
                    }}
                />
            </TopBar>
            
            <main>
                <div style={{height: '1000px', width:'100%'}}>
                    <img src={Logo} style={{height:'100%', width:'100%', objectFit:'cover', position:'absolute', top:'0', bottom:'0', right:"0", left:"0"}}></img>
                    <center>
                        <h1 style={{color:'white', position:'relative', zIndex:'2'}}>Want to get started in IT industry?</h1>
                        <p style={{color:'white',fontSize:'30px', fontWeight:'bold', position:'relative', zIndex:'2'}}>Check out job ads and compete in the competition for the job position</p>
                    
                        <div style={{position:'relative', zIndex:'2', marginTop:'250px'}}>
                            <Button
                            id="buttonHome"
                            value="Job competition"
                            name="job-competition-button"
                            onClick={() => navigate('/home/job/ads')}
                            style={{
                                marginTop: '15px'
                            }}
                            />
                        </div>
                    </center>
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