import { useState, useEffect } from 'react';
// import { ArrowUp } from 'lucide-react';
import '../styles/ScrollToTop.css';
//final coming soon UI
export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const arrowsvg = (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"  // Foreground stroke (arrow color)
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-arrow-up"
  >
    <path d="m5 12 7-7 7 7" stroke="black" strokeWidth="4" />
    <path d="M12 19V5" stroke="black" strokeWidth="4" />
    <path d="m5 12 7-7 7 7" stroke="white" strokeWidth="2" />
    <path d="M12 19V5" stroke="white" strokeWidth="2" />
  </svg>
  );
  
  return (
    <>
      {isVisible && (
        <button onClick={scrollToTop} className="scroll-to-top" aria-label="Scroll to top">
          {arrowsvg}
        </button>
      )}
    </>
  );
}