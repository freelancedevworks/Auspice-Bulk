/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../styles/AdminSignup.css';
import axios from 'axios';
import { API_ENDPOINTS } from '../../constants/api';

interface SignupData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  companySecretKey: string;
}

const validatePassword = (password: string): { isValid: boolean; message: string } => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength) {
    return { isValid: false, message: 'Password must be at least 8 characters long' };
  }
  if (!hasUpperCase) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter' };
  }
  if (!hasLowerCase) {
    return { isValid: false, message: 'Password must contain at least one lowercase letter' };
  }
  if (!hasNumbers) {
    return { isValid: false, message: 'Password must contain at least one number' };
  }
  if (!hasSpecialChar) {
    return { isValid: false, message: 'Password must contain at least one special character' };
  }

  return { isValid: true, message: '' };
};

export default function AdminSignup() {
  const [formData, setFormData] = useState<SignupData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    companySecretKey: ''
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username || !formData.email || !formData.password || 
        !formData.confirmPassword || !formData.companySecretKey) {
      toast.error('Please fill in all fields');
      return;
    }

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      toast.error(passwordValidation.message);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(API_ENDPOINTS.AUTH.SIGNUP, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        companySecretKey: formData.companySecretKey
      });

      if (response.status === 201) {
        toast.success('Admin account created successfully!');
        navigate('/admin');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create account');
    }
  };

  return (
    <div className="admin-signup">
      <div className="signup-container">
        <div className="signup-box">
          <div className="login-header">
            <img
              src="https://i.imgur.com/bmEeQtF.png"
              alt="AuspiceBulk DMCC"
              className="login-logo"
            />
            <h1>Create Admin Account</h1>
          </div>
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
              />
              <small className="password-requirements">
                Password must contain at least 8 characters, one uppercase letter,
                one lowercase letter, one number, and one special character.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="companySecretKey">Company Secret Key</label>
              <input
                type="password"
                id="companySecretKey"
                name="companySecretKey"
                value={formData.companySecretKey}
                onChange={handleChange}
                placeholder="Enter company secret key"
              />
              <small className="key-hint">
                Contact your company administrator for the secret key
              </small>
            </div>
            <div className="form-group full-width">
              <button type="submit" className="login-button">
                Create Account
              </button>
            </div>
          </form>
          <div className="login-link" style={{ marginTop: '1rem', textAlign: 'center' }}>
            <Link to="/admin" style={{ color: '#007bff', textDecoration: 'underline' }}>
              Already have an account? Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
