import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiFileText, FiPlus, FiTrash2, FiLogOut, FiUser, FiDollarSign, FiPercent } from 'react-icons/fi';

const NavBar = ({ onLogout }) => {
  return (
    <nav className="fixed top-0 left-0 w-full flex items-center h-16 bg-white shadow-md z-50 px-6">
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <FiFileText className="text-blue-600 text-2xl mr-3" />
          <h1 className="text-xl font-bold text-gray-800">Sistema de Facturación</h1>
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

const GenerarFactura = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cliente: '',
    productos: [],
    iva: 12,
  });

  const [productoActual, setProductoActual] = useState({ 
    descripcion: '', 
    cantidad: '', 
    precio: '' 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProductoChange = (e) => {
    const { name, value } = e.target;
    setProductoActual(prev => ({ ...prev, [name]: value }));
  };

  const agregarProducto = () => {
    if (!productoActual.descripcion || !productoActual.cantidad || !productoActual.precio) return;
    
    setFormData(prev => ({
      ...prev,
      productos: [...prev.productos, {
        ...productoActual,
        cantidad: parseFloat(productoActual.cantidad),
        precio: parseFloat(productoActual.precio)
      }]
    }));
    setProductoActual({ descripcion: '', cantidad: '', precio: '' });
  };

  const eliminarProducto = (index) => {
    setFormData(prev => ({
      ...prev,
      productos: prev.productos.filter((_, i) => i !== index)
    }));
  };

  const calcularTotal = () => {
    return formData.productos.reduce((total, p) => total + (p.cantidad * p.precio), 0);
  };

  const calcularIVA = () => {
    return (calcularTotal() * (formData.iva / 100)).toFixed(2);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar onLogout={handleLogout} />
      
      <main className="pt-20 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Encabezado */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Generar Factura</h1>
            <p className="text-gray-600 mt-2">Complete los datos para generar una nueva factura</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Formulario */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <FiUser className="text-blue-500" />
                Datos de Facturación
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
                  <input
                    type="text"
                    name="cliente"
                    value={formData.cliente}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nombre del cliente"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">IVA (%)</label>
                  <div className="relative">
                    <FiPercent className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="number"
                      name="iva"
                      value={formData.iva}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-medium mt-8 mb-4 flex items-center gap-2">
                <FiPlus className="text-blue-500" />
                Agregar Producto
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                  <input
                    type="text"
                    name="descripcion"
                    value={productoActual.descripcion}
                    onChange={handleProductoChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nombre del producto"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
                  <input
                    type="number"
                    name="cantidad"
                    value={productoActual.cantidad}
                    onChange={handleProductoChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Precio Unitario</label>
                  <div className="relative">
                    <FiDollarSign className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="number"
                      name="precio"
                      value={productoActual.precio}
                      onChange={handleProductoChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={agregarProducto}
                    disabled={!productoActual.descripcion || !productoActual.cantidad || !productoActual.precio}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
                  >
                    Agregar Producto
                  </button>
                </div>
              </div>
            </div>

            {/* Vista previa de factura */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <FiFileText className="text-blue-500" />
                Vista Previa de Factura
              </h2>

              {formData.cliente && (
                <div className="mb-4">
                  <p className="text-gray-600">Cliente:</p>
                  <p className="font-medium">{formData.cliente}</p>
                </div>
              )}

              {formData.productos.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {formData.productos.map((producto, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 whitespace-nowrap">{producto.descripcion}</td>
                          <td className="px-4 py-3 whitespace-nowrap">{producto.cantidad}</td>
                          <td className="px-4 py-3 whitespace-nowrap">${producto.precio.toFixed(2)}</td>
                          <td className="px-4 py-3 whitespace-nowrap">${(producto.cantidad * producto.precio).toFixed(2)}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <button 
                              onClick={() => eliminarProducto(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <FiTrash2 />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td colSpan="3" className="px-4 py-3 text-right font-medium">Subtotal:</td>
                        <td className="px-4 py-3 font-medium">${calcularTotal().toFixed(2)}</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td colSpan="3" className="px-4 py-3 text-right font-medium">IVA ({formData.iva}%):</td>
                        <td className="px-4 py-3 font-medium">${calcularIVA()}</td>
                        <td></td>
                      </tr>
                      <tr className="bg-blue-50">
                        <td colSpan="3" className="px-4 py-3 text-right font-bold">Total:</td>
                        <td className="px-4 py-3 font-bold">${(parseFloat(calcularTotal()) + parseFloat(calcularIVA())).toFixed(2)}</td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No hay productos agregados</p>
                  <p className="text-sm mt-2">Agregue productos para ver la vista previa</p>
                </div>
              )}

              {formData.productos.length > 0 && (
                <div className="mt-6 flex justify-end">
                  <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg transition-colors">
                    Generar Factura
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GenerarFactura;