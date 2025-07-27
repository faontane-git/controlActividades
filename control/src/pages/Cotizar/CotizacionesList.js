import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiFileText, FiSearch, FiChevronLeft, FiChevronRight, FiPlus } from 'react-icons/fi';
import NavBar from '../NavBar/Navbar';

const CotizacionesList = () => {
  const navigate = useNavigate();
  const [cotizaciones, setCotizaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCotizaciones2 = async () => {
      const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
      const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

      try {
        // Consulta cotizaciones con JOIN al cliente
        const response = await fetch(
          `${supabaseUrl}/rest/v1/cotizaciones?select=id,fecha,validez,total,cliente_id,clientes(nombre)`,
          {
            headers: {
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (!response.ok) {
          throw new Error('Error al obtener cotizaciones');
        }

        const data = await response.json();
        setCotizaciones(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchCotizaciones2();
  }, []);



  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

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
      <NavBar />
      <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-8">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Histórico de Cotizaciones</h1>
            <button
              onClick={() => navigate('/cotizar/cotizacion')}
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Válido hasta</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">

                {cotizaciones.length > 0 ? (
                  cotizaciones.map((cotizacion) => {
                    const fechaValidez = new Date(cotizacion.fecha);
                    fechaValidez.setDate(fechaValidez.getDate() + cotizacion.validez);

                    return (
                      <tr key={cotizacion.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">{cotizacion.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">{cotizacion.clientes.nombre}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{cotizacion.fecha}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{cotizacion.validez}</td>
                        <td className="px-6 py-4 whitespace-nowrap">${cotizacion.total}</td>


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


        </div>
      </div>
    </div>
  );
};

export default CotizacionesList;