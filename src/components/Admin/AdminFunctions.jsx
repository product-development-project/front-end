import React from "react";
import Header from "../Header";
import { Button, Box } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function AdminFunctionsFunction() {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <div
        className="DivBox delayed-animation"
        style={{ animationDelay: `${2 * 50}ms` }}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box mb={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/home/Admin/ApproveTasks")}
              style={{
                marginTop: "15px",
                animationDelay: `${6 * 50}ms`,
                width: "200px",
                background: "white",
                border: "2px solid blue",
              }}
            >
              <span style={{ color: "black" }}>Approve Tasks</span>
            </Button>
          </Box>
          <Box mb={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/home/Admin/ApproveCompanies")}
              style={{
                marginTop: "15px",
                animationDelay: `${8 * 50}ms`,
                width: "200px",
                background: "white",
                border: "2px solid blue",
              }}
            >
              <span style={{ color: "black" }}>Approve Companies</span>
            </Button>
          </Box>
          <Box mb={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/home/Admin/CreateTask")}
              style={{
                marginTop: "15px",
                animationDelay: `${10 * 50}ms`,
                width: "200px",
                background: "white",
                border: "2px solid blue",
              }}
            >
              <span style={{ color: "black" }}>Create Task</span>
            </Button>
          </Box>
          <Box mb={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/home/Admin/HelpSection")}
              style={{
                marginTop: "15px",
                animationDelay: `${15 * 50}ms`,
                width: "200px",
                background: "white",
                border: "2px solid blue",
              }}
            >
              <span style={{ color: "black" }}>Help Section</span>
            </Button>
          </Box>
        </Box>
      </div>
    </>
  );
}
