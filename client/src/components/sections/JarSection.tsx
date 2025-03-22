import { forwardRef, useState } from 'react';
import Jar from '@/components/ui/Jar';
import Confetti from '@/components/ui/Confetti';

interface JarSectionProps {
  // Add any props if needed
}

const JarSection = forwardRef<HTMLDivElement, JarSectionProps>((props, ref) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const specialNote = "I have never been lucky in my entire life till you came into my life. I feel so lucky. ❤️";

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
