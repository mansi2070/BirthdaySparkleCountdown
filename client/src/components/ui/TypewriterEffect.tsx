import { useState, useEffect } from 'react';

interface TypewriterEffectProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

const TypewriterEffect = ({ 
  text, 
  speed = 100, 
  className = "", 
  onComplete 
}: TypewriterEffectProps) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    let timer: NodeJS.Timeout;

    const typeNextChar = () => {
      if (currentIndex < text.length) {
        setDisplayText(text.substring(0, currentIndex + 1));
        currentIndex++;
        timer = setTimeout(typeNextChar, speed);
      } else {
        setIsComplete(true);
        if (onComplete) {
          onComplete();
        }
      }
    };

    typeNextChar();

    return () => {
      clearTimeout(timer);
    };
  }, [text, speed, onComplete]);

  return (
    <span className={`${className} ${!isComplete ? 'typing-effect' : ''}`}>
      {displayText}
    </span>
  );
};

export default TypewriterEffect;
