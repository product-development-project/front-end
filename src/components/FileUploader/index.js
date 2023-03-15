import './style.css'
import React, { useState, useEffect } from 'react'
import TopBar from '../TopBar';
import { Button } from '../UI/Button';
import Footer from '../Footer';

export const FileUploader = ({ }) => {
    return (
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <TopBar title='Upload job ad' />

                    <form method="post" action="#" id="#">

                        <div className="form-group files" style={{ fontSize: 28 }}>
                            <label style={{ fontSize: 28 }}>Upload Your File</label>

                            <input style={{ alignItems: 'center' }} type="file" className="form-control" multiple="" />
                        </div>

                        <Button
                            value="Submit Task"
                            style={{
                                marginTop: '15px',
                            }}
                        />

                    </form>

                    <Footer/>
                </div>
            </div>
        </div>
    );
};