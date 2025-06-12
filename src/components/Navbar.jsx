// Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    closeMenu();
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.classList.toggle('menu-open');
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.classList.remove('menu-open');
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">Hotel Booking</Link>
        </div>
        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/rooms" onClick={closeMenu}>Rooms</Link>
          <Link to="/booking" onClick={closeMenu}>Book Now</Link>
          <Link to="/login" onClick={closeMenu}>Login</Link>
        </div>
        <button 
          className={`menu-icon ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span className={`bar ${isMenuOpen ? 'change' : ''}`}></span>
          <span className={`bar ${isMenuOpen ? 'change' : ''}`}></span>
          <span className={`bar ${isMenuOpen ? 'change' : ''}`}></span>
        </button>
      </nav>
      {isMenuOpen && (
        <div 
          className="overlay"
          onClick={closeMenu}
        ></div>
      )}
    </>
  );
};

export default Navbar;
