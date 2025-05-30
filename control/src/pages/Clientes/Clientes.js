import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiUserPlus, FiSearch, FiEdit2, FiTrash2,
  FiChevronLeft, FiChevronRight, FiX, FiSave
} from 'react-icons/fi';
import NavBar from '../NavBar/Navbar';

const Clientes = () => {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentCliente, setCurrentCliente] = useState({
    id: '',
    nombre: '',
    contacto: '',
    email: '',
    telefono: '',
    direccion: '',
    tipo: 'Persona',
    razon: 'Cedula',
    identificacion: '',
  });
  const itemsPerPage = 10;

  // Datos de ejemplo
  useEffect(() => {
    const fetchClientes = () => {
      setTimeout(() => {
        const mockData = Array.from({ length: 25 }, (_, i) => ({
          id: i + 1,
          nombre: `Cliente ${i % 2 === 0 ? 'Corporativo' : 'Individual'} ${i + 1}`,
          contacto: `Contacto ${i + 1}`,
          email: `cliente${i + 1}@example.com`,
          telefono: `55${Math.floor(10000000 + Math.random() * 90000000)}`,
          direccion: `Calle ${i + 1}, Col. Centro, CDMX`,
          tipo: i % 2 === 0 ? 'Persona moral' : 'Persona física',
          fechaRegistro: new Date(Date.now() - i * 86400000).toISOString().split('T')[0]
        }));
        setClientes(mockData);
        setLoading(false);
      }, 800);
    };

    fetchClientes();
  }, []);

  // Filtrar clientes
  const filteredClientes = clientes.filter(cliente =>
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.contacto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredClientes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredClientes.length / itemsPerPage);

  // Abrir modal para nuevo/editar cliente
  const openModal = (cliente = null) => {
    if (cliente) {
      setCurrentCliente(cliente);
      setEditMode(true);
    } else {
      setCurrentCliente({
        id: '',
        nombre: '',
        contacto: '',
        email: '',
        telefono: '',
        direccion: '',
        tipo: 'Persona'
      });
      setEditMode(false);
    }
    setModalOpen(true);
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentCliente(prev => ({ ...prev, [name]: value }));
  };

  // Guardar cliente
  const saveCliente = () => {
    if (editMode) {
      setClientes(prev =>
        prev.map(c => c.id === currentCliente.id ? currentCliente : c)
      );
    } else {
      const newCliente = {
        ...currentCliente,
        id: Date.now(),
        fechaRegistro: new Date().toISOString().split('T')[0]
      };
      setClientes(prev => [...prev, newCliente]);
    }
    setModalOpen(false);
  };

  // Eliminar cliente
  const deleteCliente = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este cliente?')) {
      setClientes(prev => prev.filter(c => c.id !== id));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-8">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Gestión de Clientes</h1>
            <button
              onClick={() => openModal()}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              <FiUserPlus className="mr-2" /> Nuevo Cliente
            </button>
          </div>

          <div className="mb-6 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar clientes..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full max-w-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {filteredClientes.length === 0 ? (
            <div className="text-center py-12">
              <FiUserPlus className="mx-auto text-4xl text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No hay clientes registrados</h3>
              <p className="text-gray-500 mt-1">Comienza agregando tu primer cliente</p>
              <button
                onClick={() => openModal()}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                <FiUserPlus className="inline mr-2" /> Agregar Cliente
              </button>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Razón Social</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cédula</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Celular</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentItems.map((cliente) => (
                      <tr key={cliente.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{cliente.nombre}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cliente.contacto}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cliente.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cliente.telefono}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${cliente.tipo === 'Persona moral' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                            {cliente.tipo}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => openModal(cliente)}
                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                            title="Editar"
                          >
                            <FiEdit2 />
                          </button>
                          <button
                            onClick={() => deleteCliente(cliente.id)}
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

              {filteredClientes.length > 0 && (
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-gray-700">
                    Mostrando {indexOfFirstItem + 1} a {Math.min(indexOfLastItem, filteredClientes.length)} de {filteredClientes.length} clientes
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                      <FiChevronLeft />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 rounded-md ${currentPage === i + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                      <FiChevronRight />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modal para editar/crear cliente */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-800">
                {editMode ? 'Editar Cliente' : 'Nuevo Cliente'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre*</label>
                  <input
                    type="text"
                    name="nombre"
                    value={currentCliente.nombre}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo*</label>
                  <select
                    name="tipo"
                    value={currentCliente.tipo}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                    <option value="Persona">Persona</option>
                    <option value="Empresa">Empresa</option>
                  </select>
                </div>


                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Razón Social*</label>
                  <select
                    name="razon"
                    value={currentCliente.razon}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                    <option value="Cedula">Cédula</option>
                    <option value="Ruc">RUC</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cédula*</label>
                  <input
                    type="text"
                    name="nombre"
                    value={currentCliente.nombre}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Celular*</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={currentCliente.telefono}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                  <input
                    type="email"
                    name="email"
                    value={currentCliente.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                  <textarea
                    name="direccion"
                    rows="2"
                    value={currentCliente.direccion}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-4 border-t sticky bottom-0 bg-white">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={saveCliente}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center"
                disabled={!currentCliente.nombre || !currentCliente.contacto || !currentCliente.email || !currentCliente.telefono}
              >
                <FiSave className="mr-2" /> {editMode ? 'Actualizar' : 'Guardar'} Cliente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clientes;