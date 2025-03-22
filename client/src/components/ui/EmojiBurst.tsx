import { useState, useEffect } from 'react';

interface EmojiBurstProps {
  containerClassName?: string;
  emoji?: string;
  count?: number;
  trigger?: 'click' | 'auto';
  autoTriggerDelay?: number;
}

const EmojiBurst = ({ 
  containerClassName = "relative h-24 mt-6", 
  emoji = '💖', 
  count = 10,
  trigger = 'click',
  autoTriggerDelay = 0
}: EmojiBurstProps) => {
  const [emojis, setEmojis] = useState<React.ReactNode[]>([]);

  // Auto trigger if needed
  useEffect(() => {
    if (trigger === 'auto' && autoTriggerDelay > 0) {
      const timer = setTimeout(() => {
        createBurst();
      }, autoTriggerDelay);
      
      return () => clearTimeout(timer);
    }
  }, [trigger, autoTriggerDelay]);

  const createBurst = () => {
    const newEmojis: React.ReactNode[] = [];
    
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 100 + 50;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      const delay = Math.random() * 0.5;
      const duration = Math.random() * 1 + 0.5;
      
      const emojiEl = (
        <div
          key={`emoji-${i}-${Date.now()}`}
          className="emoji-burst"
          style={{
            left: `calc(50% + ${x}px)`,
            top: `calc(50% + ${y}px)`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`
          }}
        >
          {emoji}
        </div>
      );
      
      newEmojis.push(emojiEl);
    }
    
    setEmojis(newEmojis);
    
    // Clean up after animation
    setTimeout(() => {
      setEmojis([]);
    }, 2000);
  };

  return (
    <div 
      className={`emoji-burst-container ${containerClassName}`} 
      onClick={trigger === 'click' ? createBurst : undefined}
    >
      {emojis}
    </div>
  );
};

export default EmojiBurst;
