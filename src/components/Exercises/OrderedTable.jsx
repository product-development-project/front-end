import React, { useState } from "react";
import { Button } from "../UI/Button";
import "./styleExercises.css";

export default function Table({ data, types, navigate }) {
  const [sortKey, setSortKey] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  let role = localStorage.getItem("roles");

  const sortData = (key) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const generateHeaders = () => {
    const headers = [
      { key: "id", label: "Task number" },
      { key: "name", label: "Task name" },
      { key: "difficulty", label: "Difficulty" },
      { key: "type", label: "Task type" },
    ];

    if (role.includes("User")) {
      headers.push(
        { key: "action", label: "Action" },
        { key: "attempted", label: "Attempted?" }
      );
    }

    return headers.map(({ key, label }) => (
      <th key={key} onClick={() => sortData(key)}>
        {label}
      </th>
    ));
  };

  const generateRows = () => {
    const sortedData = data.sort((a, b) => {
      const valueA = a[sortKey];
      const valueB = b[sortKey];

      if (sortKey === "difficulty") {
        const order = { Easy: 1, Medium: 2, Hard: 3 };
        return sortOrder === "asc"
          ? order[valueA] - order[valueB]
          : order[valueB] - order[valueA];
      }

      if (valueA < valueB) {
        return sortOrder === "asc" ? -1 : 1;
      }

      if (valueA > valueB) {
        return sortOrder === "asc" ? 1 : -1;
      }

      return 0;
    });

    return sortedData.map((task, index) => (
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
        {role.includes("User") ? (
          <td>
            <Button
              value="Try out"
              name="go-to-task"
              onClick={() => navigate(`/home/task/${task.id}`)}
            />
          </td>
        ) : (
          <></>
        )}
        {role.includes("User") ? (
          <td>
            {task.completed == 1 ? (
              <span style={{ color: "green" }}>&#10004;</span>
            ) : (
              <span style={{ color: "red" }}>&#10008;</span>
            )}
          </td>
        ) : (
          <></>
        )}
      </tr>
    ));
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr className="border-bottom table-header delayed-animation">
            {generateHeaders()}
          </tr>
        </thead>
        <tbody>{generateRows()}</tbody>
      </table>
    </div>
  );
}
