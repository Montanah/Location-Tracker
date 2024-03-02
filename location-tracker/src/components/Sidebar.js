import React, { useState, useEffect } from 'react';
import ProfileDisplay from './ProfileDisplay';

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
            <li className="sidebarListItem">Locations</li>
            <li className="sidebarListItem">Map</li>
            <li className="sidebarListItem">Logout</li>
          </ul>
        </div>
      </div>
    );
}

export default Sidebar