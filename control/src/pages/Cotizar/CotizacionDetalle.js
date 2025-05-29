import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiPrinter, FiArrowLeft } from 'react-icons/fi';

const CotizacionDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cotizacion, setCotizacion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setCotizacion({
        id: id,
        numero: `COT-${String(id).padStart(4, '0')}`,
        fecha: new Date().toISOString().split('T')[0],
        cliente: 'Cliente Ejemplo',
        contacto: 'contacto@ejemplo.com',
        validez: 7,
        items: [
          { productoId: 1, descripcion: 'Servicio de desarrollo web', cantidad: 1, precioUnitario: 1500 },
          { productoId: 2, descripcion: 'Consultoría SEO', cantidad: 2, precioUnitario: 800 }
        ],
        notas: 'Esta es una cotización de ejemplo',
        estado: 'Pendiente',
        total: 3100 * 1.19
      });
      setLoading(false);
    }, 500);
  }, [id]);

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
          <div className="flex justify-between items-start mb-6">
            <button
              onClick={() => navigate('/cotizaciones')}
              className="flex items-center text-indigo-600 hover:text-indigo-800"
            >
              <FiArrowLeft className="mr-1" /> Volver al listado
            </button>
            
            <div className="flex space-x-3">
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                <FiPrinter className="mr-2" /> Imprimir
              </button>
            </div>
          </div>

          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Información de la Cotización</h2>
                <div className="space-y-2">
                  <p><span className="font-medium">Número:</span> {cotizacion.numero}</p>
                  <p><span className="font-medium">Fecha:</span> {cotizacion.fecha}</p>
                  <p><span className="font-medium">Estado:</span> 
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                      cotizacion.estado === 'Aprobada' ? 'bg-green-100 text-green-800' : 
                      cotizacion.estado === 'Rechazada' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {cotizacion.estado}
                    </span>
                  </p>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Cliente</h2>
                <div className="space-y-2">
                  <p className="font-medium">{cotizacion.cliente}</p>
                  <p>{cotizacion.contacto}</p>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Validez</h2>
                <p>{cotizacion.validez} días</p>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Ítems</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio Unit.</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cotizacion.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">{item.descripcion}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.cantidad}</td>
                        <td className="px-6 py-4 whitespace-nowrap">${item.precioUnitario.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">${(item.cantidad * item.precioUnitario).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Notas</h2>
                <p className="text-gray-700 whitespace-pre-line">{cotizacion.notas || 'Ninguna nota adicional'}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Subtotal:</span>
                  <span className="font-medium">${(cotizacion.total / 1.19).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">IVA (19%):</span>
                  <span className="font-medium">${(cotizacion.total / 1.19 * 0.19).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center border-t border-gray-200 pt-2 mt-2">
                  <span className="text-lg font-bold text-gray-900">Total:</span>
                  <span className="text-lg font-bold">${cotizacion.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CotizacionDetalle;