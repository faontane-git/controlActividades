import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPackage, FiPlus, FiTrash2, FiLogOut, FiDollarSign, FiTag, FiList, FiArrowLeft } from 'react-icons/fi';
import NavBar from '../../NavBar/Navbar';

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

  const agregarProducto = async () => {
    const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
    const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
    if (!productoActual.codigo || !productoActual.descripcion || !productoActual.precio) return;

    const res = await fetch(`${supabaseUrl}/rest/v1/productos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        codigo: productoActual.codigo,
        nombre: productoActual.descripcion,
        precio: parseFloat(productoActual.precio)
      })
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Error al guardar el producto:', data);
      return;
    }

    setProductos(prev => [...prev, data[0]]);
    setProductoActual({ codigo: '', descripcion: '', precio: '' });
  };



  const eliminarProducto = (index) => {
    setProductos(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <main className="pt-20 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Botón de Regresar */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition-colors mb-6"
          >
            <FiArrowLeft className="text-lg" />
            <span className="font-medium">Regresar</span>
          </button>

          {/* Encabezado */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
              <FiPackage className="text-blue-500" />
              Crear Producto
            </h1>
            <p className="text-gray-600 mt-2">Complete el formulario para agregar nuevos productos</p>
          </div>
          <div className="flex justify-center px-4">
            <div className="w-full max-w-xl">
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
            </div>
          </div>



        </div>
      </main>
    </div>
  );
};

export default CrearProductos;
