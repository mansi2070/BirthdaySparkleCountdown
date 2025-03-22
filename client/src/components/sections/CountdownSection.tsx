import { forwardRef, useState, useEffect } from 'react';
import CountdownTimer from '@/components/ui/CountdownTimer';
import CakeAnimation from '@/components/ui/CakeAnimation';
import Confetti from '@/components/ui/Confetti';
import EmojiBurst from '@/components/ui/EmojiBurst';
import SparkleEffect from '@/components/ui/SparkleEffect';
import { getBirthdayDate } from '@/lib/birthdayUtils';

interface CountdownSectionProps {
  onCountdownComplete?: () => void; // Callback to notify App when countdown is complete
}

const CountdownSection = forwardRef<HTMLDivElement, CountdownSectionProps>(({ onCountdownComplete }, ref) => {
  // Celebration states
  const [showConfetti, setShowConfetti] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const [celebrationText, setCelebrationText] = useState(false);
  const [celebrationMode, setCelebrationMode] = useState(false);
  const [secondWaveConfetti, setSecondWaveConfetti] = useState(false);
  const [thirdWaveEmojis, setThirdWaveEmojis] = useState(false);
  
  const birthdayDate = getBirthdayDate();

  const handleCountdownComplete = () => {
    // Start celebration sequence
    setCelebrationMode(true);
    setShowConfetti(true);
    
    // Create an ultra festive celebration sequence with multiple waves
    const sequence = [
      { effect: 'firstWave', delay: 0 },
      { effect: 'sparkles', delay: 300 },
      { effect: 'emojis', delay: 500 },
      { effect: 'text', delay: 1000 },
      { effect: 'secondWaveConfetti', delay: 2000 },
      { effect: 'thirdWaveEmojis', delay: 3000 },
      { effect: 'cakeCut', delay: 1200 }
    ];
    
    // Execute each animation in sequence
    sequence.forEach(item => {
      setTimeout(() => {
        switch(item.effect) {
          case 'firstWave':
            setShowConfetti(true);
            break;
          case 'sparkles':
            setShowSparkles(true);
            break;
          case 'emojis':
            setShowEmojis(true);
            break;
          case 'text':
            setCelebrationText(true);
            break;
          case 'secondWaveConfetti':
            setSecondWaveConfetti(true);
            break;
          case 'thirdWaveEmojis':
            setThirdWaveEmojis(true);
            break;
          case 'cakeCut':
            // Automatically trigger cake cut animation
            const cakeElement = document.querySelector('.cake-slice');
            if (cakeElement) {
              cakeElement.dispatchEvent(new Event('click', { bubbles: true }));
            }
            break;
        }
      }, item.delay);
    });
    
    // Notify parent component that countdown is complete for app-wide celebrations
    if (onCountdownComplete) {
      onCountdownComplete();
    }
    
    // Dispatch a global event that other components can listen for
    window.dispatchEvent(new CustomEvent('countdown-finished'));
    
    // Add celebration class to body for global effects
    document.body.classList.add('celebration-mode');
    
    // Add festive background color transitions
    document.documentElement.style.setProperty('--celebration-color-1', 'rgba(255, 105, 180, 0.1)');
    document.documentElement.style.setProperty('--celebration-color-2', 'rgba(255, 223, 0, 0.1)');
  };

  const handleCakeCut = () => {
    if (!showConfetti) {
      setShowConfetti(true);
      setTimeout(() => setShowEmojis(true), 500);
    }
  };

  return (
    <section 
      id="countdown" 
      ref={ref}
      className={`
        section flex flex-col items-center justify-center relative 
        transition-all duration-1000 ease-in-out
        ${celebrationMode ? 
          'bg-gradient-to-br from-pink-100/70 to-yellow-100/70 shadow-lg' : 
          'bg-gradient-to-br from-secondary/10 to-amber-400/10'}
      `}
    >
      {/* Animated background when in celebration mode */}
      {celebrationMode && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="celebration-bg-1 absolute inset-0 opacity-30"></div>
          <div className="celebration-bg-2 absolute inset-0 opacity-20"></div>
        </div>
      )}
      
      <div className="text-center z-10 px-6 max-w-4xl">
        <h2 className={`text-3xl md:text-5xl font-dancing mb-8 transition-colors duration-500 ${celebrationMode ? 'text-primary' : 'text-secondary'}`}>
          {celebrationMode ? "🎉 It's Here! 🎉" : "Counting Down to Your Special Day"}
        </h2>
        
        {/* Countdown Timer */}
        <CountdownTimer 
          targetDate={birthdayDate} 
          onComplete={handleCountdownComplete} 
        />
        
        {/* Cake Animation */}
        <CakeAnimation onCut={handleCakeCut} />
        
        {celebrationText && (
          <div className="mt-8 celebration-text animate-pulse-slow">
            <h3 className="text-2xl md:text-5xl font-dancing text-primary mb-3 transition-all duration-1000">
              💖 Happy Birthday! 💖
            </h3>
            <p className="text-lg md:text-2xl">
              Today is your special day! Time to celebrate!
            </p>
          </div>
        )}
        
        {!celebrationText && (
          <p className="mt-8 text-lg">Let's make this year's celebration the most special one yet!</p>
        )}
      </div>
      
      {/* Celebration elements */}
      <Confetti active={showConfetti} count={150} />
      {secondWaveConfetti && <Confetti active={true} count={200} />}
      
      {/* Sparkle effect */}
      {showSparkles && (
        <div className="absolute inset-0 pointer-events-none z-20">
          <SparkleEffect active={true} frequency={30} duration={3} />
        </div>
      )}
      
      {/* First wave of emoji bursts */}
      {showEmojis && (
        <div className="absolute inset-0 pointer-events-none z-20">
          <EmojiBurst 
            emoji="🎂" 
            count={15}
            trigger="auto"
            autoTriggerDelay={100}
            containerClassName="absolute top-1/4 left-1/4"
          />
          <EmojiBurst 
            emoji="🎉" 
            count={15}
            trigger="auto"
            autoTriggerDelay={300}
            containerClassName="absolute top-1/4 right-1/4"
          />
          <EmojiBurst 
            emoji="🎈" 
            count={15}
            trigger="auto"
            autoTriggerDelay={500}
            containerClassName="absolute bottom-1/4 left-1/3"
          />
          <EmojiBurst 
            emoji="✨" 
            count={15}
            trigger="auto"
            autoTriggerDelay={700}
            containerClassName="absolute bottom-1/3 right-1/3"
          />
        </div>
      )}
      
      {/* Third wave of emoji bursts */}
      {thirdWaveEmojis && (
        <div className="absolute inset-0 pointer-events-none z-30">
          <EmojiBurst 
            emoji="🥳" 
            count={20}
            trigger="auto"
            autoTriggerDelay={100}
            containerClassName="absolute top-1/2 left-1/2"
          />
          <EmojiBurst 
            emoji="🎊" 
            count={15}
            trigger="auto"
            autoTriggerDelay={200}
            containerClassName="absolute top-1/3 right-1/2"
          />
          <EmojiBurst 
            emoji="🎀" 
            count={10}
            trigger="auto"
            autoTriggerDelay={300}
            containerClassName="absolute bottom-1/2 left-1/4"
          />
          <EmojiBurst 
            emoji="🌸" 
            count={15}
            trigger="auto"
            autoTriggerDelay={400}
            containerClassName="absolute bottom-1/3 right-1/4"
          />
        </div>
      )}
      
      {/* Bottom burst when in celebration mode */}
      {celebrationMode && (
        <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none overflow-hidden">
          <div className="celebration-bottom-burst w-full h-20 opacity-50"></div>
        </div>
      )}
    </section>
  );
});

CountdownSection.displayName = 'CountdownSection';

export default CountdownSection;