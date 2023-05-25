import React from "react";
import Header from "../Header";
import { Button, Box } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function CompanyFunctions() {
  const navigate = useNavigate();

  return (
    <>
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
              variant="contained"
              color="primary"
              onClick={() => navigate("/home/Company/ViewAds")}
              style={{
                margin: "10px",
                border: "2px solid blue",
                background: "white",
                color: "blue",
                // Updated styles
                textAlign: "center",
                width: "90%",
              }}
            >
              <span style={{ color: "black" }}>View Ads</span>
            </Button>
          </Box>
          <Box mb={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/home/Company/CreateAds")}
              style={{
                margin: "10px",
                border: "2px solid blue",
                background: "white",
                color: "blue",
                // Updated styles
                textAlign: "center",
                width: "90%",
              }}
            >
              <span style={{ color: "black" }}>Create Ads</span>
            </Button>
          </Box>
          <Box mb={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/home/Company/CreateTask")}
              style={{
                margin: "10px",
                border: "2px solid blue",
                background: "white",
                color: "blue",
                // Updated styles
                textAlign: "center",
                width: "90%",
              }}
            >
              <span style={{ color: "black" }}>Create Task</span>
            </Button>
          </Box>
          <Box mb={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/home/Company/ViewTasks")}
              style={{
                margin: "10px",
                border: "2px solid blue",
                background: "white",
                color: "black", // Change text color to black
                // Updated styles
                textAlign: "center",
                width: "90%",
              }}
            >
              <span style={{ color: "black" }}>View Created Tasks</span>
            </Button>
          </Box>
        </Box>
      </div>
    </>
  );
}
