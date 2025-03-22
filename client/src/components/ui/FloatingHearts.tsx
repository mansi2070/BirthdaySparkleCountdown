import React, { useState, useEffect } from 'react';

interface Heart {
  id: number;
  x: number;
  y: number;
  size: string;
  delay: number;
  opacity: number;
  emoji: string;
  duration: number;
  rotation: number;
}

interface FloatingHeartsProps {
  count?: number;
  emojis?: string[];
  animated?: boolean;
  spread?: 'full' | 'top' | 'bottom';
}

const FloatingHearts: React.FC<FloatingHeartsProps> = ({ 
  count = 15, 
  emojis = ['❤️', '💖', '💗', '💘', '💝', '💕', '💓', '💞'],
  animated = false,
  spread = 'full'
}) => {
  const [hearts, setHearts] = useState<Heart[]>([]);
  
  // Generate random hearts
  useEffect(() => {
    const generateHearts = (): Heart[] => {
      const heartsArray: Heart[] = [];
      for (let i = 0; i < count; i++) {
        // Determine y position based on spread type
        let yPos: number;
        if (spread === 'top') {
          yPos = Math.random() * 40; // 0-40%
        } else if (spread === 'bottom') {
          yPos = Math.random() * 40 + 60; // 60-100%
        } else {
          yPos = Math.random() * 90 + 5; // 5-95%
        }
        
        heartsArray.push({
          id: Date.now() + i,
          x: Math.random() * 90 + 5, // 5-95%
          y: yPos,
          size: [`text-xl`, `text-2xl`, `text-3xl`, `text-4xl`][Math.floor(Math.random() * 4)],
          delay: Math.random() * 5,
          duration: Math.random() * 6 + 6, // 6-12s
          opacity: Math.random() * 0.6 + 0.4, // 0.4-1.0
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
          rotation: Math.random() * 45 - 22.5 // -22.5 to 22.5 degrees
        });
      }
      return heartsArray;
    };

    setHearts(generateHearts());
    
    // If animated, regenerate hearts periodically
    if (animated) {
      const interval = setInterval(() => {
        setHearts(generateHearts());
      }, 8000);
      
      return () => clearInterval(interval);
    }
  }, [count, emojis, animated, spread]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className={`heart absolute ${heart.size} transition-all duration-1000`}
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            opacity: heart.opacity,
            animation: `float ${heart.duration}s ease-in-out infinite`,
            animationDelay: `${heart.delay}s`,
            transform: `rotate(${heart.rotation}deg)`
          }}
        >
          <div className="relative inline-block">
            {heart.emoji}
            
            {/* Add subtle pulse effect to some hearts */}
            {Math.random() > 0.7 && (
              <div 
                className="absolute inset-0 bg-pink-300 rounded-full opacity-20 animate-ping"
                style={{animationDuration: `${Math.random() * 3 + 2}s`}}
              ></div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
