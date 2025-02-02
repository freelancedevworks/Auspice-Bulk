import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import TypeWriter from '../components/TypeWriter';
import ScrollToTop from '../components/ScrollToTop';
import '../styles/Contact.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: ''
  });

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    const elements = document.querySelectorAll('.section-content, .contact-card, .contact-form');
    elements.forEach(element => observer.observe(element));

    // Smooth scroll to form if hash is present
    if (window.location.hash === '#contact-form') {
      setTimeout(() => {
        const formElement = document.querySelector('.contact-form-section');
        formElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address', {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    // Phone validation (optional field)
    if (formData.phone && !/^\+?[\d\s-]{8,}$/.test(formData.phone)) {
      toast.warning('Please enter a valid phone number', {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    // If all validations pass, show success message
    toast.success('Message sent successfully! We will contact you soon.', {
      position: "top-right",
      autoClose: 3000,
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      inquiryType: '',
      message: ''
    });

    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="contact">
      <ScrollToTop />
      <section className="hero-section-contact">
        <div className="hero-overlay"></div>
        <div className="section-content">
          <h1>
            Contact <TypeWriter text="Us" speed={150} delay={3000} />
          </h1>
          <p>Your trusted partner in global trade</p>
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
                <div className="icon-align"><MapPin size={32} aria-hidden="true" /></div>
                <div>
                  <h3>Post to Us</h3>
                  <address>
                    {/* 3703, JBC 2, Cluster-V<br />
                    Jumeirah Lakes Towers<br /> */}
                    P.O. Box 338455, Dubai, UAE
                  </address>
                </div>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-card-icon">
                <div className="icon-align"><Mail size={32} aria-hidden="true" /></div>
                <div>
                  <h3>Email Us</h3>
                  <p>
                    <a href="mailto:admin@auspicebulk.com">admin@auspicebulk.com</a>
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="contact-card">
              <div className="contact-card-icon">
                <div className="icon-align"><Phone size={32} aria-hidden="true" /></div>
                <div>
                  <h3>Call Us</h3>
                  <p>
                    <a href="tel:+971542192779">+971 54 219 2779</a>
                  </p>
                </div>
              </div>
            </div> */}
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
                    placeholder="Enter your full name"
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    aria-required="true"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    placeholder="Enter your email address"
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    aria-required="true"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    placeholder="Enter your phone number"
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    aria-required="false"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="inquiryType">Inquiry Type</label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    aria-required="false"
                  >
                    <option value="">Select Inquiry Type</option>
                    <option value="business-setup">Business Setup</option>
                    <option value="trade-license">Trade License</option>
                    <option value="visa-services">Visa Services</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    placeholder="Enter your message"
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    aria-required="true"
                  ></textarea>
                </div>
              </div>

              <button type="submit" className="submit-button">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="map-section">
        <div className="section-content">
          <div className="map-container">
            <iframe
              src="https://maps.google.com/maps?width=2000&amp;height=550&amp;hl=en&amp;q=3703, JBC 2, Cluster-V  Jumeirah Lakes Towers  P.O. Box 338455, Dubai, UAE&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              title="Our Location"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}