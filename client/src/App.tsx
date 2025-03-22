import { useEffect, useRef, useState } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";

import IntroSection from "@/components/sections/IntroSection";
import CountdownSection from "@/components/sections/CountdownSection";
import MessageSection1 from "@/components/sections/MessageSection1";
import MessageSection2 from "@/components/sections/MessageSection2";
import MessageSection3 from "@/components/sections/MessageSection3";
import JarSection from "@/components/sections/JarSection";
import Navigation from "@/components/ui/Navigation";
import MobileMenu from "@/components/ui/MobileMenu";
import Confetti from "@/components/ui/Confetti";

function BirthdaySurprise() {
  const [location, setLocation] = useLocation();
  const sectionRefs = {
    intro: useRef<HTMLDivElement>(null),
    countdown: useRef<HTMLDivElement>(null),
    message1: useRef<HTMLDivElement>(null),
    message2: useRef<HTMLDivElement>(null),
    message3: useRef<HTMLDivElement>(null),
    jar: useRef<HTMLDivElement>(null)
  };
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("intro");
  const [showInitialConfetti, setShowInitialConfetti] = useState(false);

  useEffect(() => {
    // Trigger initial confetti after a short delay
    const timer = setTimeout(() => {
      setShowInitialConfetti(true);
    }, 1000);

    // Setup intersection observer for sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveSection(id);
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe all sections
    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = sectionRefs[sectionId as keyof typeof sectionRefs]?.current;
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="font-body text-dark">
      {/* Confetti Container */}
      <Confetti active={showInitialConfetti} />
      
      {/* Navigation */}
      <Navigation 
        activeSection={activeSection} 
        scrollToSection={scrollToSection} 
      />
      
      {/* Mobile Menu Button & Menu */}
      <MobileMenu 
        isOpen={isMenuOpen} 
        setIsOpen={setIsMenuOpen} 
        scrollToSection={scrollToSection} 
      />
      
      {/* Main Content Sections */}
      <IntroSection ref={sectionRefs.intro} />
      <CountdownSection ref={sectionRefs.countdown} />
      <MessageSection1 ref={sectionRefs.message1} />
      <MessageSection2 ref={sectionRefs.message2} />
      <MessageSection3 ref={sectionRefs.message3} />
      <JarSection ref={sectionRefs.jar} />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BirthdaySurprise />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
