import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/AdminDashboard.css';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem('admin_token');

  useEffect(() => {
    if (!token) {
      navigate('/admin');
    }
  }, [token, navigate]);

  return (
    <div className="admin-dashboard">
      <div className="dashboard-container">
        <h1>Welcome, Admin!</h1>
        <div className="dashboard-content">
          <p>You are successfully logged in to the admin dashboard.</p>
        </div>
      </div>
    </div>
  );
} 