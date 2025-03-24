import React from 'react';
import logo from '../../../src/recursos/logo.png';

const NavBar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-center h-20 bg-white/95 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="w-full max-w-7xl px-6">
        <div className="flex items-center">
          <img 
            src={logo} 
            alt="Logo" 
            className="h-10 w-auto transition-opacity hover:opacity-80"
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;