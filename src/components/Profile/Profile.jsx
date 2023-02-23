import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import TopBar from '../TopBar';
import { Button } from '../UI/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Popup } from '../UI/Popup';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function Profile() {
}