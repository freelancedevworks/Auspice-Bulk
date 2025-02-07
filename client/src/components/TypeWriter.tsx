import { useState, useEffect } from 'react';

interface TypeWriterProps {
  text: string;
  speed?: number;
}
//final coming soon UI
export default function TypeWriter({ text, speed = 100 }: TypeWriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex <= text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.substring(0, currentIndex));
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, speed]);

  return (
    <span className="typewriter">
      {displayText}
      <span className="cursor"></span>
    </span>
  );
}