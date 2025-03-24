import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPackage, FiPlus, FiTrash2, FiLogOut, FiDollarSign, FiTag, FiList } from 'react-icons/fi';

const NavBar = ({ onLogout }) => {
  return (
    <nav className="fixed top-0 left-0 w-full flex items-center h-16 bg-white shadow-md z-50 px-6">
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <FiPackage className="text-blue-600 text-2xl mr-3" />
          <h1 className="text-xl font-bold text-gray-800">Gestión de Productos</h1>
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

const CrearProductos = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [productoActual, setProductoActual] = useState({ 
    codigo: '', 
    descripcion: '', 
    precio: '' 
  });

  const handleProductoChange = (e) => {
    const { name, value } = e.target;
    setProductoActual(prev => ({ ...prev, [name]: value }));
  };

  const agregarProducto = () => {
    if (!productoActual.codigo || !productoActual.descripcion || !productoActual.precio) return;
    
    setProductos(prev => [...prev, {
      ...productoActual,
      precio: parseFloat(productoActual.precio)
    }]);
    setProductoActual({ codigo: '', descripcion: '', precio: '' });
  };

  const eliminarProducto = (index) => {
    setProductos(prev => prev.filter((_, i) => i !== index));
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
            <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
              <FiPackage className="text-blue-500" />
              Crear Producto
            </h1>
            <p className="text-gray-600 mt-2">Complete el formulario para agregar nuevos productos</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Formulario */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <FiPlus className="text-blue-500" />
                Datos del Producto
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    <FiTag className="text-blue-500" />
                    Código del Producto
                  </label>
                  <input
                    type="text"
                    name="codigo"
                    value={productoActual.codigo}
                    onChange={handleProductoChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ej: PROD-001"
                  />
                </div>

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
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    <FiDollarSign className="text-blue-500" />
                    Precio Unitario
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400">$</span>
                    <input
                      type="number"
                      name="precio"
                      value={productoActual.precio}
                      onChange={handleProductoChange}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                <button
                  onClick={agregarProducto}
                  disabled={!productoActual.codigo || !productoActual.descripcion || !productoActual.precio}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed mt-4"
                >
                  Agregar Producto
                </button>
              </div>
            </div>

            {/* Lista de productos */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <FiList className="text-blue-500" />
                Productos Registrados
              </h2>

              {productos.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {productos.map((producto, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 whitespace-nowrap font-medium">{producto.codigo}</td>
                          <td className="px-4 py-3 whitespace-nowrap">{producto.descripcion}</td>
                          <td className="px-4 py-3 whitespace-nowrap">${producto.precio.toFixed(2)}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-right">
                            <button 
                              onClick={() => eliminarProducto(index)}
                              className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
                              title="Eliminar producto"
                            >
                              <FiTrash2 />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No hay productos registrados</p>
                  <p className="text-sm mt-2">Agregue productos para que aparezcan en la lista</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CrearProductos;