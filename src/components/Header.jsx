import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from './UI/Button';
import TopBar from './TopBar';

export default function Header(props) {
  const navigate = useNavigate();
  let role = localStorage.getItem('roles');

  return (
    <TopBar
      title='workIT'
      backButtonDisabled={true}
    >
      {
        role.includes("Company") ?
          <Button
            value="For company"
            name="company-button"
            onClick={() => navigate('/home/company')}
            style={{
              marginTop: '15px'
            }}
          />
          :
          <>
          </>
      }
      {
        role.includes("Admin") ?
          <Button
            value="For Admin"
            name="company-button"
            onClick={() => navigate('/home/Admin')}
            style={{
              marginTop: '15px'
            }}
          />
          :
          <>
          </>
      }
      {
        role.includes("User") ?
          <Button
            value="Exercise"
            name="exercise-button"
            onClick={() => navigate('/home/exercises')}
            style={{
              marginTop: '15px'
            }}
          />
          :
          <>
          </>
      }
      <Button
        value="Leaderboard"
        name="leaderboard-button"
        onClick={() => navigate('/home/leaderboard')}
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
    </TopBar>
  )
}