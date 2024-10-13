import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
        GeoVerse
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-links">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/about" className="navbar-links">About</Link>
          </li>
          <li className="navbar-item">
            <Link to="/login" className="navbar-links">Create/Edit</Link>
          </li>
          <li className="navbar-item">
            <Link to="/register" className="navbar-links">Register</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
