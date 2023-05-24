import Header from '../Header';
import { Button } from '../UI/Button';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.css';

export default function CompanyFunctions() {
  const navigate = useNavigate();

  return (
    <>
      <Header></Header>

      <div className="DivBox delayed-animation" style={{ animationDelay: `${2 * 50}ms` }}>

        <Button
          className="delayed-animation"
          value="View Ads"
          name="company-button"
          onClick={() => navigate('/home/Company/ViewAds')}
          style={{ animationDelay: `${15 * 50}ms` }}
        />
        <Button
          value="Create Ads"
          className="delayed-animation"
          name="company-button"
          onClick={() => navigate('/home/Company/CreateAds')}
          style={{
            marginTop: '15px',
            animationDelay: `${6 * 50}ms`
          }}
        />
        <Button
          value="Create Task"
          className="delayed-animation"
          name="company-button"
          onClick={() => navigate('/home/Company/CreateTask')}
          style={{
            marginTop: '15px',
            animationDelay: `${8 * 50}ms`
          }}
        />
        <Button
          value="View Created Tasks"
          className="delayed-animation"
          name="company-button"
          onClick={() => navigate('/home/Company/ViewTasks')}
          style={{
            marginTop: '15px',
            animationDelay: `${10 * 50}ms`
          }}
        />
        <Button
          value="For company"
          className="delayed-animation"
          name="company-button"
          onClick={() => navigate('/home/company')}
          style={{
            marginTop: '15px',
            animationDelay: `${15 * 50}ms`
          }}
        />
        <Button
          value="For company"
          className="delayed-animation"
          name="company-button"
          onClick={() => navigate('/home/company')}
          style={{
            marginTop: '15px'
            , animationDelay: `${20 * 50}ms`
          }}
        />
      </div>
    </>
  );
};