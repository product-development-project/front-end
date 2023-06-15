import React, { useState, useEffect } from "react";
import { Form, FormInput } from "./UI/Form";
import { useNavigate } from "react-router-dom";
import TopBar from "./TopBar";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import getBackendApiLink from "./BackEnd";

const backendApiLink = getBackendApiLink();

export default function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setErrorMessage("");
  }, []);

  const handleSave = (e) => {
    e.preventDefault();

    const request = {
      email: user.email,
      username: user.username,
      phoneNumber: user.phoneNumber,
      password: user.password,
    };

    axios
      .post(backendApiLink + `register`, request, {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status === "400") {
          setErrorMessage(error.response.data);
          setOpenSnackbar(true);
        }
      });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(59deg, rgba(23,55,117,1) 0%, rgba(75,100,148,1) 100%)",
        height: "110vh",
      }}
    >
      <TopBar title="workIT" backButtonDisabled={true} />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          {errorMessage}!
        </Alert>
      </Snackbar>
      <Form
        title="Register"
        submitButtonTitle="Register"
        backButtonTitle={"Back"}
        onBack={() => navigate(-1)}
        onSubmit={handleSave}
      >
        <FormInput
          onChange={handleChange}
          type="text"
          label="Email"
          placeholder="Email"
          name="email"
          value={user?.email}
          errorMessage={user?.email?.length < 0 ? "Email is required" : ""}
          required={true}
          pattern="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"
        />
        <FormInput
          onChange={handleChange}
          type="text"
          label="Username"
          placeholder="Username"
          name="username"
          value={user?.username}
          errorMessage={
            user?.username?.length < 0 ? "Username is required" : ""
          }
          required={true}
        />
        <FormInput
          onChange={handleChange}
          type="phoneNumber"
          label="Phone number"
          placeholder="Phone number"
          name="phoneNumber"
          errorMessage={
            user?.phoneNumber?.length < 0 ? "Phone number is required" : ""
          }
          required={true}
        />
        <FormInput
          onChange={handleChange}
          type="password"
          label="Password"
          placeholder="Password"
          name="password"
          errorMessage={
            user?.password?.length < 0
              ? "Password must be 8-20 characters long and contain at least one letter, number and special character"
              : ""
          }
          required={true}
          pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$"
        />
        <FormInput
          onChange={handleChange}
          type="password"
          label="Confirm Password"
          placeholder="Confirm password"
          name="confirmPassword"
          errorMessage={
            user?.confirmPassword?.length < 0 ? "Passwords do not match" : ""
          }
          required={true}
          pattern={user?.password}
        />
      </Form>
    </div>
  );
}
