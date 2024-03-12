import React from 'react';
import authService from './AuthService';

const Logout = ({ onLogout }) => {

  const handleLogout = () => {
    // Call the logout method from AuthService
    authService.Logout();
    console.log('User is logged out');
    // Call the provided onLogout function
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div className="logout-container">
      <h2>Logout</h2>
      <p>Are you sure you want to logout?</p>
      <button id="LogoutButton" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
