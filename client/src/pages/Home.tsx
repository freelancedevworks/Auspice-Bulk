import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { ArrowRight, Anchor } from 'lucide-react';
import TypeWriter from '../components/TypeWriter';
import ScrollToTop from '../components/ScrollToTop';
import '../styles/Home.css';

export default function Home() {
  const navigate = useNavigate();
  const heroSectionRef = useRef<HTMLElement>(null);
  const firstTextRef = useRef<HTMLSpanElement>(null);
  const secondTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const threshold = windowHeight * 0.3;

      if (firstTextRef.current && secondTextRef.current) {
        const shouldAnimate = scrollPosition > threshold;
        
        // Apply transforms and opacity based on scroll position
        firstTextRef.current.style.transform = shouldAnimate ? 'translateX(-100%)' : 'translateX(0)';
        secondTextRef.current.style.transform = shouldAnimate ? 'translateX(100%)' : 'translateX(0)';
        firstTextRef.current.style.opacity = shouldAnimate ? '0' : '1';
        secondTextRef.current.style.opacity = shouldAnimate ? '0' : '1';

        // Toggle background transition class
        heroSectionRef.current?.classList.toggle('scrolled', shouldAnimate);
      }
    };

    // Initial animation setup
    const initializeAnimation = () => {
      if (firstTextRef.current && secondTextRef.current) {
        firstTextRef.current.style.transform = 'translateX(0)';
        secondTextRef.current.style.transform = 'translateX(0)';
        firstTextRef.current.style.opacity = '1';
        secondTextRef.current.style.opacity = '1';
      }
    };

    window.addEventListener('scroll', handleScroll);
    setTimeout(initializeAnimation, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleContactClick = () => {
    navigate('/contact#contact-form');
  };

  return (
    <div className="home">
      <ScrollToTop />
      
      <section ref={heroSectionRef} className="hero-section">
        <div className="hero-overlay" />
        
        <div className="animated-logo">
          <img 
            src="https://i.imgur.com/P8ZgtRc.png" 
            alt="Animated Logo" 
            loading="eager"
          />
        </div>
        
        <div className="section-content">
          <div className="hero-content">
            <h1 className="hero-title">
              <span ref={firstTextRef} className="hero-text-part from-left">
                Navigating Trust
              </span>
              <span ref={secondTextRef} className="hero-text-part from-right">
                Delivering Excellence
              </span>
            </h1>
            
            <div className="sailing-soon">
              <Anchor 
                size={38} 
                className="anchor-icon" 
                aria-hidden="true"
              />
              <h2 className="coming-soon-text">
                Sailing <TypeWriter text="Soon..." speed={180} />
              </h2>
            </div>
            
            <button 
              className="cta-button" 
              onClick={handleContactClick}
              aria-label="Contact Us"
            >
              Contact Us <ArrowRight size={20} aria-hidden="true" />
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