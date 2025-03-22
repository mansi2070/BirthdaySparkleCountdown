import { forwardRef, useState, useEffect } from 'react';
import SparkleEffect from '@/components/ui/SparkleEffect';
import EmojiBurst from '@/components/ui/EmojiBurst';

interface MessageSection1Props {
  // Add any props if needed
}

const MessageSection1 = forwardRef<HTMLDivElement, MessageSection1Props>((props, ref) => {
  const [messageVisible, setMessageVisible] = useState(false);

  useEffect(() => {
    // Set up intersection observer to reveal content when section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setMessageVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const sectionRef = ref as React.RefObject<HTMLDivElement>;
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [ref]);

  return (
    <section 
      id="message1" 
      ref={ref}
      className="section flex flex-col items-center justify-center relative bg-gradient-to-bl from-primary/5 to-amber-400/5"
    >
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-xl z-10 message-card">
        <h2 className="text-2xl md:text-4xl font-dancing text-primary mb-6">
          You Make My World Brighter ✨
        </h2>
        <div className="message-content space-y-4">
          <p 
            className={`text-lg transition-opacity duration-500 ${messageVisible ? 'opacity-100' : 'opacity-0'}`}
          >
            Today is all about you—the one who makes my heart race, my mind wander, and my world brighter just by existing. You are truly something special, and I can't help but feel grateful that I get to know someone as amazing as you. 💫
          </p>
        </div>
        
        {/* Emoji burst container with sparkle emoji */}
        <EmojiBurst 
          emoji="✨" 
          count={8}
          trigger={messageVisible ? 'auto' : 'click'}
          autoTriggerDelay={1000}
        />
      </div>
      
      {/* Sparkle background */}
      <SparkleEffect active={messageVisible} />
    </section>
  );
});

MessageSection1.displayName = 'MessageSection1';

export default MessageSection1;
