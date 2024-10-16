// src/Pages/Homepage/Navbar/Navbar.js
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../Context/Usercontext"; // Adjust the path as needed
import "./Navbar.css"; // Import the CSS file for styling

const Navbar = () => {
  const navigate = useNavigate();
  const { loggeduser, logout } = useContext(UserContext); // Access loggeduser and logout from context
  const handlelogout = () => {
    logout();
    navigate("/");
  };
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          GeoVerse
        </Link>
        <ul className="navbar-menu" >
          <li className="navbar-item">
            <Link to="/" className="navbar-links">
              Home
            </Link>
          </li>
         
          {loggeduser ? ( // Conditional rendering based on loggeduser
            <>
              <li className="navbar-item">
                <Link to="/creatorsection" className="navbar-links">
                  Account ({loggeduser})
                </Link>
              </li>
              <li className="navbar-item">
                <button className="navbar-links" onClick={handlelogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="navbar-item">
                <Link to="/login" className="navbar-links">
                  Create/Edit
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/register" className="navbar-links">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
