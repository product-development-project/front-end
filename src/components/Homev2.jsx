import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import FAQ from './FAQ';
import Contacts from './Contacts';
import { Button } from './UI/Button';
import Logo from './Media/Photos/Logo.png'
import Header from './Header';

export default function Homev2() {
    const navigate = useNavigate();
    const section1Ref = useRef(null);
    const section2Ref = useRef(null);
    const section3Ref = useRef(null);

    return (
        <>
            <section ref={section1Ref}></section>
            <Header></Header>

            <main style={{ display: 'grid', gridTemplateRows: '2fr 2fr 2fr' }}>
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
                                top: '50%',
                                transform: 'translateY(-50%)',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                marginTop: '25%',
                                marginBottom: '20%',
                            }}
                        >
                            <Button
                                id="buttonHome"
                                value="Job offerings"
                                name="job-offerings-button-v2"
                                onClick={() => navigate('/home/job/ads')}
                            />
                        </div>
                    </center>
                </div>

                <section ref={section2Ref} style={{ borderTop: '5px solid white', background: 'linear-gradient(-59deg, rgba(75,100,148,1) 0%, rgba(23,55,117,1) 100%)' }}>
                    <h1 style={{ color: 'rgb(211, 209, 209)' }}>FAQ</h1>
                    <FAQ></FAQ>
                </section>

                <section ref={section3Ref} style={{ borderTop: '5px solid white', background: 'linear-gradient(-59deg, rgba(75,100,148,1) 0%, rgba(23,55,117,1) 100%)' }}>
                    <h1 style={{ color: 'rgb(211, 209, 209)' }}>Contacts</h1>
                    <Contacts></Contacts>
                </section>
            </main>
            <Footer sectionRefs={[section1Ref, section2Ref, section3Ref]} />
        </>
    )
}