import React from 'react';
import Profile from './ProfileDisplay';
import Footer from './Footer';
import Map from './Map';
import Sidebar from './Sidebar';
import Header from './Header';
import '../App.css';

const Dashboard = () => {

  return (
    <div> 
        <header id='dbheader'>
            <Header />
            <nav id="header-nav">
                <div className="nav-line">
                <ul className="header-nav-ul">
                    <li>
                    <Profile />
                    </li>
                </ul>
                </div>
            </nav>
        </header>
        <div id='dashboard-container'>
            <section id="sidebar-window">
                <section id="sidebar">
                <h3 id="sidebar-title">Level</h3>
                <Sidebar/>
                </section>
            </section>
            <section id="map-window">
                <div id="contentdisplay">
                <Map />
                </div>
                <Footer />
            </section>
        </div>
    </div>
  );
}

export default Dashboard;