import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiFileText, FiSearch, FiDownload, FiPrinter, FiLogOut, FiCalendar } from 'react-icons/fi';

const NavBar = ({ onLogout }) => {
  return (
    <nav className="fixed top-0 left-0 w-full flex items-center h-16 bg-white shadow-md z-50 px-6">
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <FiFileText className="text-blue-600 text-2xl mr-3" />
          <h1 className="text-xl font-bold text-gray-800">Historial de Facturas</h1>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-gray-600 hover:text-red-600 px-3 py-1 rounded-md transition-colors"
        >
          <FiLogOut />
          <span className="hidden sm:inline">Cerrar sesión</span>
        </button>
      </div>
    </nav>
  );
};

const VerHistorico = () => {
  const navigate = useNavigate();
  const [historico, setHistorico] = useState([]);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    // Simulación de carga de datos
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

  const handleLogout = () => {
    navigate('/login');
  };

  const facturasFiltradas = historico.filter(factura => 
    factura.cliente.toLowerCase().includes(filtro.toLowerCase()) ||
    factura.descripcion.toLowerCase().includes(filtro.toLowerCase()) ||
    factura.id.toString().includes(filtro)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar onLogout={handleLogout} />
      
      <main className="pt-20 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
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

          {/* Tarjeta de resumen */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500">Total Facturas</p>
              <p className="text-2xl font-bold">{historico.length}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500">Facturas este mes</p>
              <p className="text-2xl font-bold">
                {historico.filter(f => f.fecha.startsWith('2024-10')).length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500">Ingresos totales</p>
              <p className="text-2xl font-bold">
                ${historico.reduce((sum, f) => sum + f.total, 0)}
              </p>
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

          {/* Paginación (simulada) */}
          <div className="flex justify-between items-center mt-6 bg-white px-6 py-3 rounded-lg shadow-sm border border-gray-100">
            <div className="text-sm text-gray-500">
              Mostrando 1 al {Math.min(3, facturasFiltradas.length)} de {facturasFiltradas.length} facturas
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 disabled:opacity-50">
                Anterior
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 disabled:opacity-50">
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VerHistorico;