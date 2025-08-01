import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/Navbar';
import {
  FiSettings, FiBriefcase, FiDollarSign, FiActivity,
  FiUsers, FiFileText, FiFolder
} from 'react-icons/fi';
import { useAuth } from '../../AuthContext';

const MainPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user.admin) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <h1 className="text-2xl font-bold text-red-600">Acceso denegado</h1>
        <p className="text-gray-700">No tienes permisos para acceder a esta página.</p>
      </div>
    );
  }

  const opciones = [
    { icon: FiUsers, label: 'Personal', path: '/personal' },
    { icon: FiBriefcase, label: 'Clientes', path: '/clientes' },
    { icon: FiActivity, label: 'Productos', path: '/productos' },
    { icon: FiFolder, label: 'Proyectos', path: '/proyectos' },
    { icon: FiDollarSign, label: 'Cotizar', path: '/cotizar' },
    { icon: FiFileText, label: 'Facturador', path: '/facturador' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="pt-24 px-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">Panel de administración</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {opciones.map(({ icon: Icon, label, path }) => (
            <div
              key={label}
              onClick={() => navigate(path)}
              className="cursor-pointer p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300 text-center group"
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-blue-50 group-hover:bg-blue-100 transition duration-300">
                  <Icon className="text-blue-600 group-hover:text-blue-800" size={28} />
                </div>
              </div>
              <h2 className="text-lg font-semibold text-gray-700 group-hover:text-blue-700 transition">{label}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
