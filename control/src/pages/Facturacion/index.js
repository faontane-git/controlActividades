import React from 'react';
import { useNavigate } from 'react-router-dom';

const FacturacionPage = () => {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-6 font-sans">
      {/* Header */}
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
        Menú de Facturación
      </h1>

      {/* Button Group */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl w-full">
        {/* Generar Factura */}
        <button
          onClick={() => handleNavigation('/factura')}
          className="bg-blue-600 text-white px-8 py-4 rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Generar Factura"
        >
          <span className="block text-xl font-semibold">Generar Factura</span>
          <span className="block text-sm text-blue-100 mt-1">
            Crear nuevas facturas
          </span>
        </button>

        {/* Crear Productos */}
        <button
          onClick={() => handleNavigation('/productos')}
          className="bg-green-600 text-white px-8 py-4 rounded-xl shadow-lg hover:bg-green-700 hover:shadow-xl transition-all transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          aria-label="Crear Productos"
        >
          <span className="block text-xl font-semibold">Crear Productos</span>
          <span className="block text-sm text-green-100 mt-1">
            Gestionar productos
          </span>
        </button>

        {/* Ver Histórico */}
        <button
          onClick={() => handleNavigation('/historico')}
          className="bg-purple-600 text-white px-8 py-4 rounded-xl shadow-lg hover:bg-purple-700 hover:shadow-xl transition-all transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          aria-label="Ver Histórico"
        >
          <span className="block text-xl font-semibold">Ver Histórico</span>
          <span className="block text-sm text-purple-100 mt-1">
            Consultar facturas anteriores
          </span>
        </button>
      </div>
    </div>
  );
};

export default FacturacionPage;