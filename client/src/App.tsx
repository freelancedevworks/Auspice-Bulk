import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import ScrollToTopOnNav from './components/ScrollToTopOnNav';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLogin from './admin/pages/AdminLogin';
import { useLocation } from 'react-router-dom';
import AdminDashboard from './admin/pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const location = useLocation(); // Get the current location

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
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
        {/* Render Footer only if not on the admin page */}
        {location.pathname !== '/admin' && location.pathname !== '/admin/dashboard' && <Footer />}
      </div>
    </>
  );
}

export default App;