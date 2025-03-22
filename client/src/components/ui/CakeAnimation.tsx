import { useState, useEffect } from 'react';
import SparkleEffect from './SparkleEffect';

interface CakeAnimationProps {
  onCut?: () => void;
}

const CakeAnimation: React.FC<CakeAnimationProps> = ({ onCut }) => {
  const [isSliced, setIsSliced] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);

  const handleCakeClick = () => {
    if (!isSliced) {
      setIsSliced(true);
      setShowSparkles(true);
      
      // Call the onCut callback
      if (onCut) {
        onCut();
      }
      
      // Hide sparkles after animation
      setTimeout(() => setShowSparkles(false), 3000);
    }
  };

  return (
    <div className="mt-6 mb-10 relative flex justify-center items-center">
      <div className="w-80 h-64 relative">
        {/* Cake plate */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-4 bg-gray-200 rounded-full shadow-lg z-10"></div>
        
        {/* Cake bottom layer */}
        <div className="cake-base absolute bottom-4 left-1/2 transform -translate-x-1/2 w-60 h-28 bg-gradient-to-b from-rose-200 to-rose-300 rounded-xl overflow-hidden z-20 shadow-md">
          {/* Cake texture */}
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 30 }).map((_, i) => (
              <div 
                key={`crumb-${i}`} 
                className="absolute rounded-full bg-white"
                style={{
                  width: `${Math.random() * 4 + 2}px`,
                  height: `${Math.random() * 4 + 2}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.6 + 0.4
                }}
              ></div>
            ))}
          </div>
        </div>
        
        {/* Filling layer */}
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 w-60 h-3 bg-red-400 z-20"></div>
        
        {/* Top cake layer */}
        <div className="absolute bottom-35 left-1/2 transform -translate-x-1/2 w-60 h-14 bg-gradient-to-b from-rose-200 to-rose-300 rounded-t-xl z-20 shadow-sm">
          {/* Cake texture */}
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 20 }).map((_, i) => (
              <div 
                key={`crumb-mid-${i}`} 
                className="absolute rounded-full bg-white"
                style={{
                  width: `${Math.random() * 4 + 2}px`,
                  height: `${Math.random() * 4 + 2}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.6 + 0.4
                }}
              ></div>
            ))}
          </div>
        </div>
        
        {/* Top frosting */}
        <div className="absolute bottom-49 left-1/2 transform -translate-x-1/2 w-64 h-6 z-20">
          <div className="absolute inset-0 bg-white rounded-full shadow-sm"></div>
          
          {/* Frosting decorations */}
          <div className="absolute -bottom-2 left-0 w-full flex justify-around">
            {Array.from({ length: 16 }).map((_, i) => (
              <div 
                key={`frosting-${i}`} 
                className="w-4 h-6 bg-white rounded-b-full"
                style={{ transform: `translateY(${i % 2 ? '20' : '30'}%)` }}
              ></div>
            ))}
          </div>
        </div>
        
        {/* Candles */}
        {[0.35, 0.5, 0.65].map((pos, i) => (
          <div 
            key={`candle-${i}`} 
            className="absolute z-30" 
            style={{
              bottom: '55px',
              left: `calc(50% + ${(pos - 0.5) * 40}px)`,
              transform: 'translateX(-50%)'
            }}
          >
            <div className="w-2 h-14 bg-gradient-to-t from-amber-300 to-amber-100 rounded-sm">
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-gray-700"></div>
              <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 w-5 h-6 bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 rounded-full animate-pulse-slow ${isSliced ? 'opacity-0' : ''}`}></div>
            </div>
          </div>
        ))}
        
        {/* Sprinkles */}
        <div className="absolute bottom-49 left-1/2 transform -translate-x-1/2 w-60 h-6 z-40">
          {Array.from({ length: 60 }).map((_, i) => (
            <div 
              key={`sprinkle-${i}`}
              className="absolute rounded-full"
              style={{ 
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 5 + 2}px`,
                left: `${Math.random() * 90 + 5}%`, 
                top: `${Math.random() * 80 + 10}%`,
                transform: `rotate(${Math.random() * 180}deg)`,
                backgroundColor: ['#FF5E78', '#FFD432', '#4BC8EB', '#A1DD70', '#D58BDD'][Math.floor(Math.random() * 5)]
              }}
            ></div>
          ))}
        </div>
        
        {/* Cake slice (will be animated) */}
        <div 
          className="cake-slice absolute bottom-4 left-[calc(50%+12px)] w-18 h-44 origin-bottom cursor-pointer z-30"
          style={{
            transform: isSliced ? 'translate(60px, 10px) rotate(35deg)' : '',
            transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
          onClick={handleCakeClick}
        >
          {/* Slice shape */}
          <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[28px] border-r-[28px] border-b-[60px] border-l-transparent border-r-transparent border-b-rose-300 transform rotate-180"></div>
          
          {/* Filling in slice */}
          <div className="absolute bottom-[45px] left-0 w-0 h-0 border-l-[28px] border-r-[28px] border-b-[3px] border-l-transparent border-r-transparent border-b-red-400 transform rotate-180"></div>
          
          {/* Top of slice */}
          <div className="absolute bottom-[48px] left-0 w-0 h-0 border-l-[28px] border-r-[28px] border-b-[14px] border-l-transparent border-r-transparent border-b-rose-300 transform rotate-180"></div>
        </div>
      </div>
      
      {/* Cake message - kept simple */}
      <div className="text-center mt-2 text-md font-medium">
        {!isSliced && (
          <span className="text-gray-600">Click to cut! ✨</span>
        )}
      </div>
      
      {/* Sparkle effect when cake is cut */}
      {showSparkles && (
        <div className="absolute inset-0 pointer-events-none">
          <SparkleEffect active={true} frequency={50} duration={2} />
        </div>
      )}
    </div>
  );
};

export default CakeAnimation;
