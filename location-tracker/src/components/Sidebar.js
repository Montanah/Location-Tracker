import React from 'react';
import ProfileDisplay from './ProfileDisplay';

const Sidebar = () => {
    
    return (
      <div className="sidebar">
        <div className="sidebarItem">
          <span className="sidebarTitle">Profile</span>
          < ProfileDisplay />
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