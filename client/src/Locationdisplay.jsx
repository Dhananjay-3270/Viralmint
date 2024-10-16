import React, { useEffect, useState } from "react";
import { fetchLocation } from "./Api/api";
import './LocationDisplay.css'; // Import your CSS file

const LocationDisplay = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");

  const getLocation = async () => {
    try {
      const data = await fetchLocation();
      if (data) {
        const { city, region, country } = data;
        setLocation({ city, region, country });
      }
    } catch (error) {
      setError("Could not retrieve location");
      console.error("Error fetching location:", error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className="location-container">
      <h1>Your Location:</h1>
      {location ? (
        <div className="success">
          <p>City: {location.city}</p>
          <p>Region: {location.region}</p>
          <p>Country: {location.country}</p>
        </div>
      ) : (
        <p className={error ? "error" : "loading"}>{error || "Fetching location..."}</p>
      )}
    </div>
  );
};

export default LocationDisplay;
