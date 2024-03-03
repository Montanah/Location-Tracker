import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
// import LandingPage from './components/LandingPage';
import LogInForm from './components/Login';
import SignUpForm from './components/Signup';
import Dashboard from './components/Dashboard';
// import { AppProvider } from './components/AppContext';

function App() {
  return (
    <Router>
      <div className="App">
          <Routes>
            {/* <Route path="/" element={<LandingPage />} /> */}
            <Route path="/" element={<LogInForm />} />
            <Route path="/Signup" element={<SignUpForm />} />
            <Route path="/Dashboard" element={<Dashboard />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;