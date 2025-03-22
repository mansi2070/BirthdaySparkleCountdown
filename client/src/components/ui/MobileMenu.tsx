import React from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  scrollToSection: (sectionId: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, setIsOpen, scrollToSection }) => {
  const sections = [
    { id: 'intro', label: 'Intro' },
    { id: 'countdown', label: 'Countdown' },
    { id: 'message1', label: 'Message 1' },
    { id: 'message2', label: 'Message 2' },
    { id: 'message3', label: 'Message 3' },
    { id: 'jar', label: 'Special Note' }
  ];

  const handleSectionClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-4 right-4 z-40 md:hidden">
        <button 
          className="bg-white p-2 rounded-full shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <i className="fas fa-bars text-primary text-xl"></i>
        </button>
      </div>

      {/* Mobile menu */}
      <div 
        className={`fixed inset-0 bg-white bg-opacity-95 z-30 transform transition-transform duration-300 md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
          <button 
            className="absolute top-4 right-4"
            onClick={() => setIsOpen(false)}
          >
            <i className="fas fa-times text-primary text-xl"></i>
          </button>
          
          {sections.map(section => (
            <button
              key={section.id}
              data-target={section.id}
              className="text-xl font-dancing text-primary mobile-nav-item"
              onClick={() => handleSectionClick(section.id)}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
