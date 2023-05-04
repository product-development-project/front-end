import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import TopBar from './TopBar';
import Footer from './Footer';
import FAQ from './FAQ';
import Contacts from './Contacts';
import Help from './Help';
import { Button } from './UI/Button';
import Logo from './Media/Photos/Logo.png'

export default function Home() {
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
            
            <main style={{ display: 'grid', gridTemplateRows: '2fr 2fr 2fr 2fr' }}>
                <div style={{ position: 'relative' }}>
                    <img
                        src={Logo}
                        style={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'cover',
                        position: 'absolute',
                        top: '0',
                        bottom: '0',
                        right: '0',
                        left: '0',
                        }}
                        alt="Logo"
                    />
                    <center>
                        <h1 style={{ color: 'white', position: 'relative', zIndex: '2', marginTop: '0%' }}>
                        Want to get started in IT industry?
                        </h1>
                        <p
                        style={{
                            color: 'white',
                            fontSize: '30px',
                            fontWeight: 'bold',
                            position: 'relative',
                            zIndex: '2',
                        }}
                        >
                        Check out job ads and compete in the competition for the job position
                        </p>

                        <div
                        style={{
                            position: 'relative',
                            zIndex: 2,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            marginTop: '20%',
                            marginBottom: '20%',
                        }}
                        >
                        <Button
                            id="buttonHome"
                            value="Job competition"
                            name="job-competition-button"
                            onClick={() => navigate('/home/job/ads')}
                        />
                    </div>
                </center>
                </div>

                <section ref={section2Ref} style={{ backgroundColor: 'lightgray' }}>
                <h1>FAQ</h1>
                <FAQ></FAQ>
                </section>

                <section ref={section3Ref} style={{ backgroundColor: 'lightblue' }}>
                <h1>Contacts</h1>
                <Contacts></Contacts>
                </section>

                <section ref={section4Ref} style={{ backgroundColor: 'lightgreen' }}>
                <h1>Help</h1>
                <Help></Help>
                </section>
            </main>
            <Footer sectionRefs={[section1Ref, section2Ref, section3Ref, section4Ref]} />
        </>
    )
}