import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../src/recursos/logo.png';
import {
  FiLogOut,
  FiUser,
  FiChevronDown,
  FiMenu,
  FiX,
  FiHome,
  FiSettings,
  FiActivity,
  FiAward,
  FiFolder,
  FiFileText,
  FiUsers,
  FiBriefcase,
  FiDollarSign
} from 'react-icons/fi';

const NavBar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    console.log('Sesión cerrada');
    navigate('/login');
  };

  return (
    <>
      {/* Barra de navegación superior */}
      <nav className="fixed top-0 left-0 w-full flex items-center h-20 bg-white/95 backdrop-blur-md border-b border-gray-100 z-50 shadow-sm">
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-gray-700 text-2xl ml-3"
        >
          <FiMenu />
        </button>
        <img
          src={logo}
          alt="Logo"
          className="h-10 ml-3 w-auto transition-opacity hover:opacity-80 cursor-pointer"
          onClick={() => navigate('/main')}
        />

        <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-2">
          <div className="flex items-center gap-1 pl-2">
          </div>

          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <FiUser className="text-gray-700" size={20} />
              <span className="text-gray-700">Cuenta</span>
              <FiChevronDown className="text-gray-500" size={16} />
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                <button onClick={() => navigate('/perfil')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">Perfil</button>
                <button onClick={() => navigate('/certificados')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">Mis Certificados</button>
                <button onClick={() => navigate('/configuracion')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">Configuración</button>
                <button onClick={handleLogout} className="block px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left">Cerrar sesión</button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Menú lateral con opción de Productos */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform z-50`}>
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Menú</h2>
          <button onClick={() => setSidebarOpen(false)} className="text-gray-700 text-2xl">
            <FiX />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          <button onClick={() => navigate('/main')} className="flex items-center w-full p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
            <FiHome className="mr-3" /> Inicio
          </button>

          <button onClick={() => navigate('/personal')} className="flex items-center w-full p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
            <FiUsers className="mr-3" /> Administrar Personal
          </button>

          <button onClick={() => navigate('/clientes')} className="flex items-center w-full p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
            <FiBriefcase className="mr-3" /> Clientes
          </button>

          {/* Nueva opción: Productos */}
          <button onClick={() => navigate('/productos')} className="flex items-center w-full p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
            <FiActivity className="mr-3" /> Productos
          </button>

          <button onClick={() => navigate('/proyectos')} className="flex items-center w-full p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
            <FiFolder className="mr-3" /> Proyectos
          </button>

          <button onClick={() => navigate('/cotizar')} className="flex items-center w-full p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
            <FiDollarSign className="mr-3" /> Cotizar
          </button>

          <button onClick={() => navigate('/facturador')} className="flex items-center w-full p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
            <FiFileText className="mr-3" /> Facturador
          </button>

          <button onClick={() => navigate('/configuracion')} className="flex items-center w-full p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
            <FiSettings className="mr-3" /> Configuración
          </button>
        </nav>
      </div>

      {/* Fondo oscuro al abrir el menú lateral */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={() => setSidebarOpen(false)}></div>
      )}
    </>
  );
};

export default NavBar;
