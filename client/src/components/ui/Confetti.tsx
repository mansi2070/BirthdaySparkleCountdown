import { useEffect, useState } from 'react';

interface ConfettiProps {
  active: boolean;
  count?: number;
}

const Confetti = ({ active = false, count = 50 }: ConfettiProps) => {
  const [confettiPieces, setConfettiPieces] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    if (active) {
      createConfetti(count);
    }
  }, [active, count]);

  const createConfetti = (pieceCount: number) => {
    const colors = ['#FF6B8A', '#7B68EE', '#FFC107', '#F44336', '#4CAF50', '#2196F3'];
    const newPieces: React.ReactNode[] = [];

    for (let i = 0; i < pieceCount; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      const size = Math.random() * 10 + 5;
      const animationDuration = Math.random() * 3 + 2;
      const animationDelay = Math.random() * 2;
      const rotation = Math.random() * 360;

      const piece = (
        <div
          key={`confetti-${i}-${Date.now()}`}
          className="confetti"
          style={{
            backgroundColor: color,
            left: `${left}vw`,
            width: `${size}px`,
            height: `${size}px`,
            transform: `rotate(${rotation}deg)`,
            animation: `fall ${animationDuration}s linear forwards`,
            animationDelay: `${animationDelay}s`,
          }}
        />
      );

      newPieces.push(piece);
    }

    setConfettiPieces(prev => [...prev, ...newPieces]);

    // Clean up confetti pieces after animation
    setTimeout(() => {
      setConfettiPieces([]);
    }, 5000);
  };

  return (
    <div id="confetti-container" className="fixed inset-0 pointer-events-none z-50">
      {confettiPieces}
    </div>
  );
};

export default Confetti;
