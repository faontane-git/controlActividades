import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../src/recursos/logo.png';
import { FiLogOut } from 'react-icons/fi';

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí iría la lógica para cerrar sesión
    console.log('Sesión cerrada');
    navigate('/login'); // Redirige a la página de login
  };

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center h-20 bg-white/95 backdrop-blur-md border-b border-gray-100 z-50 shadow-sm">
      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src={logo} 
              alt="Logo" 
              className="h-10 w-auto transition-opacity hover:opacity-80"
            />
          </div>

          {/* Botón de Cerrar Sesión */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
            aria-label="Cerrar sesión"
          >
            <FiLogOut className="text-lg" />
            <span className="hidden sm:inline-block font-medium">Cerrar sesión</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;