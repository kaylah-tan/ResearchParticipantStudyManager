import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { logout } from "./components/Logout";

import { MainParticipantPage } from "./Participant_Interface/MainParticipantPage";
import { MainParticipantCalendar } from "./Participant_Interface/ParticipantCalendar";
import { ParticipantStudiesPage } from "./Participant_Interface/ParticipantStudiesPage";
import { ParticipantProfile } from "./Participant_Interface/ParticipantProfile";
import { ParticipantStudy } from "./Participant_Interface/ParticipantStudy";
import { RoleSelection } from "./pages/RoleSelection";
import { EditStudy } from "./Researcher_Interface/edit_study";
import { Adminboard } from "./Researcher_Interface/admin_stuff/Adminboard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoginPage } from "./pages/LoginPage";

interface TokenPayload {
  email: string;
  // add any other properties if needed
}

const App = () => {
  const navigate = useNavigate();

  // the following is a timer that logs out the user after a period of inactivity
  // This was made with pieces of code from this forum:
  // https://stackoverflow.com/questions/23023916/how-to-implement-auto-logout-in-javascript
  // I made some tweaks using Date.now to make it run a little smoother, and all testing shows it working
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    const expireTime = 3600; // seconds

    const resetTimer = () => {
      if (timer) clearInterval(timer);
      startTime = Date.now();
      timer = setInterval(checkIdleTime, 1000);
    };

    let startTime = Date.now();
    const checkIdleTime = () => {
      const secondsElapsed = Math.floor((Date.now() - startTime) / 1000);
      const token = localStorage.getItem("authToken");
      if (secondsElapsed >= expireTime && token) {
        console.log("User logged out due to inactivity");
        logout(navigate);
      }
    };

    const events = ["load", "mousemove", "mousedown", "touchstart", "click", "keypress"];
    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (timer) clearInterval(timer);
    };
  }, [navigate]);

  // 2) If the auth token exists but the email isn't stored, decode the token and store the email locally.
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedEmail = localStorage.getItem("userEmail");
    if (token && !storedEmail) {
      try {
        const decoded: TokenPayload = jwtDecode(token);
        localStorage.setItem("userEmail", decoded.email);
        console.log("User email stored in localStorage:", decoded.email);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  // 3) Once logged in, fetch the user's record by email (if not already done) to store the user ID.
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedEmail = localStorage.getItem("userEmail");
    if (token && storedEmail && !localStorage.getItem("userId")) {
      fetch(`http://localhost:3000/api/users/email/${storedEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Failed to fetch user by email. Status: ${res.status}`);
          }
          return res.json();
        })
        .then((userData) => {
          if (userData && userData.id) {
            localStorage.setItem("userId", userData.id);
            console.log("User ID stored in localStorage:", userData.id);
          }
        })
        .catch((error) => {
          console.error("Error fetching user ID:", error);
        });
    }
  }, []);

  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<LoginPage />} />

      {/* Protected Routes */}
      <Route
        path="/select_role"
        element={
          <ProtectedRoute>
            <RoleSelection />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit_study/:studyId"
        element={
          <ProtectedRoute>
            <EditStudy />
          </ProtectedRoute>
        }
      />
      <Route
        path="/main_research_page"
        element={
          <ProtectedRoute>
            <Adminboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/main_participant_page"
        element={
          <ProtectedRoute>
            <MainParticipantPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/main_participant_page/calendar"
        element={
          <ProtectedRoute>
            <MainParticipantCalendar />
          </ProtectedRoute>
        }
      />
      <Route
        path="/main_participant_page/studies"
        element={
          <ProtectedRoute>
            <ParticipantStudiesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/main_participant_page/profile"
        element={
          <ProtectedRoute>
            <ParticipantProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/main_participant_page/studies/:id"
        element={
          <ProtectedRoute>
            <ParticipantStudy />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
};

export default App;
