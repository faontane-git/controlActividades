import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPackage, FiSearch, FiEdit2, FiTrash2, FiPlus, FiArrowLeft } from 'react-icons/fi';
import NavBar from '../../NavBar/Navbar';

const ProductosCreados = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productosPerPage = 8;

  // Datos de ejemplo (reemplazar con tu API real)
  useEffect(() => {
    const fetchProductos = async () => {
      // Simulando llamada a API
      const mockProductos = [
        { id: 'PROD-001', nombre: 'Laptop HP EliteBook', categoria: 'Tecnología', precio: 1200.00, stock: 15 },
        { id: 'PROD-002', nombre: 'Mouse Inalámbrico', categoria: 'Tecnología', precio: 25.50, stock: 42 },
        { id: 'PROD-003', nombre: 'Teclado Mecánico', categoria: 'Tecnología', precio: 75.30, stock: 28 },
        { id: 'PROD-004', nombre: 'Monitor 24" Full HD', categoria: 'Tecnología', precio: 180.00, stock: 10 },
        { id: 'PROD-005', nombre: 'Silla Ergonómica', categoria: 'Oficina', precio: 220.00, stock: 8 },
        { id: 'PROD-006', nombre: 'Escritorio Ejecutivo', categoria: 'Oficina', precio: 350.00, stock: 5 },
        { id: 'PROD-007', nombre: 'Paquete de Papel A4', categoria: 'Oficina', precio: 12.75, stock: 100 },
        { id: 'PROD-008', nombre: 'Tóner Impresora', categoria: 'Oficina', precio: 45.90, stock: 30 },
      ];
      setProductos(mockProductos);
    };

    fetchProductos();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleNewProducto = () => {
    navigate('/productos/nuevo');
  };

  const handleEdit = (productoId) => {
    navigate(`/productos/editar/${productoId}`);
  };

  const handleDelete = (productoId) => {
    console.log(`Eliminar producto ${productoId}`);
    // Lógica para eliminar producto (confirmación primero)
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      setProductos(productos.filter(p => p.id !== productoId));
    }
  };

  // Filtrar productos según búsqueda
  const filteredProductos = productos.filter(producto =>
    producto.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    producto.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginación
  const indexOfLastProducto = currentPage * productosPerPage;
  const indexOfFirstProducto = indexOfLastProducto - productosPerPage;
  const currentProductos = filteredProductos.slice(indexOfFirstProducto, indexOfLastProducto);
  const totalPages = Math.ceil(filteredProductos.length / productosPerPage);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const getStockColor = (stock) => {
    if (stock <= 0) return 'bg-red-100 text-red-800';
    if (stock <= 5) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans">
      <NavBar />

      <div className="pt-28 pb-10 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Botones de navegación */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition-colors"
          >
            <FiArrowLeft className="text-lg" />
            <span className="font-medium">Regresar</span>
          </button>
          
          <button
            onClick={handleNewProducto}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FiPlus className="text-lg" />
            <span className="font-medium">Nuevo Producto</span>
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Productos Creados</h1>
          <p className="text-gray-600">Listado completo de todos los productos registrados</p>
        </div>

        {/* Barra de búsqueda */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-96">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por ID, nombre o categoría..."
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Tabla de productos */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentProductos.length > 0 ? (
                  currentProductos.map((producto) => (
                    <tr key={producto.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FiPackage className="flex-shrink-0 h-5 w-5 text-blue-500 mr-2" />
                          <span className="font-medium text-gray-900">{producto.id}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">{producto.nombre}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500 capitalize">{producto.categoria}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">{formatCurrency(producto.precio)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStockColor(producto.stock)}`}>
                          {producto.stock} unidades
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-3">
                          <button
                            onClick={() => handleEdit(producto.id)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Editar"
                          >
                            <FiEdit2 className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(producto.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Eliminar"
                          >
                            <FiTrash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                      No se encontraron productos
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 disabled:opacity-50"
            >
              Anterior
            </button>
            <span className="text-gray-700">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductosCreados;