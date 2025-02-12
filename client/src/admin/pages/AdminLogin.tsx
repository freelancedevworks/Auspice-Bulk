/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios'; // Import axios
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Import Font Awesome icons

import '../../styles/AdminLogin.css';
import { API_ENDPOINTS } from '../../constants/api';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    identifier: '',
    password: ''
  });
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!credentials.identifier || !credentials.password) {
      toast.error('Please fill in all fields', {
        position: "bottom-center",
        theme: "dark"
      });
      return;
    }

    try {
      const response = await axios.post(API_ENDPOINTS.AUTH.LOGIN, credentials);

      if (response.data.token) {
        localStorage.setItem('admin_token', response.data.token);
        toast.success('Login successful!', {
          position: "bottom-center",
          theme: "dark"
        });
        navigate('/admin/dashboard');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed. Please try again.', {
        position: "bottom-center",
        theme: "dark"
      });
    }
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <img
              src="https://i.imgur.com/bmEeQtF.png"
              alt="AuspiceBulk DMCC"
              className="login-logo"
            />
            <h1>Admin Login</h1>
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="identifier">Email or Username</label>
              <input
                type="text"
                id="identifier"
                name="identifier"
                value={credentials.identifier}
                onChange={handleChange}
                placeholder="Enter your email or username"
                autoComplete="username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-container">
                <input
                  type={passwordVisible ? 'text' : 'password'} // Toggle input type
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setPasswordVisible(!passwordVisible)} // Toggle visibility
                >
                  <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
                </button>
              </div>
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          <div className="signup-link" style={{ marginTop: '1rem', textAlign: 'center' }}>
            <Link to="/admin/signup" style={{ color: '#007bff', textDecoration: 'underline' }}>
              Create new admin account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
