import React from 'react';
import Profile from './ProfileDisplay';
import Footer from './Footer';
import Map from './Map';
import Sidebar from './Sidebar';
import Header from './Header';

const Dashboard = () => {

  return (
    <div> 
        <header>
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
            <section id="school-topic-window">
                <section id="school">
                <h3 id="school-title">Level</h3>
                <Sidebar/>
                </section>
            </section>
            <section id="study-window">
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