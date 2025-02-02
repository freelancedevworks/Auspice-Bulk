import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Anchor } from 'lucide-react';
import TypeWriter from '../components/TypeWriter';
import ScrollToTop from '../components/ScrollToTop';
import '../styles/Home.css';

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [key, setKey] = useState(0);

  useEffect(() => {
    // Re-trigger animation when visiting the home page
    setKey(prev => prev + 1);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('.hero-section');
      if (heroSection) {
        const scrolled = window.scrollY > window.innerHeight * 0.2;
        heroSection.classList.toggle('scrolled', scrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactClick = () => {
    navigate('/contact#contact-form');
  };

  return (
    <div key={key} className="home">
      <ScrollToTop />
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="animated-logo">
          <img 
            src="https://i.imgur.com/P8ZgtRc.png" 
            alt="Animated Logo" 
            loading="eager"
          />
        </div>
        <div className="section-content">
          <div className="hero-content">
            <div className="sailing-soon">
              <Anchor size={48} className="anchor-icon" />
              <h2 className="coming-soon-text">
                Sailing <TypeWriter text="Soon..." speed={100} delay={3500} />
              </h2>
            </div>
            <h1>Navigating Trust, Delivering Excellence</h1>
            <button 
              className="cta-button" 
              onClick={handleContactClick}
              aria-label="Contact Us"
            >
              Contact Us <ArrowRight size={20} />
            </button>
          </div>
        </div>
        <div className="waves-container">
          <svg
            className="waves"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <path
                id="wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g className="wave-parallax">
              <use href="#wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
              <use href="#wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
              <use href="#wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
              <use href="#wave" x="48" y="7" fill="rgba(255,255,255,0.2)" />
            </g>
          </svg>
        </div>
      </section>
    </div>
  );
}
