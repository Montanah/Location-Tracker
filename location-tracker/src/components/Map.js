const Map = () => {
    return (
        <div className="map">
            <h1>Map</h1>
            <div id="map" style={{ border: "0" }}>
                <iframe
                    frameBorder="0"
                    style={{ width: "100%", height: "400px" }}
                    src="https://www.google.com/maps/embed/v1/place?q=-0.7630853652954102,35.01589584350586&key=YOUR_GOOGLE_MAPS_API_KEY"
                    allowFullScreen
                    title="Location Map"
                />
            </div>
        </div>
    );
}

export default Map;
