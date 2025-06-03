import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiFileText, FiSearch, FiPrinter, FiDownload, FiArrowLeft, FiPlus } from 'react-icons/fi';
import NavBar from '../../NavBar/Navbar';

const FacturasGeneradas = () => {
  const navigate = useNavigate();
  const [facturas, setFacturas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const facturasPerPage = 8;

  useEffect(() => {
    const fetchFacturas = async () => {
      // Simulando llamada a API
      const mockFacturas = [
        { id: 'FAC-001', cliente: 'Cliente A', fecha: '2023-05-15', total: 1250.50, estado: 'Pagada' },
        { id: 'FAC-002', cliente: 'Cliente B', fecha: '2023-05-16', total: 850.00, estado: 'Pendiente' },
        { id: 'FAC-003', cliente: 'Cliente C', fecha: '2023-05-17', total: 2200.75, estado: 'Pagada' },
        { id: 'FAC-004', cliente: 'Cliente D', fecha: '2023-05-18', total: 175.30, estado: 'Anulada' },
      ];
      setFacturas(mockFacturas);
    };

    fetchFacturas();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleNewFactura = () => {
    navigate('/factura/nueva');
  };

  const handlePrint = (facturaId) => {
    console.log(`Imprimir factura ${facturaId}`);
  };

  const handleDownload = (facturaId) => {
    console.log(`Descargar factura ${facturaId}`);
  };

  const handleView = (facturaId) => {
    navigate(`/factura/detalle/${facturaId}`);
  };

  const filteredFacturas = facturas.filter(factura =>
    factura.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    factura.cliente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastFactura = currentPage * facturasPerPage;
  const indexOfFirstFactura = indexOfLastFactura - facturasPerPage;
  const currentFacturas = filteredFacturas.slice(indexOfFirstFactura, indexOfLastFactura);
  const totalPages = Math.ceil(filteredFacturas.length / facturasPerPage);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans">
      <NavBar />

      <div className="pt-28 pb-10 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition-colors"
          >
            <FiArrowLeft className="text-lg" />
            <span className="font-medium">Regresar</span>
          </button>
          
          <button
            onClick={handleNewFactura}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FiPlus className="text-lg" />
            <span className="font-medium">Nueva Factura</span>
          </button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Facturas Generadas</h1>
          <p className="text-gray-600">Listado completo de todas las facturas emitidas</p>
        </div>

        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-96">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por número o cliente..."
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N° Factura</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentFacturas.length > 0 ? (
                  currentFacturas.map((factura) => (
                    <tr key={factura.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FiFileText className="flex-shrink-0 h-5 w-5 text-blue-500 mr-2" />
                          <span className="font-medium text-gray-900">{factura.id}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">{factura.cliente}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">{formatDate(factura.fecha)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">{formatCurrency(factura.total)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          factura.estado === 'Pagada' ? 'bg-green-100 text-green-800' :
                          factura.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {factura.estado}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleView(factura.id)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Ver detalle"
                          >
                            Ver
                          </button>
                          <button
                            onClick={() => handlePrint(factura.id)}
                            className="text-gray-600 hover:text-gray-900 ml-2"
                            title="Imprimir"
                          >
                            <FiPrinter className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDownload(factura.id)}
                            className="text-gray-600 hover:text-gray-900 ml-2"
                            title="Descargar"
                          >
                            <FiDownload className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                      No se encontraron facturas
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 disabled:opacity-50"
            >
              Anterior
            </button>
            <span className="text-gray-700">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacturasGeneradas;