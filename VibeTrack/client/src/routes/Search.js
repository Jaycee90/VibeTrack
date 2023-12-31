// Import React and useState hook from the 'react' library
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";// Leaflet library for creating a custom icon
import "leaflet/dist/leaflet.css";

// Define a functional component called 'Search'
function Search() {
    // Define a state variable 'locationResult' and a function to update it, 'setLocationResult'
    const [locationResult, setLocationResult] = useState('');
    const [locationCoord, setLocationCoord] = useState(null);
    const [mapReady, setMapReady] = useState(false);

    // Define a function to retrieve the user's geolocation
    const getUserLocation = () => {
        // Check if the browser supports the Geolocation API
        if (navigator.geolocation) {
            // If supported, use 'getCurrentPosition' to get the user's location
            navigator.geolocation.getCurrentPosition(
                // Success callback function, receiving the 'position' object
                function (position) {
                    // Extract the latitude and longitude from 'position'
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    // Update the 'locationResult' state with the user's coordinates
                    setLocationResult(`Latitude: ${latitude}, Longitude: ${longitude}`);
                    // Set user's coordinates
                    setLocationCoord([latitude, longitude]);
                    // Mark the map as ready
                    setMapReady(true);
                },
                // Error callback function, receiving an 'error' object
                function (error) {
                    // Update the 'locationResult' state with an error message
                    setLocationResult(`Error: ${error.message}`);
                    setMapReady(true);
                }
            );
        } else {
            // If Geolocation API is not supported, update 'locationResult' with an error message
            setLocationResult('Geolocation is not supported by your browser.');
        }
    };

    // Custom icon for the marker
    const icon = new L.Icon({
        iconUrl: "https://i.imgur.com/yyb78tO.png", 
        iconSize: [32, 32],
    });
    
    // Use useEffect to call getUserLocation when the component mounts
    useEffect(() => {
        getUserLocation();
    }, []);

    // Render the component's JSX content
    return (
        <div>
            {/* Create a button that triggers the 'getUserLocation' function when clicked */}
            <button onClick={getUserLocation}>Get My Location</button>
            <p id="locationResult">{locationResult}</p>

            {/* Display the 'locationResult' state, which will show the geolocation information or error message */}
            <p style={{'color':'#000000'}}id="locationResult">{locationResult}</p>

            {/* Render the map with a marker */}
            {mapReady && (
                <MapContainer
                    style={{ height: "70vh", width: "100%" }}
                    center={locationCoord || [0, 0]} // Center the map at the user's geolocation or default to [0, 0]
                    zoom={15}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {locationCoord && (
                        <Marker position={locationCoord} icon={icon}>
                            <Popup>
                                Zelicks <br /> Coordinates: {locationCoord[0]}, {locationCoord[1]}
                            </Popup>
                        </Marker>
                    )}        
                </MapContainer>
            )}

        </div>
    );
}

// Export the 'Search' component to make it available for use in other parts of our application
export default Search;
