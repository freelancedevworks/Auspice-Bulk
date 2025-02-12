import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../../styles/ViewAdmins.css';
import { API_ENDPOINTS } from '../../constants/api';

interface Admin {
  id: number;
  username: string;
  email: string;
  createdAt: string;
}

export default function ViewAdmins() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin');
      return;
    }

    fetchAdmins();
  }, [navigate]);

  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await axios.get(API_ENDPOINTS.ADMIN.LIST, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAdmins(response.data);
    } catch (error: unknown) {
      toast.error('Failed to fetch admins');
      console.error('Error fetching admins:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="view-admins">
      <div className="admins-container">
        <div className="admins-header">
          <h1>Admin List</h1>
          <button onClick={() => navigate('/admin/dashboard')} className="back-button">
            Back to Dashboard
          </button>
        </div>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="admins-table-container">
            <table className="admins-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr key={admin.id}>
                    <td>{admin.username}</td>
                    <td>{admin.email}</td>
                    <td>{new Date(admin.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 