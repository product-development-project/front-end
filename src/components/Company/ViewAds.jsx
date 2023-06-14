import Header from "../Header";
import { Button } from "../UI/Button";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import axios from "axios";

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

export default function ViewAds() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [editPopupIsOpen, setEditPopupIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [deletePopupIsOpen, setDeletePopupIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [types, setTypes] = useState([]);

  let username = localStorage.getItem("username");
  const tokenWithQuotes = localStorage.getItem("access-token");
  const token = tokenWithQuotes.substring(1, tokenWithQuotes.length - 1);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  let role = localStorage.getItem("roles");

  useEffect(() => {
    if (!localStorage.getItem("access-token")) {
      navigate("/");
    }
    fetchCompanyAds(username);
    fetchExercisesTypes();
  }, [navigate, username]);

  async function fetchCompanyAds() {
    let result = await axios.get(`http://localhost:5163/api/Ad/CompanyAds`, {
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

  return (
    <div style={{ background: 'linear-gradient(59deg, rgba(23,55,117,1) 0%, rgba(75,100,148,1) 100%)', height: '100vh' }}>
      <Header></Header>
      <table>
        <thead>
          <tr
            className="border-bottom delayed-animation"
            style={{ animationDelay: `${50}ms`, color: 'rgb(211, 209, 209)' }}
          >
            <td>Ad name</td>
            <td>Start date</td>
            <td>End date</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {data.map((dataa, index) => (
            <tr
              key={dataa.id}
              className="delayed-animation"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <td>{dataa.name}</td>
              <td>{formatDate(dataa.start)}</td>
              <td>{formatDate(dataa.end)}</td>
              <td>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Button
                    value="Signed Up Users"
                    name="go-to-task"
                    onClick={() =>
                      navigate(`/home/Company/ViewAds/${dataa.id}`)
                    }
                  />
                  <Button
                    value="View Tasks"
                    name="go-to-task"
                    onClick={() =>
                      navigate(`/home/Company/ViewAds/tasks/${dataa.id}`)
                    }
                  />
                  <Button
                    value="Add Task"
                    name="go-to-task"
                    onClick={() =>
                      navigate(`/home/Company/ViewAds/Addtask/${dataa.id}`)
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
          marginRight: "150px",
        }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            value="Back"
            name="back-button"
            onClick={() => {
              navigate(-1);
            }}
            style={{ width: "150px" }}
          />
        </div>
      </div>
    </div>
  );
}
