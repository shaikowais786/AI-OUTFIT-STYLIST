import React from 'react';

interface HeaderProps {
    onGoHome: () => void;
    isAppView: boolean;
    hasResult?: boolean;
    onStartOver?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onGoHome, isAppView, hasResult, onStartOver }) => {
  return (
    <header className="w-full p-4 bg-[#0b0b0b] bg-opacity-80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div 
          className="text-2xl font-bold tracking-wider cursor-pointer"
          onClick={onGoHome}
        >
          IMΛM <span className="text-[#d4af37]">Stylist</span>
        </div>
        <nav className="flex items-center space-x-4">
          {isAppView && hasResult && (
            <button
              onClick={onStartOver}
              className="text-sm font-bold text-[#0b0b0b] bg-[#d4af37] px-4 py-2 rounded-lg hover:bg-yellow-500 transition-all transform hover:scale-105"
            >
              Start Again
            </button>
          )}
          {isAppView && (
            <button 
              onClick={onGoHome}
              className="text-sm font-medium text-gray-300 hover:text-[#d4af37] transition-colors"
            >
              Home
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;