import { Mail, MapPin, MessageSquare } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from '../components/ScrollToTop';
import TypeWriter from '../components/TypeWriter';
import '../styles/Contact.css';
//final coming soon UI
interface FormData {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  message: string;
}

const INITIAL_FORM_STATE: FormData = {
  name: '',
  email: '',
  countryCode: '+971',
  phone: '',
  message: ''
};

export default function Contact() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE);

  
  useEffect(() => {
    const setupIntersectionObserver = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '50px'
        }
      );

      const elements = document.querySelectorAll(
        '.section-content, .contact-card, .contact-form'
      );
      elements.forEach((element) => observer.observe(element));

      return observer;
    };

    const handleHashScroll = () => {
      if (window.location.hash === '#contact-form') {
        setTimeout(() => {
          const formElement = document.querySelector('.contact-form-section');
          formElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    };

    const observer = setupIntersectionObserver();
    handleHashScroll();

    return () => {
      observer.disconnect();
    };
  }, []);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (countryCode: string, phone: string): boolean => {
    if (!phone) return true; // Phone is optional
    const fullPhone = `${countryCode}${phone}`;
    return /^\+\d{1,4}\d{8,}$/.test(fullPhone);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Required fields validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields', {
        position: "bottom-center",
        autoClose: 2000,
        theme: "dark"
      });
      return;
    }

    // Email validation
    if (!validateEmail(formData.email)) {
      toast.error('Invalid email format', {
        position: "bottom-center",
        autoClose: 2000,
        theme: "dark"
      });
      return;
    }

    // Phone validation (if provided)
    if (formData.phone && !validatePhone(formData.countryCode, formData.phone)) {
      toast.warning('Please enter a valid phone number', {
        position: "bottom-center",
        autoClose: 2000,
        theme: "dark"
      });
      return;
    }

    // Success handling
    toast.success('Message sent successfully!', {
      position: "bottom-center",
      autoClose: 2000,
      theme: "dark"
    });

    // Reset form
    setFormData(INITIAL_FORM_STATE);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="contact">
      <ScrollToTop />
      <ToastContainer />
      
      <section className="hero-section-contact">
        <div className="hero-overlay" />
        <div className="section-content">
          <h1>
            Contact <TypeWriter text="Us" speed={150} />
          </h1>
          <p>Your trusted partner in global trade</p>
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

      <section className="contact-info-section">
      
        <div className="section-content">
          <div className="section-header">
            <h2>How Can We Help?</h2>
            <p>We're here to assist you with any inquiries</p>
          </div>
          
          <div className="contact-cards">
            <div className="contact-card">
              <div className="contact-card-icon">
                <div className="icon-align">
                  <MapPin size={32} aria-hidden="true" />
                </div>
                <div>
                  <h3>Post to Us</h3>
                  <address>P.O. Box 338455, Dubai, UAE</address>
                </div>
              </div>
            </div>
            
            <div className="contact-card">
              <div className="contact-card-icon">
                <div className="icon-align">
                  <Mail size={32} aria-hidden="true" />
                </div>
                <div>
                  <h3>Email Us</h3>
                  <p>
                    <a href="mailto:admin@auspicebulk.com">
                      admin@auspicebulk.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-form-section" id="contact-form">
      
        <div className="section-content">
          <div className="form-container">
            <div className="form-header">
              <MessageSquare size={32} aria-hidden="true" />
              <h2>Send Us a Message</h2>
              <p>Fill out the form below and we'll get back to you shortly</p>
            </div>
            
            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    aria-required="true"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    required
                    aria-required="true"
                  />
                </div>

                <div className="form-group phone-group">
                  <label htmlFor="phone">Phone Number</label>
                  <div className="phone-input-container">
                    <input
                      id="countryCode"
                      name="countryCode"
                      type="text"
                      value={formData.countryCode}
                      onChange={handleChange}
                      placeholder="+971"
                      className="country-code-input"
                      maxLength={4}
                    />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone number"
                      className="phone-number-input"
                    />
                  </div>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter your message"
                    required
                    aria-required="true"
                  />
                </div>
              </div>

              <button type="submit" className="submit-button">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}