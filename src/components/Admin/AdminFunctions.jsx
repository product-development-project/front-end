import Header from '../Header';
import { Button } from '../UI/Button';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import './style.css';

export default function AdminFunctionsFunction() {
  const navigate = useNavigate();

  return (
    <>
      <Header></Header>

      <div className="DivBox delayed-animation" style={{ animationDelay: `${2 * 50}ms` }}>
        <Button
          value="Approve tasks"
          className="delayed-animation"
          name="company-button"
          onClick={() => navigate('/home/Admin/ApproveTasks')}
          style={{
            marginTop: '15px',
            animationDelay: `${6 * 50}ms`
          }}
        />
        <Button
          value="Approve companies"
          className="delayed-animation"
          name="company-button"
          onClick={() => navigate('/home/Admin/ApproveCompanies')}
          style={{
            marginTop: '15px',
            animationDelay: `${8 * 50}ms`
          }}
        />
        <Button
          value="Create tasks"
          className="delayed-animation"
          name="company-button"
          onClick={() => navigate('/home/Admin/CreateTask')}
          style={{
            marginTop: '15px',
            animationDelay: `${10 * 50}ms`
          }}
        />
        <Button
          value="Help section"
          className="delayed-animation"
          name="company-button"
          onClick={() => navigate('/home/Admin/HelpSection')}
          style={{
            marginTop: '15px',
            animationDelay: `${15 * 50}ms`
          }}
        />
      </div>
    </>
  );
};