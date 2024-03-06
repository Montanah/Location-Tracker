import React from 'react';
import appLogo from '../images/location_tracker_web_app.png';
import ProfileDisplay from './ProfileDisplay';
import { Link } from 'react-router-dom';
import '../App.css';

const Header = () => {
  return (
    <header className="bg-blue-500 p-4 flex items-center justify-between">
      <Link to='/'>
        <img className="h-10 w-10" id="logo" src={appLogo} alt="Logo" />
      </Link>
      <h1 className="text-white text-2xl font-bold">Location Tracker</h1>
      <nav>
        <ul className="flex items-center space-x-4">
          <li><Link to="/" className="text-white">Home</Link></li>
          <li><Link to="/about" className="text-white">About</Link></li>
          <li><Link to="/contact" className="text-white">Contact</Link></li>
        </ul>
      </nav>
      <nav id="header-nav">
        <div className="nav-line">
          <ul className="header-nav-ul">
            <li>
              <ProfileDisplay />
                </li>
            </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header;