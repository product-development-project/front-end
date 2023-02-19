import React, { useState, useEffect } from 'react'
import TopBar from './TopBar';
import { Button } from './UI/Button';

export default function Home() {
    return (
        <>
            <TopBar
                title='Home'
                backButtonDisabled={true}
            >
            </TopBar>
        </>
    )
}