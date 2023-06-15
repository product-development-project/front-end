import Header from "../Header";
import { Button } from "../UI/Button";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import axios from "axios";
import getBackendApiLink from "../BackEnd";

const backendApiLink = getBackendApiLink();

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

export default function ViewCreatedTasksFunctionForCompany() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("access-token")) {
      navigate("/");
    }
    fetchTasks();
    fetchExercisesTypes();
  }, [navigate]);

  const tokenWithQuotes = localStorage.getItem("access-token");
  const token = tokenWithQuotes.substring(1, tokenWithQuotes.length - 1);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  async function fetchTasks() {
    let result = await axios.get(backendApiLink + `Task/ViewCompanyTask`, {
      headers: { "Content-Type": "application/json" },
    });
    setData(JSON.parse(JSON.stringify(result.data)));
  }

  async function fetchExercisesTypes() {
    let result = await axios.get(backendApiLink + `TaskType`, {
      headers: { "Content-Type": "application/json" },
    });
    setTypes(JSON.parse(JSON.stringify(result.data)));
  }
  return (
    <div
      style={{
        background:
          "linear-gradient(59deg, rgba(23,55,117,1) 0%, rgba(75,100,148,1) 100%)",
        height: "100vh",
      }}
    >
      <Header></Header>

      <table>
        <thead>
          <tr
            className="border-bottom delayed-animation"
            style={{ color: "rgb(211, 209, 209)" }}
          >
            <td>Task name</td>
            <td>Difficulty</td>
            <td>Type</td>
            <td>Creation date</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {data.map((task, index) => (
            <tr
              key={task.id}
              className="delayed-animation"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <td>{task.name}</td>
              <td>{task.difficulty}</td>
              <td>{types.find((t) => t.id === task.type_id)?.name}</td>
              <td>{formatDate(task.date)}</td>
              <td>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Button
                    value="View Task"
                    name="view-task"
                    onClick={() => navigate(`/home/task/${task.id}`)}
                  />
                  <Button
                    value="Add test cases"
                    name="add-test-cases"
                    onClick={() =>
                      navigate(
                        `/home/Company/ViewTasks/Task/${task.id}/TestCase`
                      )
                    }
                  />
                  <Button
                    value="View test cases"
                    name="view-test-cases"
                    onClick={() =>
                      navigate(
                        `/home/Company/ViewTasks/Task/${task.id}/TestCase/View`
                      )
                    }
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          marginTop: "10px",
          marginRight: "25px",
        }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            value="Back"
            name="back-button"
            onClick={() => {
              navigate(-1);
            }}
            style={{ width: "120px" }}
          />
        </div>
      </div>
    </div>
  );
}
