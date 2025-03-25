import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiFileText, FiSearch, FiDownload, FiPrinter, FiArrowLeft, FiCalendar } from 'react-icons/fi';
import NavBar from '../NavBar/Navbar';

const VerHistorico = () => {
  const navigate = useNavigate();
  const [historico, setHistorico] = useState([]);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    const cargarHistorico = () => {
      const datosSimulados = [
        { id: 1, cliente: 'Cliente A', descripcion: 'Producto A', cantidad: 2, total: 50, fecha: '2024-10-01' },
        { id: 2, cliente: 'Cliente B', descripcion: 'Producto B', cantidad: 1, total: 30, fecha: '2024-10-02' },
        { id: 3, cliente: 'Cliente C', descripcion: 'Producto C', cantidad: 3, total: 90, fecha: '2024-10-03' },
      ];
      setHistorico(datosSimulados);
    };

    cargarHistorico();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const facturasFiltradas = historico.filter(factura =>
    factura.cliente.toLowerCase().includes(filtro.toLowerCase()) ||
    factura.descripcion.toLowerCase().includes(filtro.toLowerCase()) ||
    factura.id.toString().includes(filtro)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="pt-20 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Botón de Regresar */}
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition-colors mb-6"
          >
            <FiArrowLeft className="text-lg" />
            <span className="font-medium">Regresar</span>
          </button>

          {/* Encabezado y controles */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <FiFileText className="text-blue-500" />
                Historial de Facturas
              </h1>
              <p className="text-gray-600 mt-1">Registro completo de todas las facturas emitidas</p>
            </div>

            <div className="relative w-full md:w-64">
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar facturas..."
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Tabla de facturas */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <FiCalendar className="mr-1" />
                        Fecha
                      </div>
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {facturasFiltradas.length > 0 ? (
                    facturasFiltradas.map((factura) => (
                      <tr key={factura.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap font-medium">{factura.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{factura.cliente}</td>
                        <td className="px-6 py-4">{factura.descripcion}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{factura.cantidad}</td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">${factura.total}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{factura.fecha}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              className="text-blue-500 hover:text-blue-700 p-1 rounded-full hover:bg-blue-50"
                              title="Descargar factura"
                            >
                              <FiDownload />
                            </button>
                            <button
                              className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-50"
                              title="Imprimir factura"
                            >
                              <FiPrinter />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                        No se encontraron facturas que coincidan con la búsqueda
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VerHistorico;
