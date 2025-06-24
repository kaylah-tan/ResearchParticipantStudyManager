import React from "react";

interface DashboardCardsProps {
  myStudiesCount: number;
  activeStudiesCount: number;
}

export const DashboardCards: React.FC<DashboardCardsProps> = ({
  myStudiesCount,
  activeStudiesCount,
}) => {
  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "20px",
            margin: "10px",
            flex: "1 1 200px",
            maxWidth: "300px",
            textAlign: "center",
          }}
        >
          <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>My Studies</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{myStudiesCount}</p>
        </div>
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "20px",
            margin: "10px",
            flex: "1 1 200px",
            maxWidth: "300px",
            textAlign: "center",
          }}
        >
          <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>Active Studies</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{activeStudiesCount}</p>
        </div>
      </div>
    </div>
  );
};
