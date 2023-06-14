import React from "react";
import Header from "../Header";
import { Card, CardContent, CardActions } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { Button } from '../UI/Button';
import { FaEye, FaPlus, FaTasks, FaListAlt } from 'react-icons/fa';

export default function CompanyFunctions() {
  const navigate = useNavigate();

  return (
    <div style={{ background: 'linear-gradient(59deg, rgba(23,55,117,1) 0%, rgba(75,100,148,1) 100%)', height: '100vh' }}>
      <Header />
      <div className="card-container delayed-animation">

        <Card className="card">
          <CardContent className="card-content">
            <FaEye className="card-icon" />
            <h3 className="card-title">View Ads</h3>
          </CardContent>
          <CardActions>
            <Button
              value="View Ads"
              name="view-ads-button"
              onClick={() => navigate("/home/Company/ViewAds")}
            />
          </CardActions>
        </Card>

        <Card className="card">
          <CardContent className="card-content">
            <FaPlus className="card-icon" />
            <h3 className="card-title">Create Ad</h3>
          </CardContent>
          <CardActions>
            <Button
              value="Create Ad"
              name="create-ad-button"
              onClick={() => navigate("/home/Company/CreateAds")}
            />
          </CardActions>
        </Card>

        <Card className="card">
          <CardContent className="card-content">
            <FaTasks className="card-icon" />
            <h3 className="card-title">Create Task</h3>
          </CardContent>
          <CardActions>
            <Button
              value="Create Task"
              name="create-task-button"
              onClick={() => navigate("/home/Company/CreateTask")}
            />
          </CardActions>
        </Card>

        <Card className="card">
          <CardContent className="card-content">
            <FaListAlt className="card-icon" />
            <h3 className="card-title">View Created Tasks</h3>
          </CardContent>
          <CardActions>
            <Button
              value="View Created Tasks"
              name="view-created-tasks-button"
              onClick={() => navigate("/home/Company/ViewTasks")}
            />
          </CardActions>
        </Card>
      </div>
    </div>
  );
}