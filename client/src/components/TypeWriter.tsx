import { useState, useEffect } from 'react';

interface TypeWriterProps {
  text: string;
  speed?: number;
  delay?: number;
}

export default function TypeWriter({ text, speed = 100, delay = 1500 }: TypeWriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isDeleting && currentIndex <= text.length) {
      timer = setTimeout(() => {
        setDisplayText(text.substring(0, currentIndex));
        setCurrentIndex(prev => prev + 1);
      }, speed);
    } else if (!isDeleting && currentIndex > text.length) {
      timer = setTimeout(() => {
        setIsDeleting(true);
        setCurrentIndex(text.length);
      }, delay);
    } else if (isDeleting && currentIndex >= 0) {
      timer = setTimeout(() => {
        setDisplayText(text.substring(0, currentIndex));
        setCurrentIndex(prev => prev - 1);
      }, speed / 2);
    } else if (isDeleting && currentIndex < 0) {
      setIsDeleting(false);
      setCurrentIndex(0);
    }

    return () => clearTimeout(timer);
  }, [currentIndex, isDeleting, text, speed, delay]);

  return (
    <span className="typewriter">
      {displayText}
      <span className="cursor"></span>
    </span>
  );
}