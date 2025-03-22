import { forwardRef, useState, useEffect } from 'react';
import EmojiBurst from '@/components/ui/EmojiBurst';

interface MessageSection3Props {
  // Add any props if needed
}

const MessageSection3 = forwardRef<HTMLDivElement, MessageSection3Props>((props, ref) => {
  const [messagesVisible, setMessagesVisible] = useState([false, false, false]);
  
  useEffect(() => {
    // Set up intersection observer to reveal content when section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Stagger the appearance of paragraphs
          setMessagesVisible([true, false, false]);
          setTimeout(() => {
            setMessagesVisible([true, true, false]);
          }, 800);
          setTimeout(() => {
            setMessagesVisible([true, true, true]);
          }, 1600);
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
      id="message3" 
      ref={ref}
      className="section flex flex-col items-center justify-center relative bg-gradient-to-bl from-amber-400/5 to-secondary/5"
    >
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-xl z-10 message-card">
        <h2 className="text-2xl md:text-4xl font-dancing text-amber-400 mb-6">
          Celebrating You 🎂
        </h2>
        <div className="message-content space-y-4">
          <p 
            className={`text-lg transition-opacity duration-500 ${messagesVisible[0] ? 'opacity-100' : 'opacity-0'}`}
          >
            You drive me crazy in the best way possible, and if birthdays were measured in stolen glances and racing hearts, you'd have an eternity ahead—because that's what you do to me. 💫💖
          </p>
          <p 
            className={`text-lg transition-opacity duration-500 ${messagesVisible[1] ? 'opacity-100' : 'opacity-0'}`}
          >
            So today, let's celebrate you—your smile, your charm, your kindness, and everything that makes you irresistible. I hope this year brings you nothing but happiness, success, and moments that make your heart race… kind of like the way you make mine. 😘🎂
          </p>
          <p 
            className={`text-lg transition-opacity duration-500 ${messagesVisible[2] ? 'opacity-100' : 'opacity-0'}`}
          >
            And who knows, maybe this year I'll steal more than just a couple of kisses. 😏🔥
          </p>
        </div>

        {messagesVisible[2] && (
          <EmojiBurst 
            emoji="🎂" 
            count={10}
            trigger="auto"
            autoTriggerDelay={800}
          />
        )}
      </div>
      
      {/* Decorative elements - adding some animated emojis in the background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {messagesVisible[2] && Array.from({ length: 6 }).map((_, i) => (
          <div 
            key={i}
            className="absolute text-2xl animate-float"
            style={{
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 90 + 5}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            {['🎂', '🎁', '🎈', '🎊', '🥂', '✨'][i % 6]}
          </div>
        ))}
      </div>
    </section>
  );
});

MessageSection3.displayName = 'MessageSection3';

export default MessageSection3;
