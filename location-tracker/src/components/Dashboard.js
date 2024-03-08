import React from 'react';
import Footer from './Footer';
import Map from './Map';
import Sidebar from './Sidebar';
import Header from './Header';
import '../App.css';
import googleMaps from '../images/google_mapsicon.svg';
import reactLogo from '../images/react_icon.png';
import nodeJSLogo from '../images/nodejs_icon.svg';

const Dashboard = () => {

  return (
    <div> 
        <section>
            <Header />
        </section>
        <section id="dashboard-container">
            <section id="sidebar-window">
                <section id="sidebar">
                <h3 id="sidebar-title">Menu</h3>
                <Sidebar/>
                </section>
            </section>
            <section id="map-window">
                {/* <h2 id="map-title">Current Location</h2> */}
                <div id="contentdisplay">
                <Map />
                </div>
                <section id='partners'>
                    <h2 id="map-title">Partners</h2>
                    <div id='partners-logos'>
                        <img style={{ marginRight: "10px" }} src={googleMaps} alt='Google Maps Logo'></img>
                        <img style={{ marginRight: "10px" }}src={reactLogo} alt='React Logo'></img>
                        <img style={{ marginRight: "0" }} src={nodeJSLogo} alt='NodeJS Logo'></img>
                    </div>
                </section>
                <Footer />
            </section>
        </section>
    </div>
  );
}

export default Dashboard;