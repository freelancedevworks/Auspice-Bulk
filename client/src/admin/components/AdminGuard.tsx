import { Navigate, Outlet } from 'react-router-dom';

export function AdminGuard() {
  const token = localStorage.getItem('admin_token');
  
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
} 