import Header from "../Header";
import { Button } from "../UI/Button";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const tokenWithQuotes = localStorage.getItem("access-token");
const token = tokenWithQuotes
  ? tokenWithQuotes.substring(1, tokenWithQuotes.length - 1)
  : null;

if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer${token}`;
}

axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
export default function AddTaskForCompetitionFunction() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [companyTaskData, setCompanyTaskData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [types, setTypes] = useState([]);
  var parts = window.location.href.split("/");
  var currentId = parts[parts.length - 1].toString();
  const [result, setResult] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const tokenWithQuotes = localStorage.getItem("access-token");
  const token = tokenWithQuotes.substring(1, tokenWithQuotes.length - 1);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  useEffect(() => {
    if (!localStorage.getItem("access-token")) {
      navigate("/");
    }
    fetchExercises();
    fetchExercisesTypes();
    fetchCompanyAddedTasks();
  }, [navigate]);

  async function fetchExercises() {
    let result = await axios.get(`http://localhost:5163/api/Task`, {
      headers: { "Content-Type": "application/json" },
    });
    setData(JSON.parse(JSON.stringify(result.data)));
  }

  async function fetchExercisesTypes() {
    let result = await axios.get(`http://localhost:5163/api/TaskType`, {
      headers: { "Content-Type": "application/json" },
    });
    setTypes(JSON.parse(JSON.stringify(result.data)));
  }

  async function addTask(task) {
    try {
      const result = await axios.post(
        `http://localhost:5163/api/Task/AddTaskCompetition/${task}/${currentId}`,
        {},
        { headers: { "Content-Type": "application/json" } }
      );
      if (result.status === 200) {
        setOpenSnackbar(true);
        setResult(result);
        fetchCompanyAddedTasks();
      } else {
        setErrorMessage(result.statusText);
        setOpenSnackbar(true);
      }
    } catch (error) {
      setErrorMessage(error);
      setOpenSnackbar(true);
    }
  }

  async function fetchCompanyAddedTasks() {
    const result = await axios.get(
      `http://localhost:5163/api/Task/Competition/${currentId}`, {
        headers: { "Content-Type": "application/json" },
      });
    setCompanyTaskData(JSON.parse(JSON.stringify(result.data)));
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
    setErrorMessage("");
  };

  return (
    <div style={{ background: 'linear-gradient(59deg, rgba(23,55,117,1) 0%, rgba(75,100,148,1) 100%)', height: '100h' }}>
      <Header />
      <div style={{ display: "flex", justifyContent: "flex-start", paddingLeft: "20px", marginBottom: '-45px', paddingTop: '5px' }}>
        <Button
          value="Back"
          name="go-back"
          onClick={() => navigate(-1)}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: "20px" }}>
        <Button
          value="Go to your own tasks"
          name="go-to-task"
          style={{ marginTop: '10px' }}
          onClick={() =>
            navigate(`/home/Company/ViewAds/AddtaskByCompanyTask/${currentId}`)
          }
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <table>
          <tbody>
            {data
              .filter((task) => !companyTaskData.find((addedTask) => addedTask.id === task.id))
              .map((task, index) => (
                <tr
                  key={task.id}
                  className="delayed-animation"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <td>{task.id}</td>
                  <td>{task.name}</td>
                  <td className={`difficulty ${task.difficulty.toLowerCase()}`}>
                    {task.difficulty}
                  </td>
                  <td>{types.find((t) => t.id === task.type_id)?.name}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Button
                        value="Try out"
                        name="go-to-task"
                        onClick={() =>
                          navigate(`/home/ad/${currentId}/task/${task.id}`)
                        }
                      />
                      <Button
                        value="Add"
                        name="add-task"
                        onClick={() => addTask(task.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        {errorMessage ? (
          <Alert onClose={handleCloseSnackbar} severity="error">
            {errorMessage}
          </Alert>
        ) : (
          <Alert onClose={handleCloseSnackbar} severity="success">
            Added task successfully!
          </Alert>
        )}
      </Snackbar>
    </div>
  );
}