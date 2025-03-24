import React, { useState } from 'react';

const CrearProductos = () => {
  const [productos, setProductos] = useState([]);
  const [productoActual, setProductoActual] = useState({ codigo: '', descripcion: '', precio: 0 });

  const handleProductoChange = (e) => {
    const { name, value } = e.target;
    setProductoActual((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const agregarProducto = () => {
    setProductos((prev) => [...prev, productoActual]);
    setProductoActual({ codigo: '', descripcion: '', precio: 0 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center p-6 font-sans">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Crear Producto</h1>

      {/* Formulario */}
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <div className="grid grid-cols-1 gap-6">
          {/* Código del Producto */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Código del Producto</label>
            <input
              type="text"
              name="codigo"
              value={productoActual.codigo}
              onChange={handleProductoChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Descripción del Producto */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Descripción del Producto</label>
            <input
              type="text"
              name="descripcion"
              value={productoActual.descripcion}
              onChange={handleProductoChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Precio Unitario */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Precio Unitario</label>
            <input
              type="number"
              name="precio"
              value={productoActual.precio}
              onChange={handleProductoChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Botón Agregar Producto */}
          <button
            type="button"
            onClick={agregarProducto}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Agregar Producto
          </button>
        </div>
      </div>

      {/* Lista de Productos */}
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Lista de Productos</h2>

        {/* Tabla de Productos */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-4 text-left">Código</th>
                <th className="p-4 text-left">Descripción</th>
                <th className="p-4 text-left">Precio Unitario</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="p-4">{producto.codigo}</td>
                  <td className="p-4">{producto.descripcion}</td>
                  <td className="p-4">${producto.precio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CrearProductos;