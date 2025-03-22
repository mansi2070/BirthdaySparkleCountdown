import { forwardRef, useState, useEffect } from 'react';
import CountdownTimer from '@/components/ui/CountdownTimer';
import CakeAnimation from '@/components/ui/CakeAnimation';
import Confetti from '@/components/ui/Confetti';
import EmojiBurst from '@/components/ui/EmojiBurst';
import FloatingHearts from '@/components/ui/FloatingHearts';
import { getBirthdayDate } from '@/lib/birthdayUtils';

interface CountdownSectionProps {
  // Add any props if needed
}

const CountdownSection = forwardRef<HTMLDivElement, CountdownSectionProps>((props, ref) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [celebrationText, setCelebrationText] = useState(false);
  const birthdayDate = getBirthdayDate();

  const handleCountdownComplete = () => {
    // Start celebration sequence
    setShowConfetti(true);
    
    // Staggered animations
    setTimeout(() => setShowEmojis(true), 500);
    setTimeout(() => setShowHearts(true), 1000);
    setTimeout(() => setCelebrationText(true), 1500);
    
    // Automatically trigger cake cut animation
    document.querySelector('.cake-slice')?.dispatchEvent(
      new Event('click', { bubbles: true })
    );
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
      className={`section flex flex-col items-center justify-center relative bg-gradient-to-br from-secondary/10 to-amber-400/10 ${showConfetti ? 'bg-celebration' : ''}`}
    >
      <div className="text-center z-10 px-6 max-w-4xl">
        <h2 className="text-3xl md:text-5xl font-dancing text-secondary mb-8">
          Counting Down to Your Special Day
        </h2>
        
        {/* Countdown Timer */}
        <CountdownTimer 
          targetDate={birthdayDate} 
          onComplete={handleCountdownComplete} 
        />
        
        {/* Cake Animation */}
        <CakeAnimation onCut={handleCakeCut} />
        
        {celebrationText && (
          <div className="mt-8 celebration-text animate-bounce">
            <h3 className="text-2xl md:text-4xl font-dancing text-primary mb-3">
              💖 Happy Birthday! 💖
            </h3>
            <p className="text-lg md:text-xl">
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
      
      {showEmojis && (
        <div className="absolute inset-0 pointer-events-none">
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
      
      {showHearts && <FloatingHearts count={20} emojis={['💖', '💓', '💕', '💗', '💘']} />}
    </section>
  );
});

CountdownSection.displayName = 'CountdownSection';

export default CountdownSection;
