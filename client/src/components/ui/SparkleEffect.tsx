import { useEffect, useState } from 'react';

interface SparkleProps {
  active?: boolean;
  frequency?: number;
  duration?: number;
}

const SparkleEffect = ({ 
  active = true, 
  frequency = 300, 
  duration = 3000 
}: SparkleProps) => {
  const [sparkles, setSparkles] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    if (!active) return;
    
    const intervalId = setInterval(() => {
      createSparkle();
    }, frequency);
    
    return () => {
      clearInterval(intervalId);
    };
  }, [active, frequency]);

  const createSparkle = () => {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const animationDuration = (Math.random() * 2 + 1);
    
    const sparkle = (
      <div
        key={`sparkle-${Date.now()}-${Math.random()}`}
        className="sparkle"
        style={{
          left: `${x}px`,
          top: `${y}px`,
          animation: `sparkle ${animationDuration}s ease-in-out`
        }}
      />
    );
    
    setSparkles(prev => [...prev, sparkle]);
    
    // Remove sparkle after animation completes
    setTimeout(() => {
      setSparkles(prev => prev.filter(item => item !== sparkle));
    }, duration);
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none sparkle-container">
      {sparkles}
    </div>
  );
};

export default SparkleEffect;
