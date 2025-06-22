import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  delay?: number;
  onComplete?: () => void;
  isLooping?: boolean;
}

const Typewriter: React.FC<TypewriterProps> = ({ 
  text, 
  delay = 50, 
  onComplete,
  isLooping = false 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isDeleting && currentIndex < text.length) {
      // Typing with variable delay for more natural feel
      const typingDelay = Math.random() * (delay * 0.3) + delay * 0.7;
      timeout = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, typingDelay);
    } else if (!isDeleting && currentIndex === text.length) {
      // Pause before deleting
      setIsPaused(true);
      timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && displayText.length > 0) {
      // Deleting with variable delay
      const deletingDelay = Math.random() * (delay * 0.2) + delay * 0.4;
      timeout = setTimeout(() => {
        setDisplayText(displayText.slice(0, -1));
      }, deletingDelay);
    } else if (isDeleting && displayText.length === 0) {
      // Reset for next phrase
      setIsDeleting(false);
      setCurrentIndex(0);
      if (onComplete) {
        onComplete();
      }
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, delay, text, onComplete, isDeleting, displayText]);

  return (
    <span className="relative inline-block">
      <span className="transition-all duration-300 ease-in-out">
        {displayText}
      </span>
      <span className={`animate-blink ml-1 transition-opacity duration-300 ${isPaused ? 'opacity-100' : 'opacity-80'}`}>
        |
      </span>
    </span>
  );
};

export default Typewriter; 