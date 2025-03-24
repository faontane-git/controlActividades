import React, { useState, useEffect } from 'react';

const VerHistorico = () => {
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    // Simula una carga de datos desde una base de datos o API
    const cargarHistorico = () => {
      const datosSimulados = [
        { id: 1, descripcion: 'Producto A', cantidad: 2, total: 50, fecha: '2024-10-01' },
        { id: 2, descripcion: 'Producto B', cantidad: 1, total: 30, fecha: '2024-10-02' },
        { id: 3, descripcion: 'Producto C', cantidad: 3, total: 90, fecha: '2024-10-03' },
      ];
      setHistorico(datosSimulados);
    };

    cargarHistorico();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center p-6 font-sans">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Historial de Facturas</h1>

      {/* Tabla de Histórico */}
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-6xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Descripción</th>
                <th className="p-4 text-left">Cantidad</th>
                <th className="p-4 text-left">Total</th>
                <th className="p-4 text-left">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {historico.map((factura) => (
                <tr key={factura.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="p-4">{factura.id}</td>
                  <td className="p-4">{factura.descripcion}</td>
                  <td className="p-4">{factura.cantidad}</td>
                  <td className="p-4">${factura.total}</td>
                  <td className="p-4">{factura.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VerHistorico;