// Login.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import '../styles/Login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      console.log('Login submitted:', {
        email: formData.email,
        password: formData.password
      });
      // In a real app, you would authenticate with your backend
      alert('Login successful!');
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      
      console.log('Registration submitted:', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      // In a real app, you would register with your backend
      alert('Registration successful!');
    }
  };

  return (
    <div className="login-page">
      
      <div className="auth-container">
        <div className="auth-form-container">
          <div className="auth-tabs">
            <button 
              className={isLogin ? 'active' : ''} 
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button 
              className={!isLogin ? 'active' : ''} 
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <h2>{isLogin ? 'Login to Your Account' : 'Create New Account'}</h2>
            
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required={!isLogin}
                />
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required={!isLogin}
                />
              </div>
            )}
            
            {isLogin && (
              <div className="forgot-password">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
            )}
            
            <button type="submit" className="auth-button">
              {isLogin ? 'Login' : 'Register'}
            </button>
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
