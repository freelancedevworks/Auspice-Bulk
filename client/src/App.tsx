import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Materials from './pages/Materials';
import ScrollToTopOnNav from './components/ScrollToTopOnNav';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useLocation } from 'react-router-dom';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminLogin from './admin/pages/AdminLogin';
import AdminSignup from './admin/pages/AdminSignup';
import ViewAdmins from './admin/pages/ViewAdmins';
import AdminMaterials from './admin/pages/AdminMaterials';
import { AdminGuard } from './admin/components/AdminGuard';

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const location = useLocation();

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        limit={3}
        aria-label="Toast Notifications"
        style={{ zIndex: 9999 }}
      />
      <ScrollToTopOnNav />
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/materials" element={<Materials />} />
            <Route path="/contact" element={<Contact />} />

            {/* Redirect /admin to /admin/login */}
            <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Protected admin routes */}
            <Route element={<AdminGuard />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/view-materials" element={<AdminMaterials />} />
              <Route path="/admin/signup" element={<AdminSignup />} />
              <Route path="/admin/view-admins" element={<ViewAdmins />} />
            </Route>

            {/* Catch-all for unknown routes */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        
        {/* Render Footer only if not on the admin page */}
        {!location.pathname.startsWith('/admin') && <Footer />}
      </div>
    </>
  );
}

export default App;
