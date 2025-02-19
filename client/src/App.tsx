import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Materials from './pages/Materials';
import ScrollToTopOnNav from './components/ScrollToTopOnNav';

function App() {
  return (
    <Router>
      <ScrollToTopOnNav />
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/materials" element={<Materials />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;