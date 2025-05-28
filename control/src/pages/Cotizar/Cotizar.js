import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiPlus, FiTrash2, FiSave, FiPrinter, FiChevronDown,
  FiMenu, FiX, FiHome, FiSettings, FiAward, FiFolder,
  FiFileText, FiUsers, FiBriefcase, FiDollarSign, FiUser, FiLogOut
} from 'react-icons/fi';

// Componente NavBar
const NavBar = ({ navigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    console.log('Sesión cerrada');
    navigate('/login');
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full flex items-center h-20 bg-white/95 backdrop-blur-md border-b border-gray-100 z-50 shadow-sm">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-2">
          <div className="flex items-center gap-1 pl-2">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-700 text-2xl ml-0 mr-3"
            >
              <FiMenu />
            </button>
            <div 
              className="h-10 w-auto transition-opacity hover:opacity-80 cursor-pointer"
              onClick={() => navigate('/main')}
            >
              <span className="text-xl font-bold text-indigo-600">LOGO</span>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <FiUser className="text-gray-700" size={20} />
              <span className="text-gray-700">Cuenta</span>
              <FiChevronDown className="text-gray-500" size={16} />
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                <button onClick={() => navigate('/perfil')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">Perfil</button>
                <button onClick={() => navigate('/certificados')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">Mis Certificados</button>
                <button onClick={() => navigate('/configuracion')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">Configuración</button>
                <button onClick={handleLogout} className="block px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left">Cerrar sesión</button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform z-50`}>
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Menú</h2>
          <button onClick={() => setSidebarOpen(false)} className="text-gray-700 text-2xl">
            <FiX />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          <button onClick={() => navigate('/main')} className="flex items-center w-full p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
            <FiHome className="mr-3" /> Inicio
          </button>
          <button onClick={() => navigate('/personal')} className="flex items-center w-full p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
            <FiUsers className="mr-3" /> Administrar Personal
          </button>
          <button onClick={() => navigate('/clientes')} className="flex items-center w-full p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
            <FiBriefcase className="mr-3" /> Clientes
          </button>
          <button onClick={() => navigate('/proyectos')} className="flex items-center w-full p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
            <FiFolder className="mr-3" /> Proyectos
          </button>
          <button onClick={() => navigate('/cotizar')} className="flex items-center w-full p-3 text-gray-700 hover:bg-gray-100 rounded-lg bg-indigo-50 text-indigo-700">
            <FiDollarSign className="mr-3" /> Cotizar
          </button>
          <button onClick={() => navigate('/facturador')} className="flex items-center w-full p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
            <FiFileText className="mr-3" /> Facturador
          </button>
          <button onClick={() => navigate('/certificados')} className="flex items-center w-full p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
            <FiAward className="mr-3" /> Certificados
          </button>
          <button onClick={() => navigate('/configuracion')} className="flex items-center w-full p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
            <FiSettings className="mr-3" /> Configuración
          </button>
        </nav>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={() => setSidebarOpen(false)}></div>
      )}
    </>
  );
};

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

  // Datos de ejemplo
  useEffect(() => {
    setTimeout(() => {
      setClientes([
        { id: 1, nombre: 'Tech Solutions SA', contacto: 'Juan Pérez' },
        { id: 2, nombre: 'Constructora XYZ', contacto: 'María González' }
      ]);
      
      setProductos([
        { id: 1, codigo: 'SER-001', nombre: 'Servicio de desarrollo web', precio: 1500 },
        { id: 2, codigo: 'SER-002', nombre: 'Consultoría SEO', precio: 800 },
        { id: 3, codigo: 'HAR-001', nombre: 'Servidor HP ProLiant', precio: 2500 }
      ]);
      
      setLoading(false);
    }, 1000);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Cotización enviada:', cotizacion);
    alert('Cotización guardada exitosamente');
    navigate('/cotizaciones');
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
      <NavBar navigate={navigate} />
      
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
                      {cliente.nombre} - {cliente.contacto}
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
                onClick={() => navigate('/cotizaciones')}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center"
              >
                <FiPrinter className="mr-2" /> Imprimir
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