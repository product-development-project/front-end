import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import axios from "axios";
import { FaMedal } from "react-icons/fa";
import "./LeaderboardStyle.css";
import getBackendApiLink from "../BackEnd";

const backendApiLink = getBackendApiLink();

export default function Leaderboard() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState(1);

  let username = localStorage.getItem("username");
  const tokenWithQuotes = localStorage.getItem("access-token");
  const token = tokenWithQuotes.substring(1, tokenWithQuotes.length - 1);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  useEffect(() => {
    if (!localStorage.getItem("access-token")) {
      navigate("/");
    }
    fetchLeaderboard();
  }, [navigate, username]);

  async function fetchLeaderboard() {
    try {
      let result = await axios.get(backendApiLink + `Ratings`, {
        headers: { "Content-Type": "application/json" },
      });
      setData(JSON.parse(JSON.stringify(result.data)));
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to fetch data");
    }
  }

  function sortData(column) {
    let sortedData = data.sort((a, b) => {
      if (a[column] < b[column]) {
        return -1 * sortOrder;
      }
      if (a[column] > b[column]) {
        return 1 * sortOrder;
      }
      return 0;
    });
    setData(sortedData);
    setSortColumn(column);
    setSortOrder(sortOrder * -1);
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
        <tr
          className="border-bottom-Leaderboard delayed-animation-Leaderboard"
          style={{ animationDelay: `${50}ms` }}
        >
          <td onClick={() => sortData("userName")}>
            Username
            {sortColumn === "userName" && sortOrder === 1
              ? " ▲"
              : sortColumn === "userName"
              ? " ▼"
              : ""}
          </td>
          <td onClick={() => sortData("correctnesPoints")}>
            Correctness points
            {sortColumn === "correctnesPoints" && sortOrder === 1
              ? " ▲"
              : sortColumn === "correctnesPoints"
              ? " ▼"
              : ""}
          </td>
          <td onClick={() => sortData("recourcesPoints")}>
            Resources points
            {sortColumn === "recourcesPoints" && sortOrder === 1
              ? " ▲"
              : sortColumn === "recourcesPoints"
              ? " ▼"
              : ""}
          </td>
          <td onClick={() => sortData("timePoints")}>
            Time points
            {sortColumn === "timePoints" && sortOrder === 1
              ? " ▲"
              : sortColumn === "timePoints"
              ? " ▼"
              : ""}
          </td>
          <td onClick={() => sortData("totalPoints")}>
            Total points
            {sortColumn === "totalPoints" && sortOrder === 1
              ? " ▲"
              : sortColumn === "totalPoints"
              ? " ▼"
              : ""}
          </td>
        </tr>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id}
              className="delayed-animation"
              style={{ animationDelay: `${50 * (index + 1)}ms` }}
            >
              <td>
                {index === 0 && (
                  <FaMedal
                    style={{
                      color: "gold",
                      stroke: "black",
                      strokeWidth: "20px",
                      marginRight: "10px",
                      verticalAlign: "middle",
                      float: "left",
                    }}
                    size={25}
                  />
                )}
                {index === 1 && (
                  <FaMedal
                    style={{
                      color: "silver",
                      stroke: "black",
                      strokeWidth: "20px",
                      marginRight: "10px",
                      verticalAlign: "middle",
                      float: "left",
                    }}
                    size={25}
                  />
                )}
                {index === 2 && (
                  <FaMedal
                    style={{
                      color: "rgb(205, 127, 50)",
                      stroke: "black",
                      strokeWidth: "20px",
                      marginRight: "10px",
                      verticalAlign: "middle",
                      float: "left",
                    }}
                    size={25}
                  />
                )}
                <span
                  style={{ margin: "0 auto", color: "black", fontSize: "17px" }}
                >
                  {item.userName}
                </span>
              </td>
              <td>{item.correctnesPoints}</td>
              <td>{item.recourcesPoints}</td>
              <td>{item.timePoints}</td>
              <td>{item.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
