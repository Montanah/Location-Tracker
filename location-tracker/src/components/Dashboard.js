import React from 'react';
import Footer from './Footer';
import Map from './Map';
import Sidebar from './Sidebar';
import Header from './Header';
import '../App.css';

const Dashboard = () => {

  return (
    <div> 
        <section>
            <Header />
        </section>
        <section id='dashboard-container'>
            <section id="sidebar-window">
                <section id="sidebar">
                <h3 id="sidebar-title">Menu</h3>
                <Sidebar/>
                </section>
            </section>
            <section id="map-window">
                <div id="contentdisplay">
                <Map />
                </div>
                <Footer />
            </section>
        </section>
    </div>
  );
}

export default Dashboard;