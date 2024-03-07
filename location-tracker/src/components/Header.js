import React from 'react';
import appLogo from '../images/location_tracker_web_app.png';
import ProfileDisplay from './ProfileDisplay';
import { Link } from 'react-router-dom';
import '../App.css';

const Header = () => {
  return (
    <header>
      <Link to='/'>
        <img id="logo" src={appLogo} alt="Logo" />
      </Link>
      <h1>Location <br/> Tracker</h1>
      <nav id="header-nav">
        <ul id="header-nav-ul">
          <li><Link to="/" className="text-white">Home</Link></li>
          <li><Link to="/about" className="text-white">About</Link></li>
          <li><Link to="/contact" className="text-white">Contact</Link></li>
        </ul>
      </nav>
      <div id="profileDisplay">
        <ProfileDisplay />
      </div>
    </header>
  );
}

export default Header;