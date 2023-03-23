import TopBar from '../TopBar';
import { Button } from '../UI/Button';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import './style.css';

const topics = {
  easy: [
    'HTML',
    'CSS',
    'JavaScript',
  ],
  medium: [
    'React',
    'Node.js',
    'Express',
  ],
  hard: [
    'Python',
    'Java',
    'C++',
  ],
};

export default function Exercises() {
  const navigate = useNavigate();
  const [easyTopics, setEasyTopics] = useState(topics.easy[0]);
  const [mediumTopics, setMediumTopics] = useState(topics.medium[0]);
  const [hardTopics, setHardTopics] = useState(topics.hard[0]);

  return (
    <>
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

      <div className="App">
        <div className="columns-container">
          <div className="column">
            <h2>Easy</h2>
            <select value={easyTopics} onChange={(e) => setEasyTopics(e.target.value)}>
              {topics.easy.map((topic) => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>
          </div>
          <div className="column">
            <h2>Medium</h2>
            <select value={mediumTopics} onChange={(e) => setMediumTopics(e.target.value)}>
              {topics.medium.map((topic) => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>
          </div>
          <div className="column">
            <h2>Hard</h2>
            <select value={hardTopics} onChange={(e) => setHardTopics(e.target.value)}>
              {topics.hard.map((topic) => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <Footer>
      </Footer>
    </>
  );
};