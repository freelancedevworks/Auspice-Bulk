import { useEffect, useRef } from 'react';
import { Anchor, Target, Compass } from 'lucide-react';
import ScrollToTop from '../components/ScrollToTop';
import '../styles/About.css';

export default function About() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Add visible class with a slight delay based on index
          if (entry.isIntersecting) {
            const index = sectionRefs.current.findIndex(ref => ref === entry.target);
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, index * 200); // Stagger the animations
          }
        });
      },
      {
        threshold: 0.15, // Increased threshold for smoother trigger
        rootMargin: '0px', // Adjusted to trigger closer to viewport
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="about">
      <ScrollToTop />
      
      <section className="hero-section-about">
        <div className="hero-overlay" />
        <div className="section-content">
          <h1>About Us</h1>
          <p>Building trust through excellence in global trade</p>
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

      <section 
        className="about-section" 
        ref={el => sectionRefs.current[0] = el}
      >
        <div className="section-content">
          <div className="about-grid">
            <div className="about-image">
              <img 
                src="https://images.unsplash.com/photo-1577416412292-747c6607f055?q=80&w=2070&auto=format&fit=crop" 
                alt="Global Trade"
                loading="lazy"
              />
            </div>
            <div className="about-text">
              <div className="section-header">
                <Anchor className="section-icon" size={32} />
                <h2>About Our Company</h2>
              </div>
              <p>
                AuspiceBulk DMCC stands at the forefront of global trade, specializing in the strategic sourcing and distribution of essential commodities. Established with a vision to revolutionize international trade, we've built our reputation on the pillars of reliability, efficiency, and sustainable business practices.
              </p>
              <p>
                Our expertise spans across various sectors, from energy resources to industrial raw materials, enabling us to serve diverse industries with precision and professionalism. We leverage cutting-edge technology and industry insights to deliver optimal solutions that meet our clients' evolving needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section 
        className="vision-section" 
        ref={el => sectionRefs.current[1] = el}
      >
        <div className="section-content">
          <div className="vision-grid">
            <div className="vision-text">
              <div className="section-header">
                <Target className="section-icon" size={32} />
                <h2>Our Vision</h2>
              </div>
              <p>
                To be the global leader in commodity trading, recognized for our innovation, sustainability, and commitment to excellence. We envision a future where international trade is seamless, transparent, and beneficial for all stakeholders.
              </p>
              <ul className="vision-points">
                <li>Pioneer sustainable trading practices</li>
                <li>Drive technological innovation in global commerce</li>
                <li>Create lasting value for our partners and communities</li>
                <li>Set new standards for industry excellence</li>
              </ul>
            </div>
            <div className="vision-image">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
                alt="Future Vision"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section 
        className="mission-section" 
        ref={el => sectionRefs.current[2] = el}
      >
        <div className="section-content">
          <div className="mission-grid">
            <div className="mission-image">
              <img 
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop" 
                alt="Our Mission"
                loading="lazy"
              />
            </div>
            <div className="mission-text">
              <div className="section-header">
                <Compass className="section-icon" size={32} />
                <h2>Our Mission</h2>
              </div>
              <p>
                To facilitate global trade through innovative solutions, maintaining the highest standards of integrity and efficiency while creating sustainable value for our stakeholders.
              </p>
              <div className="mission-cards">
                <div className="mission-card">
                  <h3>Excellence</h3>
                  <p>Delivering superior service and maintaining the highest quality standards</p>
                </div>
                <div className="mission-card">
                  <h3>Innovation</h3>
                  <p>Embracing new technologies and solutions to optimize trade processes</p>
                </div>
                <div className="mission-card">
                  <h3>Integrity</h3>
                  <p>Operating with transparency and ethical business practices</p>
                </div>
                <div className="mission-card">
                  <h3>Sustainability</h3>
                  <p>Promoting environmentally conscious and sustainable trade practices</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}