import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [hidden, setHidden] = useState(false);
  const [location, setLocation] = useState([]);

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

  useEffect(() => {
    fetch('/api/locations')
      .then((response) => response.json())
      .then((data) => {
        setLocation(data);
      })
    .catch((error) => {
      console.error('Error:', error);
    });
  }, []);

  const handleLocationChange = (id) => {
    fetch(`/api/locations/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
    
  const handleLogOut = () => {
    fetch('/api/logout')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  
    return (
      <div className={`sidebar ${hidden ? 'hidden' : ''}`}>
        <div className="toggleButton" onClick={() => setHidden(!hidden)}>
          {hidden ? 'Show Sidebar' : 'Hide Sidebar'}
        </div>
        <div id="sidebarItem">
          <ul id="sidebarList">
            <li className="sidebarListItem">
              <select id="locationDropdown" className="sidebarListItem" onChange={(e) => handleLocationChange(e.target.value)}>
                <option value="Location" className="sidebarListItem">Location History</option>
                {location.map((location) => (
                  <option key={location.id} value={location.id}>{location.name}</option>
                ))}
              </select>
            </li>
            <Link to="/Map"><li className="sidebarListItem">Map</li></Link>
            <Link to="/Logout"><li className="sidebarListItem" onClick={handleLogOut}>Logout</li></Link>
          </ul>
        </div>
      </div>
    );
}

export default Sidebar