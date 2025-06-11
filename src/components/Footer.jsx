// Footer.jsx
import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Hotel Booking</h3>
          <p>Find your perfect stay with us.</p>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: info@hotelbooking.com</p>
          <p>Phone: +1 234 567 8900</p>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
            <a href="#">Twitter</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Hotel Booking System. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
