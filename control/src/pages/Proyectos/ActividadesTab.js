import { useState } from 'react';
import { FiCalendar, FiDownload, FiPlus, FiX } from 'react-icons/fi';

const ActividadesTab = ({ actividades, searchTerm, onExportBitacora }) => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevaActividad, setNuevaActividad] = useState({
    titulo: '',
    estado: 'pendiente',
    fecha_inicio: '',
    fecha_fin: '',
    responsable: '',
    prioridad: 'media',
    detalles: ''
  });

  const getEstadoColor = (estado) => {
    switch(estado) {
      case 'completado': return 'bg-green-100 text-green-800';
      case 'en-progreso': return 'bg-blue-100 text-blue-800';
      case 'pendiente': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaActividad(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí normalmente harías una llamada API para guardar la actividad
    console.log('Nueva actividad:', nuevaActividad);
    setMostrarModal(false);
    setNuevaActividad({
      titulo: '',
      estado: 'pendiente',
      fecha_inicio: '',
      fecha_fin: '',
      responsable: '',
      prioridad: 'media',
      detalles: ''
    });
  };

  const filteredActividades = actividades.filter(actividad =>
    actividad.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    actividad.responsable.toLowerCase().includes(searchTerm.toLowerCase()) ||
    actividad.estado.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 p-6">
      {/* Modal para crear nueva actividad */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">Crear Nueva Actividad</h3>
                <button 
                  onClick={() => setMostrarModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Título*</label>
                    <input
                      type="text"
                      name="titulo"
                      value={nuevaActividad.titulo}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Inicio*</label>
                      <input
                        type="date"
                        name="fecha_inicio"
                        value={nuevaActividad.fecha_inicio}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Fin*</label>
                      <input
                        type="date"
                        name="fecha_fin"
                        value={nuevaActividad.fecha_fin}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Estado*</label>
                      <select
                        name="estado"
                        value={nuevaActividad.estado}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      >
                        <option value="pendiente">Pendiente</option>
                        <option value="en-progreso">En Progreso</option>
                        <option value="completado">Completado</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Prioridad*</label>
                      <select
                        name="prioridad"
                        value={nuevaActividad.prioridad}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      >
                        <option value="alta">Alta</option>
                        <option value="media">Media</option>
                        <option value="baja">Baja</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Responsable*</label>
                    <input
                      type="text"
                      name="responsable"
                      value={nuevaActividad.responsable}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Detalles</label>
                    <textarea
                      name="detalles"
                      value={nuevaActividad.detalles}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setMostrarModal(false)}
                    className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Crear Actividad
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Encabezado con botones de acción */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <FiCalendar className="mr-2" /> Listado de Actividades
        </h2>
        
        <div className="flex space-x-3">
          <button
            onClick={() => setMostrarModal(true)}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <FiPlus className="mr-2" />
            Nueva Actividad
          </button>
          <button
            onClick={onExportBitacora}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <FiDownload className="mr-2" />
            Exportar Bitácora
          </button>
        </div>
      </div>
      
      {/* Listado de actividades */}
      {filteredActividades.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActividades.map(actividad => (
            <div key={actividad.id} className="border-l-4 border-indigo-500 bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-medium text-gray-900">{actividad.titulo}</h3>
                  <span className={`${getEstadoColor(actividad.estado)} text-xs px-2 py-1 rounded-full`}>
                    {actividad.estado.replace('-', ' ')}
                  </span>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <FiCalendar className="mr-2" />
                    {new Date(actividad.fecha_inicio).toLocaleDateString()} - {new Date(actividad.fecha_fin).toLocaleDateString()}
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    Responsable: <span className="font-medium">{actividad.responsable}</span>
                  </div>

                  <div className="text-sm text-gray-500">
                    Prioridad: <span className={`font-medium ${
                      actividad.prioridad === 'alta' ? 'text-red-500' : 
                      actividad.prioridad === 'media' ? 'text-yellow-500' : 'text-green-500'
                    }`}>
                      {actividad.prioridad}
                    </span>
                  </div>
                  
                  {actividad.detalles && (
                    <div className="text-sm text-gray-600 mt-2">
                      <p className="font-medium">Detalles:</p>
                      <p>{actividad.detalles}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {searchTerm ? 'No se encontraron actividades que coincidan con la búsqueda' : 'No hay actividades registradas'}
          </p>
          <button
            onClick={() => setMostrarModal(true)}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center mx-auto"
          >
            <FiPlus className="mr-2" /> Crear primera actividad
          </button>
        </div>
      )}
    </div>
  );
};

export default ActividadesTab;