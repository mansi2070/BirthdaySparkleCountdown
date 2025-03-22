import { useState, useEffect } from 'react';
import SparkleEffect from './SparkleEffect';
import FloatingHearts from './FloatingHearts';

interface JarProps {
  noteText: string;
  onOpen?: () => void;
}

const Jar: React.FC<JarProps> = ({ noteText, onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [revealNote, setRevealNote] = useState(false);

  const handleJarClick = () => {
    setIsOpen(!isOpen);
    
    if (!isOpen) {
      // Opening animation sequence
      setShowSparkles(true);
      
      // Staggered animation for opening
      setTimeout(() => setRevealNote(true), 500);
      setTimeout(() => setShowHearts(true), 1200);
      
      if (onOpen) {
        onOpen();
      }
      
      // End sparkle effect after animation
      setTimeout(() => setShowSparkles(false), 2500);
    } else {
      // Closing animation
      setRevealNote(false);
      setShowHearts(false);
    }
  };

  return (
    <div className="jar mx-auto relative w-72 h-96 cursor-pointer perspective-1000" onClick={handleJarClick}>
      {/* Glass reflections */}
      <div className="absolute inset-8 mt-16 z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-1 h-3/4 bg-white opacity-20 rounded-full transform rotate-12"></div>
        <div className="absolute top-10 left-1/3 w-2 h-1/2 bg-white opacity-10 rounded-full transform -rotate-3"></div>
        <div className="absolute top-5 right-1/4 w-1 h-2/3 bg-white opacity-15 rounded-full transform -rotate-10"></div>
      </div>
      
      {/* Jar body */}
      <div className="jar-body absolute inset-0 mt-16 rounded-2xl bg-cyan-100 bg-opacity-40 border-2 border-cyan-200 backdrop-blur-sm overflow-hidden">
        {/* Glass texture */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 40 }).map((_, i) => (
            <div 
              key={`bubble-${i}`} 
              className="absolute rounded-full bg-white"
              style={{
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7 + 0.3
              }}
            ></div>
          ))}
        </div>
        
        {/* Jar rim */}
        <div className="absolute top-0 left-0 right-0 h-5 bg-cyan-200 border-b-2 border-cyan-300"></div>
        
        {/* Thread on jar rim */}
        <div className="absolute top-5 left-0 right-0 h-3 bg-cyan-200 opacity-50">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={`thread-${i}`} 
              className="absolute h-2 w-1 bg-cyan-300 opacity-40"
              style={{ left: `${i * 5}%`, top: '0px' }}
            ></div>
          ))}
        </div>
      </div>
      
      {/* Jar lid */}
      <div 
        className={`jar-lid absolute top-0 left-0 right-0 h-16 z-20 ${isOpen ? 'open' : ''}`}
        style={{transformStyle: 'preserve-3d'}}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-t-xl border-2 border-cyan-600">
          {/* Lid texture */}
          <div className="absolute inset-1 opacity-20">
            {Array.from({ length: 10 }).map((_, i) => (
              <div 
                key={`lid-texture-${i}`}
                className="absolute h-[2px] bg-cyan-300 opacity-40"
                style={{ 
                  left: '10%', 
                  right: '10%', 
                  top: `${i * 10 + 10}%` 
                }}
              ></div>
            ))}
          </div>
        </div>
        
        {/* Lid top face */}
        <div className="absolute inset-0 h-3 top-0 bg-cyan-400 rounded-t-xl border-b-2 border-cyan-500"></div>
      </div>
      
      {/* Paper notes inside jar */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 w-full h-1/2 perspective-1000 z-10">
        {!isOpen && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => (
              <div 
                key={`paper-${i}`}
                className="absolute bg-white/70 rounded"
                style={{
                  width: `${Math.random() * 30 + 20}px`,
                  height: `${Math.random() * 20 + 15}px`,
                  left: `${Math.random() * 60 + 20}%`,
                  top: `${Math.random() * 60 + 20}%`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                  opacity: 0.8
                }}
              ></div>
            ))}
          </div>
        )}
      </div>
      
      {/* Main note that appears when opened */}
      <div 
        className={`jar-note absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 p-4 rounded-lg z-30 ${revealNote ? 'visible' : ''}`}
      >
        <div className="relative w-full h-full transform rotate-3">
          {/* Note paper with decorative edges */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-amber-100 rounded shadow-lg p-5 transform transition-all duration-500 hover:rotate-2">
            {/* Paper texture */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#0000_0%,#0000_49%,#ddd_50%,#0000_51%,#0000_100%),linear-gradient(to_bottom,#0000_0%,#0000_49%,#ddd_50%,#0000_51%,#0000_100%)] bg-[length:10px_10px,10px_10px] pointer-events-none"></div>
            
            {/* Torn paper edge effect */}
            <div className="absolute -top-1 left-0 right-0 h-2 bg-amber-50">
              {Array.from({ length: 40 }).map((_, i) => (
                <div 
                  key={`torn-top-${i}`}
                  className="absolute bottom-0 w-2 bg-amber-50"
                  style={{
                    height: `${Math.random() * 5 + 1}px`,
                    left: `${i * 2.5}%`
                  }}
                ></div>
              ))}
            </div>
            
            <div className="absolute -bottom-1 left-0 right-0 h-2 bg-amber-50">
              {Array.from({ length: 40 }).map((_, i) => (
                <div 
                  key={`torn-bottom-${i}`}
                  className="absolute top-0 w-2 bg-amber-50"
                  style={{
                    height: `${Math.random() * 5 + 1}px`,
                    left: `${i * 2.5}%`
                  }}
                ></div>
              ))}
            </div>
            
            {/* Note content */}
            <div className="h-full flex flex-col justify-center overflow-auto">
              <h3 className="font-dancing text-xl text-pink-500 mb-2 text-center">Special Note</h3>
              <p className="font-accent text-lg text-dark leading-tight text-center">
                {noteText}
              </p>
              <div className="text-center mt-4">
                <span className="inline-block text-pink-500 text-lg">♥♥♥</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Instructions */}
      <div className="absolute -bottom-8 left-0 right-0 text-center text-sm text-gray-600">
        {isOpen ? "Click to close jar" : "Click to open jar"}
      </div>
      
      {/* Effects */}
      {showSparkles && (
        <div className="absolute inset-0 pointer-events-none z-40">
          <SparkleEffect active={true} frequency={40} duration={2} />
        </div>
      )}
      
      {showHearts && (
        <div className="absolute inset-0 pointer-events-none z-30">
          <FloatingHearts count={12} emojis={['💕', '💓', '💘']} />
        </div>
      )}
    </div>
  );
};

export default Jar;
