import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full p-6 mt-12 bg-black bg-opacity-30 border-t border-gray-800">
      <div className="max-w-7xl mx-auto text-center text-gray-400 text-sm">
        <p className="font-bold text-base text-gray-300 mb-2">Powered by IMAM Stylist</p>
        <p>&copy; {new Date().getFullYear()} IMAM Stylist. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
