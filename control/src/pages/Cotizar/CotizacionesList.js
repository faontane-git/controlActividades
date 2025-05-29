import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiFileText, FiSearch, FiChevronLeft, FiChevronRight,FiPlus } from 'react-icons/fi';

const CotizacionesList = () => {
  const navigate = useNavigate();
  const [cotizaciones, setCotizaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Datos de ejemplo (en un caso real, estos vendrían de una API)
  useEffect(() => {
    const fetchCotizaciones = () => {
      setTimeout(() => {
        const mockData = Array.from({ length: 25 }, (_, i) => ({
          id: i + 1,
          numero: `COT-${String(i + 1).padStart(4, '0')}`,
          fecha: new Date(Date.now() - i * 86400000).toISOString().split('T')[0],
          cliente: `Cliente ${i % 5 === 0 ? 'A' : i % 3 === 0 ? 'B' : 'C'}`,
          total: (Math.random() * 5000 + 500).toFixed(2),
          estado: i % 4 === 0 ? 'Aprobada' : i % 3 === 0 ? 'Rechazada' : 'Pendiente',
          validez: 7 + (i % 10)
        }));
        setCotizaciones(mockData);
        setLoading(false);
      }, 800);
    };

    fetchCotizaciones();
  }, []);

  const filteredCotizaciones = cotizaciones.filter(cotizacion =>
    cotizacion.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cotizacion.cliente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCotizaciones.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCotizaciones.length / itemsPerPage);

  const handleViewDetails = (id) => {
    navigate(`/cotizaciones/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
       
      <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-8">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Histórico de Cotizaciones</h1>
            <button
              onClick={() => navigate('/cotizar')}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              <FiPlus className="mr-2" /> Nueva Cotización
            </button>
          </div>

          <div className="mb-6 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar por número o cliente..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full max-w-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Número</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Válido hasta</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map((cotizacion) => {
                    const fechaValidez = new Date(cotizacion.fecha);
                    fechaValidez.setDate(fechaValidez.getDate() + cotizacion.validez);
                    
                    return (
                      <tr key={cotizacion.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap font-medium">{cotizacion.numero}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{cotizacion.fecha}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{cotizacion.cliente}</td>
                        <td className="px-6 py-4 whitespace-nowrap">${cotizacion.total}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            cotizacion.estado === 'Aprobada' 
                              ? 'bg-green-100 text-green-800' 
                              : cotizacion.estado === 'Rechazada' 
                                ? 'bg-red-100 text-red-800' 
                                : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {cotizacion.estado}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {fechaValidez.toISOString().split('T')[0]}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleViewDetails(cotizacion.id)}
                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                          >
                            Ver
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            <FiFileText />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                      No se encontraron cotizaciones
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {filteredCotizaciones.length > 0 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-700">
                Mostrando {indexOfFirstItem + 1} a {Math.min(indexOfLastItem, filteredCotizaciones.length)} de {filteredCotizaciones.length} cotizaciones
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  <FiChevronLeft />
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded-md ${currentPage === i + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  <FiChevronRight />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CotizacionesList;