import { forwardRef, useState, useEffect } from 'react';
import FloatingHearts from '@/components/ui/FloatingHearts';

interface MessageSection2Props {
  // Add any props if needed
}

const MessageSection2 = forwardRef<HTMLDivElement, MessageSection2Props>((props, ref) => {
  const [messagesVisible, setMessagesVisible] = useState([false, false]);

  useEffect(() => {
    // Set up intersection observer to reveal content when section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Stagger the appearance of paragraphs
          setMessagesVisible([true, false]);
          setTimeout(() => {
            setMessagesVisible([true, true]);
          }, 800);
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
      id="message2" 
      ref={ref}
      className="section flex flex-col items-center justify-center relative bg-gradient-to-tr from-secondary/5 to-primary/5"
    >
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-xl z-10 message-card">
        <h2 className="text-2xl md:text-4xl font-dancing text-secondary mb-6">
          From the Heart 💗
        </h2>
        <div className="message-content space-y-4">
          <p 
            className={`text-lg transition-opacity duration-500 ${messagesVisible[0] ? 'opacity-100' : 'opacity-0'}`}
          >
            I also just want to take a moment to say I'm sorry for any mistakes I've made in the past. I know I'm not perfect, but my feelings for you are real, and I never want anything to come between us. You mean so much to me, and if I could turn back time, I'd only change one thing—I'd hold you a little closer and never let go. 💖
          </p>
          <p 
            className={`text-lg transition-opacity duration-500 ${messagesVisible[1] ? 'opacity-100' : 'opacity-0'}`}
          >
            But since I can't turn back time, how about this? I promise to make it up to you… one stolen kiss at a time. 😉🔥 And don't worry, I'll give them back… eventually. 😏
          </p>
        </div>
      </div>
      
      {/* Floating hearts with different emojis */}
      <FloatingHearts count={6} emojis={['💗', '💖', '💘', '💝']} />
    </section>
  );
});

MessageSection2.displayName = 'MessageSection2';

export default MessageSection2;
