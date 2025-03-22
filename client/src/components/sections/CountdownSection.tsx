import { forwardRef, useState } from 'react';
import CountdownTimer from '@/components/ui/CountdownTimer';
import CakeAnimation from '@/components/ui/CakeAnimation';
import Confetti from '@/components/ui/Confetti';
import { getBirthdayDate } from '@/lib/birthdayUtils';

interface CountdownSectionProps {
  // Add any props if needed
}

const CountdownSection = forwardRef<HTMLDivElement, CountdownSectionProps>((props, ref) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const birthdayDate = getBirthdayDate();

  const handleCountdownComplete = () => {
    setShowConfetti(true);
  };

  const handleCakeCut = () => {
    setShowConfetti(true);
  };

  return (
    <section 
      id="countdown" 
      ref={ref}
      className="section flex flex-col items-center justify-center relative bg-gradient-to-br from-secondary/10 to-amber-400/10"
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
        
        <p className="mt-8 text-lg">Let's make this year's celebration the most special one yet!</p>
      </div>
      
      {/* Conditional Confetti */}
      <Confetti active={showConfetti} count={30} />
    </section>
  );
});

CountdownSection.displayName = 'CountdownSection';

export default CountdownSection;
