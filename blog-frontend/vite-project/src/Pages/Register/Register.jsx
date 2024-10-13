import "./Register.css"; // Import the improved CSS
import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchLocation } from "../../Api/api";
import  {useNavigate}  from "react-router-dom";
const Register = () => {
  const history = useNavigate();
  const [location, setLocation] = useState({ city: "", country: "" });
  const [error, setError] = useState("");

  // State for form data, initializing city and country as empty strings
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    city: "",
    country: "",
  });

  const [message, setMessage] = useState("");

  const getLocation = async () => {
    try {
      const data = await fetchLocation();
      if (data) {
        const { city, country } = data;
        setLocation({ city, country });

        // Update formData with the fetched location
        setFormData((prevFormData) => ({
          ...prevFormData,
          city,
          country,
        }));
      }
    } catch (error) {
      setError("Could not retrieve location");
      console.error("Error fetching location:", error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/register",
        formData
      );
      setMessage("User registered successfully!");
      history("/login");
    } catch (error) {
      setMessage(
        "Error registering user. " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="register-form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6"
          />
        </div>

        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            name="city"
            id="city"
            value={formData.city} // city is now bound to formData
            onChange={handleChange} // Allows manual input if needed
          />
        </div>

        <div>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            name="country"
            id="country"
            value={formData.country} // country is now bound to formData
            onChange={handleChange} // Allows manual input if needed
          />
        </div>

        <button type="submit">Register</button>
      </form>

      {message && (
        <p className={message.includes("Error") ? "error" : "success"}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Register;
