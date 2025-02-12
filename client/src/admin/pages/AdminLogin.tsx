import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../styles/AdminLogin.css';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
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
    
    // Basic validation
    if (!credentials.username || !credentials.password) {
      toast.error('Please fill in all fields', {
        position: "bottom-center",
        theme: "dark"
      });
      return;
    }

    try {
      // TODO: Replace with actual API call
      // Temporary mock login
      if (credentials.username === 'admin' && credentials.password === 'password') {
        localStorage.setItem('admin_token', 'mock_token');
        toast.success('Login successful!', {
          position: "bottom-center",
          theme: "dark"
        });
        navigate('/admin/dashboard');
      } else {
        toast.error('Invalid credentials', {
          position: "bottom-center",
          theme: "dark"
        });
      }
    } catch {
      toast.error('Login failed. Please try again.', {
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
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                placeholder="Enter your username"
                autoComplete="username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 