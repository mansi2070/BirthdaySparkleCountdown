import React from 'react';

interface Heart {
  id: number;
  x: number;
  y: number;
  size: string;
  delay: number;
  opacity: number;
  emoji: string;
}

interface FloatingHeartsProps {
  count?: number;
  emojis?: string[];
}

const FloatingHearts: React.FC<FloatingHeartsProps> = ({ 
  count = 7, 
  emojis = ['❤️', '💖', '💗', '💘', '💝'] 
}) => {
  // Generate random hearts
  const generateHearts = (): Heart[] => {
    const hearts: Heart[] = [];
    for (let i = 0; i < count; i++) {
      hearts.push({
        id: i,
        x: Math.random() * 90 + 5, // 5-95%
        y: Math.random() * 90 + 5, // 5-95%
        size: [`text-2xl`, `text-3xl`, `text-4xl`, `text-5xl`][Math.floor(Math.random() * 4)],
        delay: Math.random() * 3,
        opacity: Math.random() * 0.2 + 0.1, // 0.1-0.3
        emoji: emojis[Math.floor(Math.random() * emojis.length)]
      });
    }
    return hearts;
  };

  const hearts = generateHearts();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className={`heart absolute ${heart.size} text-primary/30 animate-float`}
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            animationDelay: `${heart.delay}s`,
            opacity: heart.opacity
          }}
        >
          {heart.emoji}
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
