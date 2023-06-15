import React, { useState, useEffect } from "react";
import Header from "../Header";
import { Button } from "../UI/Button";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import "./style.css";

import getBackendApiLink from "../BackEnd";

const backendApiLink = getBackendApiLink();

export default function CreateAdds() {
  const navigate = useNavigate();
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");

  const tokenWithQuotes = localStorage.getItem("access-token");
  const token = tokenWithQuotes.substring(1, tokenWithQuotes.length - 1);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  async function addAdds(e) {
    e.preventDefault();
    const start = moment(StartDate).format("YYYY-MM-DDTHH:mm:ss");
    const end = moment(EndDate).format("YYYY-MM-DDTHH:mm:ss");
    let details = { Name, Description, start, end };
    let json = JSON.stringify(details);
    try {
      const response = await axios.post(backendApiLink + "Ad", json, {
        headers: { "Content-Type": "application/json" },
      });
      navigate("/home/Company/ViewAds");
    } catch (error) {
      //setErrorMessage(error.response.data);
    }
  }

  useEffect(() => {
    if (!localStorage.getItem("access-token")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div
      style={{
        background:
          "linear-gradient(59deg, rgba(23,55,117,1) 0%, rgba(75,100,148,1) 100%)",
        height: "100vh",
      }}
    >
      <Header />
      <table>
        <tr className="row-with-border">
          <td>
            <input
              type="text"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
            />
          </td>
        </tr>
        <tr className="row-with-border">
          <td>
            <input
              type="text"
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              required
            />
          </td>
        </tr>
        <tr>
          <td>
            <DatePicker
              selected={StartDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="Start date"
              required
            />
          </td>
        </tr>
        <tr>
          <td>
            <DatePicker
              selected={EndDate}
              onChange={(date) => setEndDate(date)}
              placeholderText="End date"
              required
            />
          </td>
        </tr>
      </table>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            value="Create"
            name="create-button"
            onClick={addAdds}
            style={{ width: "150px" }}
          />
          <Button
            value="Back"
            name="back-button"
            style={{ width: "150px" }}
            onClick={() => {
              navigate(-1);
            }}
          />
        </div>
      </div>
    </div>
  );
}
