import { useState, useEffect } from 'react';

// Function to get the target birthday date
// Set birthday countdown to 10 seconds from now
export const getBirthdayDate = (): Date => {
  const birthdayDate = new Date();
  birthdayDate.setSeconds(birthdayDate.getSeconds() + 10); // 10 seconds from now
  return birthdayDate;
};

// Custom hook for checking if an element is in view
export const useInView = (options = { threshold: 0.3 }) => {
  const [isInView, setIsInView] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, options.threshold]);

  return [setRef, isInView];
};

// Helper to generate a staggered animation for multiple elements
export const createStaggeredReveal = (count: number, delay = 500) => {
  // This hook must be used within a component
  const [visible, setVisible] = useState<boolean[]>(Array(count).fill(false));

  const reveal = () => {
    const newVisible = [...visible];
    
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        newVisible[i] = true;
        setVisible([...newVisible]);
      }, i * delay);
    }
  };

  return { visible, reveal };
};
