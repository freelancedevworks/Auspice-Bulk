import { ArrowRight, ChevronRight, Mail, Package2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// import TypeWriter from '../components/TypeWriter';
import ScrollToTop from '../components/ScrollToTop';
import '../styles/Home.css';

export default function Home() {
  const navigate = useNavigate();
  const heroSectionRef = useRef<HTMLElement>(null);
  const firstTextRef = useRef<HTMLSpanElement>(null);
  const secondTextRef = useRef<HTMLSpanElement>(null);
  const previewsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const threshold = windowHeight * 0.3;

      if (firstTextRef.current && secondTextRef.current) {
        const shouldAnimate = scrollPosition > threshold;
        
        firstTextRef.current.style.transform = shouldAnimate ? 'translateX(-100%)' : 'translateX(0)';
        secondTextRef.current.style.transform = shouldAnimate ? 'translateX(100%)' : 'translateX(0)';
        firstTextRef.current.style.opacity = shouldAnimate ? '0' : '1';
        secondTextRef.current.style.opacity = shouldAnimate ? '0' : '1';
      }
    };

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

  const handlePreviewClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="home">
      <ScrollToTop />
      
      <section ref={heroSectionRef} className="hero-section">
        <div className="hero-overlay" />
        
        <div className="section-content">
          <div className="hero-content">
            <div className="hero-main-content">
              <div className="animated-logo">
                <img 
                  src="https://i.imgur.com/P8ZgtRc.png" 
                  alt="Animated Logo" 
                  loading="eager"
                />
              </div>
              <div className="title-container">
                <h1 className="company-name">AuspiceBulk</h1>
                <div className="hero-title">
                  <span ref={firstTextRef} className="hero-text-part from-left">
                    Navigating Trust
                  </span>
                  <span ref={secondTextRef} className="hero-text-part from-right">
                    Delivering Excellence
                  </span>
                </div>
              </div>
            </div>
            
            {/* <div className="sailing-soon">
              <Anchor 
                size={38} 
                className="anchor-icon" 
                aria-hidden="true"
              />
              <h2 className="coming-soon-text">
                Sailing <TypeWriter text="Soon..." speed={100} />
              </h2>
            </div> */}
            
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

      <section className="previews-section" ref={previewsRef}>
        <div className="previews-container">
          <div 
            className="preview-card about-preview" 
            onClick={() => handlePreviewClick('/about')}
            style={{ '--index': 0 } as React.CSSProperties}
          >
            <div className="preview-image">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
                alt="About Us"
                loading="lazy"
              />
              <div className="preview-overlay" />
            </div>
            <div className="preview-content">
              <h3>About Us</h3>
              <p>Discover our journey, vision, and commitment to excellence in global trade.</p>
              <div className="preview-link">
                Learn More <ChevronRight size={20} />
              </div>
            </div>
          </div>

          <div 
            className="preview-card products-preview" 
            onClick={() => handlePreviewClick('/materials')}
            style={{ '--index': 1 } as React.CSSProperties}
          >
            <div className="preview-image">
              <img 
                src="https://images.unsplash.com/photo-1528521602421-a80b95d07d73?q=80&w=1933&auto=format&fit=crop" 
                alt="Our Products"
                loading="lazy"
              />
              <div className="preview-overlay" />
            </div>
            <div className="preview-content">
              <h3>Our Products</h3>
              <p>Explore our comprehensive range of high-quality materials and commodities.</p>
              <div className="preview-link">
                View Products <Package2 size={20} />
              </div>
            </div>
          </div>

          <div 
            className="preview-card contact-preview" 
            onClick={() => handlePreviewClick('/contact')}
            style={{ '--index': 2 } as React.CSSProperties}
          >
            <div className="preview-image">
              <img 
                src="https://images.unsplash.com/photo-1693021316599-cf3a3345161c?q=80&w=1974&auto=format&fit=crop" 
                alt="Contact Us"
                loading="lazy"
              />
              <div className="preview-overlay" />
            </div>
            <div className="preview-content">
              <h3>Contact Us</h3>
              <p>Get in touch with our team for inquiries and business opportunities.</p>
              <div className="preview-link">
                Contact Now <Mail size={20} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}