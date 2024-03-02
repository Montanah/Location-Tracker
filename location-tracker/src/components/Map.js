import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const Map = () => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const successCallback = (position) => {
      const { latitude, longitude, accuracy } = position.coords;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}, Accuracy: ${accuracy} meters`);

      // Update the state with user's location details
      setUserLocation({
        latitude,
        longitude,
        accuracy,
      });
    };

    const errorCallback = (error) => {
      console.error(`ERROR(${error.code}): ${error.message}`);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []); // Empty dependency array to run the effect only once

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
    >
      <GoogleMap
        id="map"
        mapContainerStyle={{ height: '400px', width: '100%' }}
        zoom={8}
        center={userLocation ? { lat: userLocation.latitude, lng: userLocation.longitude } : { lat: 0, lng: 0 }}
      >
        {/* Marker can be added here if needed */}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
