import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
// import LandingPage from './components/LandingPage';
import LogInForm from './components/Login';
import SignUpForm from './components/Signup';
import Dashboard from './components/Dashboard';
import Logout from './components/Logout';

function App() {

  const handleLogout = () => {
    console.log('User is logged out');
  };

  return (
    <Router>
      <div className="App">
          <Routes>
            {/* <Route path="/" element={<LandingPage />} /> */}
            <Route path="/" element={<LogInForm />} />
            <Route path="/Signup" element={<SignUpForm />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Logout" element={<Logout onLogout={handleLogout} />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;