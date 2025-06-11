// Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Hotel Booking</Link>
      </div>
      <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/">Home</Link>
        <Link to="/rooms">Rooms</Link>
        <Link to="/booking">Book Now</Link>
        <Link to="/login">Login</Link>
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        <span className={`bar ${isMenuOpen ? 'change' : ''}`}></span>
        <span className={`bar ${isMenuOpen ? 'change' : ''}`}></span>
        <span className={`bar ${isMenuOpen ? 'change' : ''}`}></span>
      </div>
    </nav>
  );
};

export default Navbar;
