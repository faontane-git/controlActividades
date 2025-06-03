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
    navigate(-1);
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

        {/* Contenedor flexible centrado */}
        <div className="flex flex-wrap justify-center gap-8">
          {/* Generar Factura */}
          <div
            onClick={() => handleNavigation('/factura')}
            className="w-full sm:w-[calc(50%-20px)] lg:w-[calc(33.333%-22px)] max-w-xs bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-blue-100 hover:border-blue-200 group text-center"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-lg mb-4 group-hover:bg-blue-200 transition-colors mx-auto">
              <FiFileText className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Generar Factura</h3>
            <p className="text-gray-600">Crear nuevas facturas para clientes</p>
          </div>

          {/* Crear Productos */}
          <div
            onClick={() => handleNavigation('/productos')}
            className="w-full sm:w-[calc(50%-20px)] lg:w-[calc(33.333%-22px)] max-w-xs bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-green-100 hover:border-green-200 group text-center"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-lg mb-4 group-hover:bg-green-200 transition-colors mx-auto">
              <FiPackage className="text-green-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Crear Productos</h3>
            <p className="text-gray-600">Gestionar catálogo de productos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacturacionPage;