import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../Context/Usercontext";
import "./Login.css";

const Login = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

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
        "http://localhost:5000/api/login",
        formData
      );
      const token = response.data.token;
      const { email, username } = response.data.user;
      login(token, email, username);
      setMessage("Login successful!");
      // Redirect to creator section after successful login
      navigate("/creatorsection");
    } catch (error) {
      setMessage(
        "Error logging in. " + (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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

        <button type="submit">Login</button>
        <p className="secondary-action">
          Dont have an account?
          <Link to="/register">
            <button>Register now</button>
          </Link>
        </p>
      </form>

      {message && (
        <p className={message.includes("Error") ? "error" : "success"}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Login;
