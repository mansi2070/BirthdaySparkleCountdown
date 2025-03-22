import { useState } from 'react';

interface JarProps {
  noteText: string;
  onOpen?: () => void;
}

const Jar: React.FC<JarProps> = ({ noteText, onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleJarClick = () => {
    setIsOpen(!isOpen);
    if (!isOpen && onOpen) {
      onOpen();
    }
  };

  return (
    <div className="jar mx-auto relative w-64 h-80 cursor-pointer" onClick={handleJarClick}>
      {/* Jar body */}
      <div className="jar-body absolute inset-0 mt-10 rounded-2xl bg-blue-100 bg-opacity-50 border-2 border-blue-200"></div>
      
      {/* Jar lid */}
      <div className={`jar-lid absolute top-0 left-0 right-0 h-16 bg-blue-300 rounded-t-xl border-2 border-blue-400 ${isOpen ? 'open' : ''}`}></div>
      
      {/* Note inside jar */}
      <div className={`jar-note absolute top-1/2 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-amber-100/20 p-4 rounded-lg ${isOpen ? 'visible' : ''}`}>
        <div className="bg-white p-3 rounded shadow-inner h-full overflow-auto">
          <p className="font-accent text-lg text-primary leading-tight">
            {noteText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Jar;
