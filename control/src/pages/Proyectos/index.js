import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiFolder } from 'react-icons/fi';
import NavBar from '../NavBar/Navbar';

const Proyectos = () => {
  // Estado para los proyectos
  const [proyectos, setProyectos] = useState([]);
  const [proyectoEditando, setProyectoEditando] = useState(null);
  const [nuevoProyecto, setNuevoProyecto] = useState({
    nombre: '',
    descripcion: '',
    fechaInicio: '',
    fechaFin: ''
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Cargar proyectos al montar el componente
  useEffect(() => {
    // Aquí iría la llamada a tu API
    const proyectosIniciales = [
      { id: 1, nombre: 'Sitio Web Corporativo', descripcion: 'Desarrollo del sitio web principal', fechaInicio: '2023-01-15', fechaFin: '2023-03-30' },
      { id: 2, nombre: 'App Móvil', descripcion: 'Desarrollo aplicación móvil iOS/Android', fechaInicio: '2023-02-10', fechaFin: '2023-05-20' }
    ];
    setProyectos(proyectosIniciales);
  }, []);

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (proyectoEditando) {
      setProyectoEditando({ ...proyectoEditando, [name]: value });
    } else {
      setNuevoProyecto({ ...nuevoProyecto, [name]: value });
    }
  };

  // Crear nuevo proyecto
  const crearProyecto = (e) => {
    e.preventDefault();
    const proyecto = {
      id: proyectos.length > 0 ? Math.max(...proyectos.map(p => p.id)) + 1 : 1,
      ...nuevoProyecto
    };
    setProyectos([...proyectos, proyecto]);
    setNuevoProyecto({ nombre: '', descripcion: '', fechaInicio: '', fechaFin: '' });
    setMostrarFormulario(false);
  };

  // Editar proyecto
  const editarProyecto = (proyecto) => {
    setProyectoEditando({ ...proyecto });
  };

  // Guardar cambios al editar
  const guardarEdicion = (e) => {
    e.preventDefault();
    setProyectos(proyectos.map(p => p.id === proyectoEditando.id ? proyectoEditando : p));
    setProyectoEditando(null);
  };

  // Eliminar proyecto
  const eliminarProyecto = (id) => {
    setProyectos(proyectos.filter(p => p.id !== id));
  };

  // Cancelar edición
  const cancelarEdicion = () => {
    setProyectoEditando(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <div className="container mx-auto px-4 py-8 pt-24"> {/* pt-24 para dejar espacio para el NavBar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <FiFolder className="text-2xl text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-800">Gestión de Proyectos</h1>
          </div>
          <button
            onClick={() => setMostrarFormulario(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <FiPlus className="mr-2" /> Nuevo Proyecto
          </button>
        </div>

        {/* Formulario para nuevo proyecto */}
        {mostrarFormulario && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Crear Nuevo Proyecto</h2>
            <form onSubmit={crearProyecto}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    value={nuevoProyecto.nombre}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Descripción</label>
                  <input
                    type="text"
                    name="descripcion"
                    value={nuevoProyecto.descripcion}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Fecha Inicio</label>
                  <input
                    type="date"
                    name="fechaInicio"
                    value={nuevoProyecto.fechaInicio}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Fecha Fin</label>
                  <input
                    type="date"
                    name="fechaFin"
                    value={nuevoProyecto.fechaFin}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setMostrarFormulario(false)}
                  className="px-4 py-2 border rounded-lg text-gray-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Formulario para editar proyecto */}
        {proyectoEditando && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Editar Proyecto</h2>
            <form onSubmit={guardarEdicion}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    value={proyectoEditando.nombre}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Descripción</label>
                  <input
                    type="text"
                    name="descripcion"
                    value={proyectoEditando.descripcion}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Fecha Inicio</label>
                  <input
                    type="date"
                    name="fechaInicio"
                    value={proyectoEditando.fechaInicio}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Fecha Fin</label>
                  <input
                    type="date"
                    name="fechaFin"
                    value={proyectoEditando.fechaFin}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={cancelarEdicion}
                  className="px-4 py-2 border rounded-lg text-gray-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Listado de proyectos */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fechas</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {proyectos.map((proyecto) => (
                <tr key={proyecto.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{proyecto.nombre}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-600">{proyecto.descripcion}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-600">
                      {proyecto.fechaInicio} a {proyecto.fechaFin}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => editarProyecto(proyecto)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => eliminarProyecto(proyecto.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Proyectos;