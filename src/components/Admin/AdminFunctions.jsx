import React from "react";
import Header from "../Header";
import { Box } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { Button } from '../UI/Button';

export default function AdminFunctionsFunction() {
  const navigate = useNavigate();

  return (
    <div style={{ background: 'linear-gradient(59deg, rgba(23,55,117,1) 0%, rgba(75,100,148,1) 100%)', height: '100vh' }}>

      <Header />

      <div
        className="DivBox delayed-animation"
        style={{ animationDelay: `${2 * 50}ms` }}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box mb={2}>
            <Button
              value="Approve Tasks"
              name="approve-task-button"
              onClick={() => navigate("/home/Admin/ApproveTasks")}
              style={{
                marginTop: "15px",
                animationDelay: `${6 * 50}ms`
              }}
            >
            </Button>
          </Box>
          <Box mb={2}>
            <Button
              value="Approve Companies"
              name="approve-companies-button"
              onClick={() => navigate("/home/Admin/ApproveCompanies")}
              style={{
                marginTop: "15px",
                animationDelay: `${8 * 50}ms`
              }}
            >
            </Button>
          </Box>
          <Box mb={2}>
            <Button
              value="Create Task"
              name="create-task-button"
              onClick={() => navigate("/home/Admin/CreateTask")}
              style={{
                animationDelay: `${10 * 50}ms`,
                marginTop: "15px"
              }}
            >
            </Button>
          </Box>
          <Box mb={2}>
            <Button
              value="Help section"
              name="help-section-button"
              onClick={() => navigate("/home/Admin/HelpSection")}
              style={{
                marginTop: "15px",
                animationDelay: `${15 * 50}ms`
              }}
            >
            </Button>
          </Box>
        </Box>
      </div>
    </div>
  );
}
