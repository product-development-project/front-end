import React from "react";
import Header from "../Header";
import { Box } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { Button } from '../UI/Button';

export default function CompanyFunctions() {
  const navigate = useNavigate();

  return (
    <div style={{ background: 'linear-gradient(59deg, rgba(23,55,117,1) 0%, rgba(75,100,148,1) 100%)', height: '100vh' }}>
      <Header />
      <div
        className="DivBox delayed-animation"
        style={{ animationDelay: `${2 * 50}ms` }}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center" // Align buttons horizontally
          height="100vh" // Adjust the height of the container if needed
        >
          <Box mb={2}>
            <Button
              value="View Ads"
              name="view-ads-button"
              onClick={() => navigate("/home/Company/ViewAds")}
              style={{
                margin: "10px",
                textAlign: "center"
              }}
            >
            </Button>
          </Box>
          <Box mb={2}>
            <Button
              value="Create Ad"
              name="create-ad-button"
              onClick={() => navigate("/home/Company/CreateAds")}
              style={{
                margin: "10px",
                textAlign: "center"
              }}
            >
            </Button>
          </Box>
          <Box mb={2}>
            <Button
              value="Create Task"
              name="create-task-button"
              onClick={() => navigate("/home/Company/CreateTask")}
              style={{
                margin: "10px",
                textAlign: "center"
              }}
            >
            </Button>
          </Box>
          <Box mb={2}>
            <Button
              value="View Created Tasks"
              name="view-created-tasks-button"
              onClick={() => navigate("/home/Company/ViewTasks")}
              style={{
                margin: "10px",
                textAlign: "center"
              }}
            >
            </Button>
          </Box>
        </Box>
      </div>
    </div>
  );
}
