import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import TypeWriter from '../components/TypeWriter';
import ScrollToTop from '../components/ScrollToTop';
import '../styles/Contact.css';

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
      threshold: 0.1
    });

    document.querySelectorAll('.section-content, .contact-card, .contact-form').forEach(
      element => observer.observe(element)
    );

    if (window.location.hash === '#contact-form') {
      const formElement = document.querySelector('.contact-form-section');
      formElement?.scrollIntoView({ behavior: 'smooth' });
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
              <div className='contact-card-icon'>
                <div className='icon-align'><MapPin size={32} /></div>
                <div>
                  <h3>Visit Us</h3>
                  <p> 3703, JBC 2, Cluster-V</p>
          <p>Jumeirah Lakes Towers</p>
          <p>P.O. Box 338455, Dubai, UAE</p>
                </div>
              </div>
            </div>
            <div className="contact-card">
              <div className='contact-card-icon'>
                <div className='icon-align'><Mail size={32} /></div>
                <div>
                  <h3>Email Us</h3>
                  <p>Email: admin@auspicebulk.com</p>
                </div>
              </div>
            </div>
            <div className="contact-card">
              <div className='contact-card-icon'>
                <div className='icon-align'><Phone size={32} /></div>
                <div>
                  <h3>Call Us</h3>
                  <p>Phone: +971 54 219 2779</p>
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
              <MessageSquare size={32} />
              <h2>Send Us a Message</h2>
              <p>Fill out the form below and we'll get back to you shortly</p>
            </div>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                  placeholder='Enter your full name'
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                  placeholder='Enter your email address'
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                  placeholder='Enter your phone number'
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="inquiryType">Inquiry Type</label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Inquiry Type</option>
                    <option value="business-setup">Business Setup</option>
                    <option value="trade-license">Trade License</option>
                    <option value="visa-services">Visa Services</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="message">Message</label>
                  <textarea
                  placeholder='Enter your message'
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
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
              <iframe src="https://maps.google.com/maps?width=2000&amp;height=550&amp;hl=en&amp;q=3703, JBC 2, Cluster-V  Jumeirah Lakes Towers  P.O. Box 338455, Dubai, UAE&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
              </iframe>
        </div>      
        </div>
      </section>
    </div>
  );
}