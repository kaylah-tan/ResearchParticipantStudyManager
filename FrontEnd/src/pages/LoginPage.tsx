import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import './LoginPage.css';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  // Redirect if token exists (user is already logged in) instead of using ProtectedRoute
  const token = localStorage.getItem('authToken');
  if (token) {
    window.location.href = "/select_role";
    return null;
  }

  return (
    <div className="App">
      <form className="login-form">
        <h1>Research Study Manager</h1>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            if (!credentialResponse.credential) {
              console.error('Login failed: No credentials received');
              return;
            }
            const decoded: { email: string; sub: string } = jwtDecode(credentialResponse.credential);
            const { email } = decoded;
            
            // Validate Whitman email (if this is being used for an exterior project, this part will be changed)
            if (!email.endsWith('@whitman.edu')) {
              alert('You must use a Whitman email to log in');
              return;
            }
  
            localStorage.setItem('authToken', credentialResponse.credential);
            navigate('/select_role');
          }}
          onError={() => console.error('Error logging in')}
        />
      </form>
    </div>
  );
};

export default LoginPage;
