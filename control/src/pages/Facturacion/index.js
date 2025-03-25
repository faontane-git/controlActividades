import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiFileText, FiPackage, FiArchive, FiArrowLeft } from 'react-icons/fi';
import NavBar from '../NavBar/Navbar';

const FacturacionPage = () => {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };

  const handleBack = () => {
    navigate(-1); // Regresa a la página anterior
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans">
      <NavBar />

      <div className="pt-28 pb-10 px-6 max-w-6xl mx-auto">
        {/* Botón de Regresar */}
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition-colors mb-6"
        >
          <FiArrowLeft className="text-lg" />
          <span className="font-medium">Regresar</span>
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Menú de Facturación</h1>
          <p className="text-gray-600">Seleccione la operación que desea realizar</p>
        </div>

        {/* Button Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Generar Factura */}
          <div 
            onClick={() => handleNavigation('/factura')}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-blue-100 hover:border-blue-200 group"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-lg mb-4 group-hover:bg-blue-200 transition-colors">
              <FiFileText className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Generar Factura</h3>
            <p className="text-gray-600">Crear nuevas facturas para clientes</p>
          </div>

          {/* Crear Productos */}
          <div 
            onClick={() => handleNavigation('/productos')}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-green-100 hover:border-green-200 group"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-lg mb-4 group-hover:bg-green-200 transition-colors">
              <FiPackage className="text-green-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Crear Productos</h3>
            <p className="text-gray-600">Gestionar catálogo de productos</p>
          </div>

          {/* Ver Histórico */}
          <div 
            onClick={() => handleNavigation('/historico')}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-purple-100 hover:border-purple-200 group"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-lg mb-4 group-hover:bg-purple-200 transition-colors">
              <FiArchive className="text-purple-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Ver Histórico</h3>
            <p className="text-gray-600">Consultar facturas anteriores</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacturacionPage;
