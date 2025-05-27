import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiPlus, FiSearch, FiEdit2, FiTrash2, FiChevronLeft, FiChevronRight, 
  FiUser, FiPhone, FiMail, FiMapPin, FiMenu, FiX, FiHome, FiSettings,
  FiAward, FiFolder, FiFileText, FiUsers, FiBriefcase, FiLogOut, 
  FiChevronDown 
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

// Componente principal de Clientes
const Clientes = () => {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [clientesPerPage] = useState(8);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCliente, setCurrentCliente] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    contacto: '',
    email: '',
    telefono: '',
    direccion: '',
    tipo: 'empresa'
  });

  useEffect(function() {
    setTimeout(function() {
      setClientes([
        {
          id: 1,
          nombre: 'Tech Solutions SA',
          contacto: 'Juan Pérez',
          email: 'juan@techsolutions.com',
          telefono: '+56912345678',
          direccion: 'Av. Principal 1234, Santiago',
          tipo: 'empresa',
          proyectos: 5
        },
        {
          id: 2,
          nombre: 'María González',
          contacto: 'María González',
          email: 'maria.gonzalez@email.com',
          telefono: '+56987654321',
          direccion: 'Calle Secundaria 567, Valparaíso',
          tipo: 'individual',
          proyectos: 2
        },
        {
          id: 3,
          nombre: 'Constructora XYZ Ltda.',
          contacto: 'Roberto Martínez',
          email: 'r.martinez@constructora.cl',
          telefono: '+56955554444',
          direccion: 'Av. Industrial 789, Concepción',
          tipo: 'empresa',
          proyectos: 8
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredClientes = clientes.filter(function(cliente) {
    return (
      cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.contacto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const indexOfLastCliente = currentPage * clientesPerPage;
  const indexOfFirstCliente = indexOfLastCliente - clientesPerPage;
  const currentClientes = filteredClientes.slice(indexOfFirstCliente, indexOfLastCliente);
  const totalPages = Math.ceil(filteredClientes.length / clientesPerPage);

  const handleInputChange = function(e) {
    var name = e.target.name;
    var value = e.target.value;
    setFormData(function(prev) {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const openModal = function(cliente) {
    setCurrentCliente(cliente);
    if (cliente) {
      setFormData({
        nombre: cliente.nombre,
        contacto: cliente.contacto,
        email: cliente.email,
        telefono: cliente.telefono,
        direccion: cliente.direccion,
        tipo: cliente.tipo
      });
    } else {
      setFormData({
        nombre: '',
        contacto: '',
        email: '',
        telefono: '',
        direccion: '',
        tipo: 'empresa'
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = function(e) {
    e.preventDefault();
    if (currentCliente) {
      setClientes(clientes.map(function(cli) {
        return cli.id === currentCliente.id ? { ...cli, ...formData } : cli;
      }));
    } else {
      var newCliente = {
        id: Math.max(...clientes.map(function(c) { return c.id; })) + 1,
        ...formData,
        proyectos: 0
      };
      setClientes([...clientes, newCliente]);
    }
    setModalOpen(false);
  };

  const deleteCliente = function(id) {
    if (window.confirm('¿Estás seguro de eliminar este cliente?')) {
      setClientes(clientes.filter(function(cliente) {
        return cliente.id !== id;
      }));
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <NavBar navigate={navigate} />
      
      <div className="pt-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto pb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Gestión de Clientes</h1>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar clientes..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchTerm}
                onChange={function(e) { return setSearchTerm(e.target.value); }}
              />
            </div>
            
            <button
              onClick={function() { return openModal(); }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <FiPlus /> Nuevo Cliente
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contacto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proyectos</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentClientes.length > 0 ? (
                  currentClientes.map(function(cliente) {
                    return (
                      <tr key={cliente.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={"flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center " + (cliente.tipo === 'empresa' ? 'bg-indigo-100 text-indigo-600' : 'bg-green-100 text-green-600')}>
                              <FiUser className="text-lg" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{cliente.nombre}</div>
                              <div className="text-xs text-gray-500 capitalize">{cliente.tipo}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cliente.contacto}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cliente.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cliente.telefono}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {cliente.proyectos} proyectos
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={function() { return openModal(cliente); }}
                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                            title="Editar"
                          >
                            <FiEdit2 />
                          </button>
                          <button
                            onClick={function() { return deleteCliente(cliente.id); }}
                            className="text-red-600 hover:text-red-900"
                            title="Eliminar"
                          >
                            <FiTrash2 />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                      No se encontraron clientes
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {filteredClientes.length > 0 && (
            <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={function() { return setCurrentPage(function(prev) { return Math.max(prev - 1, 1); }); }}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Anterior
                </button>
                <button
                  onClick={function() { return setCurrentPage(function(prev) { return Math.min(prev + 1, totalPages); }); }}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Siguiente
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Mostrando <span className="font-medium">{indexOfFirstCliente + 1}</span> a{' '}
                    <span className="font-medium">{Math.min(indexOfLastCliente, filteredClientes.length)}</span> de{' '}
                    <span className="font-medium">{filteredClientes.length}</span> clientes
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={function() { return setCurrentPage(function(prev) { return Math.max(prev - 1, 1); }); }}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Anterior</span>
                      <FiChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </button>
                    {Array.from({ length: totalPages }, function(_, i) { return i + 1; }).map(function(page) {
                      return (
                        <button
                          key={page}
                          onClick={function() { return setCurrentPage(page); }}
                          className={"relative inline-flex items-center px-4 py-2 border text-sm font-medium " + (currentPage === page ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50')}
                        >
                          {page}
                        </button>
                      );
                    })}
                    <button
                      onClick={function() { return setCurrentPage(function(prev) { return Math.min(prev + 1, totalPages); }); }}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Siguiente</span>
                      <FiChevronRight className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>

        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">
                  {currentCliente ? 'Editar Cliente' : 'Agregar Nuevo Cliente'}
                </h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de cliente</label>
                      <div className="flex gap-4">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            className="form-radio h-4 w-4 text-indigo-600"
                            name="tipo"
                            value="empresa"
                            checked={formData.tipo === 'empresa'}
                            onChange={handleInputChange}
                          />
                          <span className="ml-2 text-gray-700">Empresa</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            className="form-radio h-4 w-4 text-indigo-600"
                            name="tipo"
                            value="individual"
                            checked={formData.tipo === 'individual'}
                            onChange={handleInputChange}
                          />
                          <span className="ml-2 text-gray-700">Individual</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {formData.tipo === 'empresa' ? 'Nombre de la empresa' : 'Nombre completo'}
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Persona de contacto</label>
                      <input
                        type="text"
                        name="contacto"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={formData.contacto}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                      <input
                        type="tel"
                        name="telefono"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={formData.telefono}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                      <textarea
                        name="direccion"
                        rows="2"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={formData.direccion}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={function() { return setModalOpen(false); }}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {currentCliente ? 'Guardar Cambios' : 'Agregar Cliente'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Clientes;