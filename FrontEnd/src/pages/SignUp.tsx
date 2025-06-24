import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";

export const SignUp: React.FC = () => {
  const [userRole, setUserRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRoleChange = (role: string) => {
    setUserRole(role);
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSignUp = () => {
    alert(`Email: ${email}`);
    alert(`Password: ${password}`);
    alert(`Role: ${userRole}`);

    if (userRole === "Researcher") {
      navigate("/main_research_page");
    } else if (userRole === "Student Researcher") {
      // Assuming same route for now; update this route as needed for student researchers.
      navigate("/main_research_page");
    } else if (userRole === "Participant") {
      navigate("/main_participant_page");
    } else {
      alert("Please select a role");
    }
  };

  return (
    <div className="container">
      <form onSubmit={(e) => e.preventDefault()}>
        <h1>Sign Up</h1>
        <div className="input">
          <input
            type="email"
            placeholder="Whitman Username"
            value={email}
            onChange={handleChangeEmail}
          />
        </div>
        <div className="input">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handleChangePassword}
          />
        </div>
        <div>
          <div>
            <button
              type="button"
              onClick={() => handleRoleChange("Researcher")}
              style={{
                backgroundColor: userRole === "Researcher" ? "grey" : "",
              }}
            >
              Researcher
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange("Student Researcher")}
              style={{
                backgroundColor: userRole === "Student Researcher" ? "grey" : "",
              }}
            >
              Student Researcher
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange("Participant")}
              style={{
                backgroundColor: userRole === "Participant" ? "grey" : "",
              }}
            >
              Participant
            </button>
          </div>
          <div>
            <p>Selected Role: {userRole}</p>
          </div>
          <button type="button" onClick={handleSignUp}>
            Sign Up
          </button>
          <Link to="/login">Already have an account? Login</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
