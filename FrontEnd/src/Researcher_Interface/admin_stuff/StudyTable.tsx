import React from "react";
import { useNavigate } from "react-router-dom";

export const StudyTable: React.FC<{ studies: any[] }> = ({ studies }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "20px",
        margin: "10px auto",
        width: "80%",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>Studies</h2>
      <table className="study_table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Department</th>
            <th>Status</th>
            <th style={{ width: "120px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {studies.map((study) => (
            <tr key={study.id}>
              <td>{study.title}</td>
              <td>{study.department}</td>
              <td>{study.status ? "Active" : "Inactive"}</td>
              <td>
                <button
                  style={{ marginRight: "5px" }}
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg shadow hover:bg-blue-700 transition"
                  onClick={() => navigate(`/edit_study/${study.id}`)}
                >
                  📝 Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
