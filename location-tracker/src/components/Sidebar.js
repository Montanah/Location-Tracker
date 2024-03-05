import React, { useState, useEffect } from 'react';
import ProfileDisplay from './ProfileDisplay';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
    
    return (
      <div className={`sidebar ${hidden ? 'hidden' : ''}`}>
        <div className="toggleButton" onClick={() => setHidden(!hidden)}>
        {hidden ? 'Show Sidebar' : 'Hide Sidebar'}
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">Profile</span>
        <ProfileDisplay />
      </div>
        <div className="sidebarItem">
          <ul className="sidebarList">
            <Link to=""><li className="sidebarListItem">Locations</li></Link>
            <Link to="/Map"><li className="sidebarListItem">Map</li></Link>
            <Link to=""><li className="sidebarListItem">Logout</li></Link>
          </ul>
        </div>
      </div>
    );
}

export default Sidebar