import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
  onComplete?: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      
      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (onComplete) {
          onComplete();
        }
        return;
      }
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
    };
    
    // Initial calculation
    calculateTimeLeft();
    
    // Update every second
    const timerId = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timerId);
  }, [targetDate, onComplete]);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className="flex justify-center space-x-2 md:space-x-6">
      <div className="bg-white rounded-lg shadow-lg p-2 md:p-4 w-16 md:w-24 text-center">
        <div className="text-2xl md:text-4xl font-bold text-primary">{formatNumber(timeLeft.days)}</div>
        <div className="text-xs md:text-sm text-gray-600">Days</div>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-2 md:p-4 w-16 md:w-24 text-center">
        <div className="text-2xl md:text-4xl font-bold text-primary">{formatNumber(timeLeft.hours)}</div>
        <div className="text-xs md:text-sm text-gray-600">Hours</div>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-2 md:p-4 w-16 md:w-24 text-center">
        <div className="text-2xl md:text-4xl font-bold text-primary">{formatNumber(timeLeft.minutes)}</div>
        <div className="text-xs md:text-sm text-gray-600">Minutes</div>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-2 md:p-4 w-16 md:w-24 text-center">
        <div className="text-2xl md:text-4xl font-bold text-primary">{formatNumber(timeLeft.seconds)}</div>
        <div className="text-xs md:text-sm text-gray-600">Seconds</div>
      </div>
    </div>
  );
};

export default CountdownTimer;
