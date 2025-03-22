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
    seconds: 10 // Default to 10 seconds
  });
  
  const [isComplete, setIsComplete] = useState(false);
  const [isNearComplete, setIsNearComplete] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      
      // Check if we're in the final 3 seconds
      if (distance > 0 && distance <= 3000) {
        setIsNearComplete(true);
      }
      
      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsComplete(true);
        
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
  
  // For the 10-second countdown, we want to focus on just the seconds
  // and make them more prominent
  const is10SecondCountdown = 
    timeLeft.days === 0 && 
    timeLeft.hours === 0 && 
    timeLeft.minutes === 0 && 
    timeLeft.seconds <= 10;

  return (
    <div className="countdown-container mx-auto">
      {is10SecondCountdown ? (
        <div className="text-center mb-6">
          <div className="text-2xl mb-3 text-secondary">Birthday Countdown:</div>
          
          {/* Simplified 10-second countdown view */}
          <div className={`
            countdown-number text-5xl md:text-8xl font-bold px-8 py-4 
            rounded-2xl inline-block 
            ${isNearComplete ? 'text-red-500 bg-white/90 shadow-xl countdown-final' : 'text-primary bg-white/80 shadow-lg'}
            transition-all duration-300 ease-in-out transform
          `}>
            {timeLeft.seconds}
          </div>
          
          <div className="mt-3 text-xl text-pink-600">
            {isNearComplete ? "Almost there!" : "Seconds until celebration!"}
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default CountdownTimer;
