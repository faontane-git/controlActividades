import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiFileText, FiPlus, FiList, FiCopy } from 'react-icons/fi';

const CotizacionMenu = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Nueva Cotización",
      description: "Crear una cotización desde cero",
      icon: <FiPlus className="text-3xl mb-3 text-indigo-600" />,
      action: () => navigate('/cotizar/nueva')
    },
    {
      title: "Histórico",
      description: "Ver todas las cotizaciones realizadas",
      icon: <FiList className="text-3xl mb-3 text-indigo-600" />,
      action: () => navigate('/cotizaciones')
    },
    {
      title: "Usar Plantilla",
      description: "Seleccionar un modelo predefinido",
      icon: <FiCopy className="text-3xl mb-3 text-indigo-600" />,
      action: () => navigate('/cotizar/plantillas')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
       
      <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Cotizaciones</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Selecciona la acción que deseas realizar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div 
              key={index}
              onClick={card.action}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center text-center"
            >
              {card.icon}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{card.title}</h3>
              <p className="text-gray-600 mb-4">{card.description}</p>
              <button className="mt-auto px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
                Seleccionar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CotizacionMenu;