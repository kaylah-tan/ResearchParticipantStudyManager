import React from 'react';

// useNavigate for Logout function
import { Link, useNavigate } from 'react-router-dom';
// import logout function
import { logout } from '../components/Logout';
import './LoginPage.css';

export const RoleSelection: React.FC = () => {
  // useNavigate for Logout function, it has to be defined inside the component or the hook won't work
  // see the button for the rest of the implementation
  const navigate = useNavigate();
  
  return (
    <div className="role-selection-container">
      <h1 className="role-selection-header">Select the Role you want to log in as</h1>
      <div className="role-selection-buttons">
        <Link to="/main_participant_page">
          <button>Participant</button>
        </Link>
        <Link to="/main_research_page">
          <button>Researcher</button>
        </Link>
        <button onClick={() => logout(navigate)}>Logout</button>
      </div>
    </div>
  );
};

export default RoleSelection;
