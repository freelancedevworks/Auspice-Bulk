import { Mail, MapPin, MessageSquare, Phone, Send, User, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from '../components/ScrollToTop';
import TypeWriter from '../components/TypeWriter';
import { sendEmail } from '../services/emailService';
import '../styles/Contact.css';
//final coming soon UI
interface FormData {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  subject: string;
  message: string;
}

const INITIAL_FORM_STATE: FormData = {
  name: '',
  email: '',
  countryCode: '+971',
  phone: '',
  subject: '',
  message: ''
};

export default function Contact() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

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

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    // Required fields
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    // Phone validation (optional)
    if (formData.phone && !validatePhone(formData.countryCode, formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Show error toast for validation failures
      toast.error('Please check all required fields', {
        position: "bottom-center",
        autoClose: 3000,
        theme: "dark"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await sendEmail({
        name: formData.name,
        email: formData.email,
        phone: `${formData.countryCode}${formData.phone}`,
        message: formData.message,
        subject: formData.subject
      });

      toast.success('Message sent successfully! 🎉', {
        position: "bottom-center",
        autoClose: 3000,
        theme: "dark",
        // Fix for TypeScript error by using proper ToastIcon type
        icon: () => <span role="img" aria-label="mail">📧</span>
      });

      setFormData(INITIAL_FORM_STATE);
      setErrors({});
    } catch (error: unknown) {
      console.error('Email send error:', error);
      toast.error('Failed to send message 😔', {
        position: "bottom-center",
        autoClose: 3000,
        theme: "dark"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact">
      <ScrollToTop />
      <ToastContainer />
      
      <section className="hero-section-contact">
        <div className="hero-overlay" />
        <div className="section-content">
          <h1>
            Get in Touch <TypeWriter text="👋" speed={150} />
          </h1>
          <p>We'd love to hear from you! Let's start a conversation.</p>
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
              <h2>Send Us a Message 💌</h2>
              <p>Fill out the form below and we'll get back to you shortly</p>
            </div>
            
            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              <div className="form-grid">
                <div className="input-group">
                  <label>
                    <User size={18} />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData(prev => ({
                        ...prev,
                        name: e.target.value
                      }));
                      // Clear error when user starts typing
                      if (errors.name) {
                        setErrors(prev => ({ ...prev, name: undefined }));
                      }
                    }}
                    placeholder="Enter your name"
                    required
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="input-group">
                  <label>
                    <Mail size={18} />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData(prev => ({
                        ...prev,
                        email: e.target.value
                      }));
                      if (errors.email) {
                        setErrors(prev => ({ ...prev, email: undefined }));
                      }
                    }}
                    placeholder="Enter your email"
                    required
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="input-group">
                  <label>
                    <Phone size={18} />
                    Phone Number
                  </label>
                  <div className="phone-input">
                    <input
                      type="text"
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        countryCode: e.target.value
                      }))}
                      className="country-code"
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        phone: e.target.value
                      }))}
                      placeholder="Phone number"
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>
                    <FileText size={18} />
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      subject: e.target.value
                    }))}
                    placeholder="What's this about?"
                    required
                  />
                </div>

                <div className="input-group full-width">
                  <label>
                    <MessageSquare size={18} />
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      message: e.target.value
                    }))}
                    placeholder="Your message here..."
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>Sending... ⌛</>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message 🚀
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}