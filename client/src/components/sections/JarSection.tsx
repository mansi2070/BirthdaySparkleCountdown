import { forwardRef, useState } from 'react';
import Jar from '@/components/ui/Jar';
import Confetti from '@/components/ui/Confetti';

interface JarSectionProps {
  // Add any props if needed
}

const JarSection = forwardRef<HTMLDivElement, JarSectionProps>((props, ref) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const specialNote = `I'm sorry...
  
I'm sorry for not being enough for you.
I'm sorry for stressing you out.
I'm sorry for putting extra pain on you when you already hurting because of me.
For overthinking so much.
For not being able to treat you right.
For not being the best.
For hurting you.
For everything...

I just felt comforted around you,
Nobody ever made me feel wanted like you did. ❤️`;

  const handleJarOpen = () => {
    setShowConfetti(true);
  };

  return (
    <section 
      id="jar" 
      ref={ref}
      className="section flex flex-col items-center justify-center relative bg-gradient-to-br from-primary/10 to-secondary/10"
    >
      <div className="text-center max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-dancing text-primary mb-8">
          A Special Note Just For You
        </h2>
        <p className="mb-10 text-lg">Click on the jar to see what's inside...</p>
        
        {/* Interactive Jar */}
        <Jar noteText={specialNote} onOpen={handleJarOpen} />
        
        <p className="mt-16 text-lg md:text-xl font-dancing text-primary">
          Thank you for being the most amazing part of my life!
        </p>
      </div>
      
      {/* Confetti when jar is opened */}
      <Confetti active={showConfetti} count={30} />
    </section>
  );
});

JarSection.displayName = 'JarSection';

export default JarSection;
