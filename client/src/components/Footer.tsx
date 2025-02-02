import { Link } from 'react-router-dom';
import '../styles/Footer.css';
import { Phone, Mail, MapPinHouse} from 'lucide-react';
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section brand">
          <div className="footer-logo">
            <img
              src="https://i.imgur.com/bmEeQtF.png"
              alt="AuspiceBulk DMCC"
              className="footer-logo-image"
            />
          </div>
          <p className='punchline'>Navigating Trust, Delivering Excellence </p>
        </div>

        <div className="footer-section">
          <h4 className='heading-contact'>Contact</h4>

          <div className='icon-con'>
          <MapPinHouse size={48} className="mappinhouse-icon" />
          <div>
            {/* <p> 3703, JBC 2, Cluster-V</p>
            <p>Jumeirah Lakes Towers</p> */}
          <p>P.O. Box 338455, Dubai, UAE</p></div>
          </div>
          <div className='icon-con'>
          <Mail size={48} className="mail-icon" />
          <div><p>Email: admin@auspicebulk.com</p></div>
          </div>
          {/* <div className='icon-con'>
          <Phone size={48} className="phone-icon" />
          <div><p>Phone: +971 54 219 2779</p></div>
          </div> */}
        </div>

        <div className="footer-section ">
          <h4 className='quick-link-heading'>Quick Links</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="waves-container">
        <svg className="waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none">
          <defs>
            <path id="wave-footer" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g className="wave-parallax">
            <use href="#wave-footer" x="48" y="0" fill="rgba(255,255,255,0.7)" />
            <use href="#wave-footer" x="48" y="3" fill="rgba(255,255,255,0.5)" />
            <use href="#wave-footer" x="48" y="5" fill="rgba(255,255,255,0.3)" />
            <use href="#wave-footer" x="48" y="7" fill="rgba(255,255,255,0.2)" />
          </g>
        </svg>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 AuspiceBulk DMCC. All rights reserved.</p>
      </div>
    </footer>
  );
}