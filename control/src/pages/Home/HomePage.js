import React from 'react';
import { Link } from 'react-router-dom';
import enero from '../../../src/recursos/enero.jpg';
import febrero from '../../../src/recursos/febrero.jpg';
import marzo from '../../../src/recursos/marzo.jpg';
import abril from '../../../src/recursos/abril.png';
import mayo from '../../../src/recursos/mayo.jpg';
import junio from '../../../src/recursos/junio.jpg';
import julio from '../../../src/recursos/julio.jpg';
import agosto from '../../../src/recursos/agosto.jpg';
import septiembre from '../../../src/recursos/septiembre.jpg';
import octubre from '../../../src/recursos/octubre.png';
import noviembre from '../../../src/recursos/noviembre.jpg';
import diciembre from '../../../src/recursos/diciembre.jpg';
import logo from '../../../src/recursos/logo.png';

const months = [
  { name: 'Enero', value: '2024-01', image: enero },
  { name: 'Febrero', value: '2024-02', image: febrero },
  { name: 'Marzo', value: '2024-03', image: marzo },
  { name: 'Abril', value: '2024-04', image: abril },
  { name: 'Mayo', value: '2024-05', image: mayo },
  { name: 'Junio', value: '2024-06', image: junio },
  { name: 'Julio', value: '2024-07', image: julio },
  { name: 'Agosto', value: '2024-08', image: agosto },
  { name: 'Septiembre', value: '2024-09', image: septiembre },
  { name: 'Octubre', value: '2024-10', image: octubre },
  { name: 'Noviembre', value: '2024-11', image: noviembre },
  { name: 'Diciembre', value: '2024-12', image: diciembre },
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      {/* Logo */}
      <div className="mb-8">
        <img src={logo} alt="Logo" className="w-32" />
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Sistema de Control de Actividades</h1>
        <h2 className="text-xl text-gray-600">Seleccione un mes</h2>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {months.map((month) => (
          <Link
            key={month.value}
            to={`/actividades/${month.value}`}
            className="group block rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative">
              <img
                src={month.image}
                alt={month.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
            </div>
            <div className="bg-white p-4">
              <h3 className="text-xl font-semibold text-gray-900 text-center">
                {month.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;