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
    <div className="mt-8 mb-12 relative">
      <div className="w-80 h-80 mx-auto relative">
        {/* Cake plate */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-4 bg-gray-100 rounded-full shadow-md z-10"></div>
        
        {/* Cake layers */}
        <div className="cake-base absolute bottom-4 left-1/2 transform -translate-x-1/2 w-56 h-36 bg-gradient-to-b from-pink-200 to-pink-300 rounded-lg overflow-hidden z-20">
          {/* Cake texture */}
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 30 }).map((_, i) => (
              <div 
                key={`crumb-${i}`} 
                className="absolute rounded-full bg-white"
                style={{
                  width: `${Math.random() * 5 + 2}px`,
                  height: `${Math.random() * 5 + 2}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.5
                }}
              ></div>
            ))}
          </div>
        </div>
        
        {/* Filling layer */}
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-56 h-3 bg-red-300 z-20"></div>
        
        {/* Middle cake layer */}
        <div className="absolute bottom-27 left-1/2 transform -translate-x-1/2 w-56 h-16 bg-gradient-to-b from-pink-200 to-pink-300 rounded-t-lg z-20">
          {/* Cake texture */}
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 20 }).map((_, i) => (
              <div 
                key={`crumb-mid-${i}`} 
                className="absolute rounded-full bg-white"
                style={{
                  width: `${Math.random() * 5 + 2}px`,
                  height: `${Math.random() * 5 + 2}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.5
                }}
              ></div>
            ))}
          </div>
        </div>
        
        {/* Top frosting */}
        <div className="absolute bottom-43 left-1/2 transform -translate-x-1/2 w-60 h-8 z-20">
          <div className="absolute inset-0 bg-white rounded-full"></div>
          
          {/* Frosting decorations */}
          <div className="absolute -bottom-3 left-0 w-full flex justify-around">
            {Array.from({ length: 12 }).map((_, i) => (
              <div 
                key={`frosting-${i}`} 
                className="w-5 h-7 bg-white rounded-b-full"
                style={{ transform: `translateY(${i % 2 ? '30' : '40'}%)` }}
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
              bottom: '51px',
              left: `calc(50% + ${(pos - 0.5) * 40}px)`,
              transform: 'translateX(-50%)'
            }}
          >
            <div className="w-3 h-16 bg-gradient-to-t from-amber-300 to-amber-100 rounded-sm">
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-3 bg-gray-700"></div>
              <div className={`absolute -top-5 left-1/2 transform -translate-x-1/2 w-6 h-8 bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 rounded-full animate-pulse-slow ${isSliced ? 'opacity-0' : ''}`}></div>
            </div>
          </div>
        ))}
        
        {/* Sprinkles */}
        <div className="absolute bottom-43 left-1/2 transform -translate-x-1/2 w-56 h-6 z-40">
          {Array.from({ length: 40 }).map((_, i) => (
            <div 
              key={`sprinkle-${i}`}
              className="absolute rounded-full"
              style={{ 
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 6 + 2}px`,
                left: `${Math.random() * 90 + 5}%`, 
                top: `${Math.random() * 80 + 10}%`,
                transform: `rotate(${Math.random() * 180}deg)`,
                backgroundColor: ['#FF5E78', '#FFD432', '#4BC8EB', '#A1DD70'][Math.floor(Math.random() * 4)]
              }}
            ></div>
          ))}
        </div>
        
        {/* Cake slice (will be animated) */}
        <div 
          className="cake-slice absolute bottom-4 left-[calc(50%+10px)] w-18 h-44 origin-bottom cursor-pointer z-30"
          style={{
            transform: isSliced ? 'translate(50px, 10px) rotate(30deg)' : '',
            transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
          onClick={handleCakeClick}
        >
          {/* Slice shape */}
          <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[25px] border-r-[25px] border-b-[70px] border-l-transparent border-r-transparent border-b-pink-300 transform rotate-180"></div>
          
          {/* Filling in slice */}
          <div className="absolute bottom-[52px] left-0 w-0 h-0 border-l-[25px] border-r-[25px] border-b-[3px] border-l-transparent border-r-transparent border-b-red-300 transform rotate-180"></div>
          
          {/* Top of slice */}
          <div className="absolute bottom-[55px] left-0 w-0 h-0 border-l-[25px] border-r-[25px] border-b-[15px] border-l-transparent border-r-transparent border-b-pink-300 transform rotate-180"></div>
        </div>
      </div>
      
      {/* Cake message */}
      <div className="text-center mt-2 text-md font-medium">
        {isSliced ? (
          <span className="text-pink-500 animate-bounce inline-block">Delicious! 🍰</span>
        ) : (
          <span className="text-gray-600">Click the cake to cut a slice! ✨</span>
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
