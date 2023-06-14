import React from "react";
import Header from "../Header";
import { Card, CardContent, CardActions } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { Button } from '../UI/Button';
import { FaCheck, FaUserShield, FaClipboardList, FaQuestionCircle } from 'react-icons/fa';

export default function AdminFunctionsFunction() {
  const navigate = useNavigate();

  return (
    <div style={{ background: 'linear-gradient(59deg, rgba(23,55,117,1) 0%, rgba(75,100,148,1) 100%)', height: '100vh' }}>
      <Header />
      <div className="card-container delayed-animation">
        <Card className="card">
          <CardContent className="card-content">
            <FaCheck className="card-icon" />
            <h3 className="card-title">Approve Tasks</h3>
          </CardContent>
          <CardActions>
            <Button
              value="Approve Tasks"
              name="approve-task-button"
              onClick={() => navigate("/home/Admin/ApproveTasks")}
            />
          </CardActions>
        </Card>

        <Card className="card">
          <CardContent className="card-content">
            <FaUserShield className="card-icon" />
            <h3 className="card-title">Approve Companies</h3>
          </CardContent>
          <CardActions>
            <Button
              value="Approve Companies"
              name="approve-companies-button"
              onClick={() => navigate("/home/Admin/ApproveCompanies")}
            />
          </CardActions>
        </Card>

        <Card className="card">
          <CardContent className="card-content">
            <FaClipboardList className="card-icon" />
            <h3 className="card-title">Create Task</h3>
          </CardContent>
          <CardActions>
            <Button
              value="Create Task"
              name="create-task-button"
              onClick={() => navigate("/home/Admin/CreateTask")}
            />
          </CardActions>
        </Card>

        <Card className="card">
          <CardContent className="card-content">
            <FaQuestionCircle className="card-icon" />
            <h3 className="card-title">Help section</h3>
          </CardContent>
          <CardActions>
            <Button
              value="Help section"
              name="help-section-button"
              onClick={() => navigate("/home/Admin/HelpSection")}
            />
          </CardActions>
        </Card>
      </div>
    </div>
  );
}