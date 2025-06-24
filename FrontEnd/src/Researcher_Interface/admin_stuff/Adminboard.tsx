import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../components/Logout";
import { DashboardCards } from "./DashboardCards";
import { StudyTable } from "./StudyTable";


export const Adminboard: React.FC = () => {
  const [myStudies, setMyStudies] = useState<any[]>([]);
  const [activeStudies, setActiveStudies] = useState<any[]>([]);
  const [loadingMyStudies, setLoadingMyStudies] = useState(true);
  const [loadingActiveStudies, setLoadingActiveStudies] = useState(true);
  const [activeTab, setActiveTab] = useState<"myStudies" | "activeStudies">("myStudies");

  const navigate = useNavigate();

  // Retrieve auth token, stored email and stored user ID from localStorage
  const token = localStorage.getItem("authToken");
  const storedUserId = localStorage.getItem("userId");


  // 1) Fetch "My Studies" using the stored user ID
  useEffect(() => {
    const fetchMyStudies = async () => {
      if (token && storedUserId) {
        try {
          const response = await fetch(`http://localhost:3000/api/studies/user/id/${storedUserId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!response.ok) {
            throw new Error(`Failed to fetch my studies. Status: ${response.status}`);
          }
          const data = await response.json();
          setMyStudies(data);
        } catch (error) {
          console.error("Error fetching my studies:", error);
        } finally {
          setLoadingMyStudies(false);
        }
      } else {
        setLoadingMyStudies(false);
      }
    };
    fetchMyStudies();
  }, [token, storedUserId]);

  // 2) Fetch all studies, then filter for active
  useEffect(() => {
    const fetchAllStudies = async () => {
      if (token) {
        try {
          const response = await fetch("http://localhost:3000/api/studies", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!response.ok) {
            throw new Error(`Failed to fetch all studies. Status: ${response.status}`);
          }
          const allStudies = await response.json();
          const onlyActive = allStudies.filter((study: any) => study.status === true);
          setActiveStudies(onlyActive);
        } catch (error) {
          console.error("Error fetching all studies:", error);
        } finally {
          setLoadingActiveStudies(false);
        }
      } else {
        setLoadingActiveStudies(false);
      }
    };
    fetchAllStudies();
  }, [token]);

  if (loadingMyStudies || loadingActiveStudies) {
    return (
      <div className="Research_Side">
        <header className="Research_Side-header">
          <h1 style={{ textAlign: "center", fontSize: "36px" }}>Admin Dashboard</h1>
        </header>
        <div className="Research_Side-body">
          <p>Loading studies...</p>
        </div>
      </div>
    );
  }

  const myStudiesCount = myStudies.length;
  const activeStudiesCount = activeStudies.length;
  const displayedStudies = activeTab === "myStudies" ? myStudies : activeStudies;

  return (
    <div className="Research_Side">
      {/* Header */}
      <header className="Research_Side-header">
        <h1 style={{ textAlign: "center", fontSize: "36px" }}>Admin Dashboard</h1>
        {/* Top-right buttons */}
        <button type="button" onClick={() => navigate("/edit_study/new")}>
          Create New Study
        </button>
        <button type="button" onClick={() => logout(navigate)}>
          Logout
        </button>
      </header>

      {/* Body area */}
      <div className="Research_Side-body">
        {/* Tab Switcher */}
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <button
            style={{ marginRight: "10px" }}
            className={
              activeTab === "myStudies"
                ? "bg-blue-600 text-white px-4 py-2 rounded"
                : "bg-gray-200 text-gray-800 px-4 py-2 rounded"
            }
            onClick={() => setActiveTab("myStudies")}
          >
            My Studies
          </button>
          <button
            className={
              activeTab === "activeStudies"
                ? "bg-blue-600 text-white px-4 py-2 rounded"
                : "bg-gray-200 text-gray-800 px-4 py-2 rounded"
            }
            onClick={() => setActiveTab("activeStudies")}
          >
            Active Studies
          </button>
        </div>

        <DashboardCards
          myStudiesCount={myStudiesCount}
          activeStudiesCount={activeStudiesCount}
        />
        <StudyTable studies={displayedStudies} />
      </div>
    </div>
  );
};
