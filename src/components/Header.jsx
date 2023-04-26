import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from './UI/Button';
import Logo from './Media/Photos/LogoTop.png'
import styled from 'styled-components';
import TopBar from './TopBar';

export default function Header(props) {
    const navigate = useNavigate();

    return (
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
          value="For company"
          name="company-button"
          onClick={() => navigate('/home/company')}
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
    )
}