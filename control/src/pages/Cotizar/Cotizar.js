import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiPlus, FiTrash2, FiSave, FiPrinter, FiChevronDown,
  FiMenu, FiX, FiHome, FiSettings, FiAward, FiFolder,
  FiFileText, FiUsers, FiBriefcase, FiDollarSign, FiUser, FiLogOut
} from 'react-icons/fi';
import NavBar from '../NavBar/Navbar';

// Componente principal de Cotizar
const Cotizar = () => {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [cotizacion, setCotizacion] = useState({
    clienteId: '',
    fecha: new Date().toISOString().split('T')[0],
    validez: 7,
    items: [],
    notas: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fecthClientes = async () => {
      const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
      const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

      try {
        const response = await fetch(`${supabaseUrl}/rest/v1/clientes?select=id,nombre`, {
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener empleados');
        }

        const data = await response.json();
        setClientes(data);
        setLoading(false);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fecthClientes();
  }, []);

  // Datos de ejemplo
  useEffect(() => {
    const fetchProductos = async () => {
      const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
      const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

      try {
        const res = await fetch(`${supabaseUrl}/rest/v1/productos?select=id,codigo,nombre,precio`, {
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) throw new Error('Error al obtener productos');

        const data = await res.json();
        setProductos(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    };

    fetchProductos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCotizacion(prev => ({ ...prev, [name]: value }));
  };

  const addItem = () => {
    setCotizacion(prev => ({
      ...prev,
      items: [...prev.items, { productoId: '', cantidad: 1, precioUnitario: 0, descripcion: '' }]
    }));
  };

  const removeItem = (index) => {
    setCotizacion(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...cotizacion.items];
    updatedItems[index][field] = field === 'cantidad' || field === 'precioUnitario' ? Number(value) : value;

    if (field === 'productoId') {
      const producto = productos.find(p => p.id === Number(value));
      if (producto) {
        updatedItems[index].descripcion = producto.nombre;
        updatedItems[index].precioUnitario = producto.precio;
      }
    }

    setCotizacion(prev => ({ ...prev, items: updatedItems }));
  };

  const calcularTotal = () => {
    return cotizacion.items.reduce((total, item) => {
      return total + (item.cantidad * item.precioUnitario);
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
    const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

    try {
      // Guardar cotización
      const response = await fetch(`${supabaseUrl}/rest/v1/cotizaciones`, {
        method: 'POST',
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation'
        },
        body: JSON.stringify({
          cliente_id: cotizacion.clienteId,
          fecha: cotizacion.fecha,
          validez: cotizacion.validez,
          notas: cotizacion.notas,
          subtotal: calcularTotal(),
          iva: calcularTotal() * 0.19,
          total: calcularTotal() * 1.19
        })
      });

      if (!response.ok) throw new Error('Error al guardar cotización');

      const [nuevaCotizacion] = await response.json();

      // Guardar ítems de cotización
      const itemsConId = cotizacion.items.map(item => ({
        cotizacion_id: nuevaCotizacion.id,
        producto_id: item.productoId,
        descripcion: item.descripcion,
        cantidad: item.cantidad,
        precio_unitario: item.precioUnitario
      }));

      const itemsRes = await fetch(`${supabaseUrl}/rest/v1/cotizacion_items`, {
        method: 'POST',
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(itemsConId)
      });

      if (!itemsRes.ok) throw new Error('Error al guardar ítems');

      alert('Cotización guardada exitosamente');
      navigate('/cotizaciones');
    } catch (error) {
      console.error('Error al guardar cotización:', error);
      alert('Hubo un error al guardar la cotización');
    }
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Nueva Cotización</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
                <select
                  name="clienteId"
                  value={cotizacion.clienteId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Seleccione un cliente</option>
                  {clientes.map(cliente => (
                    <option key={cliente.id} value={cliente.id}>
                      {cliente.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                  <input
                    type="date"
                    name="fecha"
                    value={cotizacion.fecha}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Validez (días)</label>
                  <input
                    type="number"
                    name="validez"
                    value={cotizacion.validez}
                    onChange={handleChange}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Ítems de la cotización</h2>
                <button
                  type="button"
                  onClick={addItem}
                  className="flex items-center px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  <FiPlus className="mr-1" /> Agregar ítem
                </button>
              </div>

              {cotizacion.items.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  No hay ítems agregados
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto/Servicio</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio Unit.</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {cotizacion.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select
                              value={item.productoId}
                              onChange={(e) => handleItemChange(index, 'productoId', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              required
                            >
                              <option value="">Seleccione</option>
                              {productos.map(producto => (
                                <option key={producto.id} value={producto.id}>
                                  {producto.codigo} - {producto.nombre}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="text"
                              value={item.descripcion}
                              onChange={(e) => handleItemChange(index, 'descripcion', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              required
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              min="1"
                              value={item.cantidad}
                              onChange={(e) => handleItemChange(index, 'cantidad', e.target.value)}
                              className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              required
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={item.precioUnitario}
                              onChange={(e) => handleItemChange(index, 'precioUnitario', e.target.value)}
                              className="w-24 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              required
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            ${(item.cantidad * item.precioUnitario).toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              type="button"
                              onClick={() => removeItem(index)}
                              className="text-red-600 hover:text-red-900"
                              title="Eliminar"
                            >
                              <FiTrash2 />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
                <textarea
                  name="notas"
                  rows="3"
                  value={cotizacion.notas}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                ></textarea>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Subtotal:</span>
                  <span className="font-medium">${calcularTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">IVA (19%):</span>
                  <span className="font-medium">${(calcularTotal() * 0.19).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center border-t border-gray-200 pt-2 mt-2">
                  <span className="text-lg font-bold text-gray-900">Total:</span>
                  <span className="text-lg font-bold">${(calcularTotal() * 1.19).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate('/cotizar')}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center"
              >
                <FiSave className="mr-2" /> Guardar Cotización
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cotizar;