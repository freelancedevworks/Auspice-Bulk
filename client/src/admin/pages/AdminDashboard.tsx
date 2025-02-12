import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/AdminDashboard.css';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

interface DecodedToken {
  id: string;
  email: string;
  username: string;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const token = localStorage.getItem('admin_token');

  useEffect(() => {
    if (!token) {
      navigate('/admin');
      return;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      setUsername(decoded.username);
    } catch (error) {
      console.error('Invalid token:', error);
      localStorage.removeItem('admin_token');
      navigate('/admin');
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Welcome, {username}!</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
      <div className="dashboard-container">
        <div className="dashboard-content">
          <p>You are successfully logged in to the admin dashboard.</p>
        </div>
        <div className="action-buttons">
          <button className="action-button" onClick={() => navigate('/admin/add-product')}>
            <span className="button-icon">➕</span>
            <span className="button-text">Add Products</span>
          </button>
          <button className="action-button" onClick={() => navigate('/admin/view-orders')}>
            <span className="button-icon">📦</span>
            <span className="button-text">View Orders</span>
          </button>
          <button className="action-button" onClick={() => navigate('/admin/manage-users')}>
            <span className="button-icon">👥</span>
            <span className="button-text">Manage Users</span>
          </button>
          <button className="action-button" onClick={() => navigate('/admin/view-admins')}>
            <span className="button-icon">👨‍💼</span>
            <span className="button-text">View Admins</span>
          </button>
        </div>
      </div>
    </div>
  );
} 