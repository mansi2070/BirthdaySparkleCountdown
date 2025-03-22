import { forwardRef } from 'react';
import TypewriterEffect from '@/components/ui/TypewriterEffect';
import FloatingHearts from '@/components/ui/FloatingHearts';

interface IntroSectionProps {
  // Add any props if needed
}

const IntroSection = forwardRef<HTMLDivElement, IntroSectionProps>((props, ref) => {
  return (
    <section 
      id="intro" 
      ref={ref}
      className="section flex flex-col items-center justify-center relative bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden"
    >
      <div className="text-center px-6 z-10 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-dancing font-bold text-primary">
          <TypewriterEffect 
            text="Happy Birthday, my love! 🎉💖" 
            speed={150}
            onComplete={() => {
              // Fade in intro text after typing is complete
              const introText = document.getElementById('intro-text');
              if (introText) {
                introText.classList.add('opacity-100');
                introText.style.transition = 'opacity 1s ease';
              }
            }}
          />
        </h1>
        <p 
          id="intro-text" 
          className="mt-6 text-lg md:text-xl opacity-0"
        >
          Today is all about celebrating the most amazing person in my life - YOU!
        </p>
        <div className="mt-8 animate-bounce-slow">
          <i className="fas fa-chevron-down text-2xl text-primary scroll-indicator"></i>
        </div>
      </div>
      
      <FloatingHearts count={8} emojis={['❤️']} />
    </section>
  );
});

IntroSection.displayName = 'IntroSection';

export default IntroSection;
