import { useState } from 'react';

interface CakeAnimationProps {
  onCut?: () => void;
}

const CakeAnimation: React.FC<CakeAnimationProps> = ({ onCut }) => {
  const [isSliced, setIsSliced] = useState(false);

  const handleCakeClick = () => {
    if (!isSliced) {
      setIsSliced(true);
      if (onCut) {
        onCut();
      }
    }
  };

  return (
    <div className="mt-16 relative">
      <div className="w-64 h-64 mx-auto relative">
        {/* Cake base */}
        <div className="cake-base absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-32 bg-pink-200 rounded-lg"></div>
        
        {/* Cake top */}
        <div className="cake-top absolute bottom-32 left-1/2 transform -translate-x-1/2 w-56 h-12 bg-pink-300 rounded-lg"></div>
        
        {/* Cake candle */}
        <div className="cake-candle absolute bottom-44 left-1/2 transform -translate-x-1/2 w-4 h-16 bg-amber-400"></div>
        
        {/* Cake flame */}
        <div className="absolute bottom-60 left-1/2 transform -translate-x-1/2 w-6 h-8 bg-yellow-500 rounded-full animate-pulse-slow"></div>
        
        {/* Cake slice (will be animated) */}
        <div 
          className="cake-slice absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-44 bg-pink-100 origin-bottom cursor-pointer"
          style={isSliced ? { transform: 'translate(-130%, 20%) rotate(-30deg)' } : {}}
          onClick={handleCakeClick}
        ></div>
      </div>
    </div>
  );
};

export default CakeAnimation;
