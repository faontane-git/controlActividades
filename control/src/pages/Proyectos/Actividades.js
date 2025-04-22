import React, { useState } from 'react';

const Actividades = ({ actividades, onAddActividad }) => {
  const [showModal, setShowModal] = useState(false);
  const [nuevaActividad, setNuevaActividad] = useState({
    nombre: '',
    descripcion: '',
    fechaInicio: '',
    fechaFin: '',
    horasEstimadas: 0,
    microActividades: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaActividad(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddActividad({
      ...nuevaActividad,
      id: Date.now()
    });
    setShowModal(false);
    setNuevaActividad({
      nombre: '',
      descripcion: '',
      fechaInicio: '',
      fechaFin: '',
      horasEstimadas: 0,
      microActividades: []
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Actividades del Proyecto</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm flex items-center"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Nueva Actividad
        </button>
      </div>

      {actividades.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {actividades.slice(0, 3).map((actividad) => (
            <div key={actividad.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg mb-1">{actividad.nombre}</h3>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{actividad.descripcion}</p>
              <div className="flex items-center text-xs text-gray-500">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {actividad.fechaInicio} - {actividad.fechaFin}
              </div>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {actividad.horasEstimadas} horas
                </span>
                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                  {actividad.microActividades.length} microactividades
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500">
          <svg className="w-12 h-12 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="mt-2">No hay actividades registradas</p>
        </div>
      )}

      {/* Modal para agregar actividad */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Nueva Actividad</h3>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    value={nuevaActividad.nombre}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Descripción</label>
                  <textarea
                    name="descripcion"
                    value={nuevaActividad.descripcion}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    rows="3"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Fecha Inicio</label>
                    <input
                      type="date"
                      name="fechaInicio"
                      value={nuevaActividad.fechaInicio}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Fecha Fin</label>
                    <input
                      type="date"
                      name="fechaFin"
                      value={nuevaActividad.fechaFin}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Horas Estimadas</label>
                  <input
                    type="number"
                    name="horasEstimadas"
                    value={nuevaActividad.horasEstimadas}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    min="0"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Actividades;