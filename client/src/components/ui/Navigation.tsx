import React from 'react';

interface NavigationProps {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, scrollToSection }) => {
  const sections = [
    { id: 'intro', label: 'Intro' },
    { id: 'countdown', label: 'Countdown' },
    { id: 'message1', label: 'Message 1' },
    { id: 'message2', label: 'Message 2' },
    { id: 'message3', label: 'Message 3' },
    { id: 'jar', label: 'Special Note' },
    { id: 'apology', label: 'Apology' }
  ];

  return (
    <div className="fixed right-5 top-1/2 transform -translate-y-1/2 z-40 hidden md:block">
      <div className="flex flex-col space-y-4">
        {sections.map(section => (
          <button
            key={section.id}
            data-target={section.id}
            className={`w-3 h-3 rounded-full bg-primary transition-opacity ${
              activeSection === section.id ? 'opacity-100' : 'opacity-50 hover:opacity-100'
            }`}
            onClick={() => scrollToSection(section.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Navigation;
