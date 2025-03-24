import React, { useState } from 'react';

const GenerarFactura = () => {
  const [formData, setFormData] = useState({
    cliente: '',
    productos: [],
    iva: 12,  // IVA por defecto 12%
  });

  const [productoActual, setProductoActual] = useState({ descripcion: '', cantidad: 0, precio: 0 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProductoChange = (e) => {
    const { name, value } = e.target;
    setProductoActual((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const agregarProducto = () => {
    setFormData((prev) => ({
      ...prev,
      productos: [...prev.productos, productoActual],
    }));
    setProductoActual({ descripcion: '', cantidad: 0, precio: 0 });
  };

  const calcularTotal = () => {
    return formData.productos.reduce((total, producto) => total + producto.cantidad * producto.precio, 0);
  };

  const calcularIVA = () => {
    const subtotal = calcularTotal();
    return (subtotal * (formData.iva / 100)).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center p-6 font-sans">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Generar Factura</h1>

      {/* Formulario */}
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cliente */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Cliente</label>
            <input
              type="text"
              name="cliente"
              value={formData.cliente}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* IVA */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">IVA (%)</label>
            <input
              type="number"
              name="iva"
              value={formData.iva}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Producto */}
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

          {/* Cantidad */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cantidad</label>
            <input
              type="number"
              name="cantidad"
              value={productoActual.cantidad}
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
        </div>

        {/* Botón Agregar Producto */}
        <button
          type="button"
          onClick={agregarProducto}
          className="w-full mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Agregar Producto
        </button>
      </div>

      {/* Factura */}
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Factura para: {formData.cliente}</h2>

        {/* Tabla de Productos */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-3 text-left">Descripción</th>
                <th className="p-3 text-left">Cantidad</th>
                <th className="p-3 text-left">Precio Unitario</th>
                <th className="p-3 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {formData.productos.map((producto, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-3">{producto.descripcion}</td>
                  <td className="p-3">{producto.cantidad}</td>
                  <td className="p-3">${producto.precio}</td>
                  <td className="p-3">${producto.cantidad * producto.precio}</td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-semibold">
                <td colSpan="3" className="p-3">Subtotal</td>
                <td className="p-3">${calcularTotal()}</td>
              </tr>
              <tr className="bg-gray-50 font-semibold">
                <td colSpan="3" className="p-3">IVA ({formData.iva}%)</td>
                <td className="p-3">${calcularIVA()}</td>
              </tr>
              <tr className="bg-blue-50 font-bold">
                <td colSpan="3" className="p-3">Total</td>
                <td className="p-3">${(parseFloat(calcularTotal()) + parseFloat(calcularIVA())).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GenerarFactura;