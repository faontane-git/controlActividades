import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

const Actividades = ({ actividades = [], onAddActividad, onSelectActividad }) => {
  const [nuevaActividad, setNuevaActividad] = useState({
    nombre: '',
    descripcion: '',
    fechaInicio: '',
    fechaFin: '',
    horasEstimadas: 0,
    microActividades: []
  });

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaActividad(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const actividadCompleta = {
      ...nuevaActividad,
      id: actividades.length + 1,
      horasEstimadas: parseInt(nuevaActividad.horasEstimadas),
      microActividades: []  // Aseguramos array vacío al crear
    };
    onAddActividad(actividadCompleta);
    setNuevaActividad({
      nombre: '',
      descripcion: '',
      fechaInicio: '',
      fechaFin: '',
      horasEstimadas: 0,
      microActividades: []
    });
    setMostrarFormulario(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Actividades</h2>
        <button
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <PlusIcon className="w-5 h-5 mr-1" />
          Agregar Actividad
        </button>
      </div>

      {mostrarFormulario && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input
                type="text"
                name="nombre"
                value={nuevaActividad.nombre}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Horas estimadas</label>
              <input
                type="number"
                name="horasEstimadas"
                value={nuevaActividad.horasEstimadas}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
                min="1"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
              <textarea
                name="descripcion"
                value={nuevaActividad.descripcion}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                rows="3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha inicio</label>
              <input
                type="date"
                name="fechaInicio"
                value={nuevaActividad.fechaInicio}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha fin</label>
              <input
                type="date"
                name="fechaFin"
                value={nuevaActividad.fechaFin}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setMostrarFormulario(false)}
              className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Guardar Actividad
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {actividades.map(actividad => {
          const micro = actividad.microActividades || actividad.microactividades || [];

          return (
            <div
              key={actividad.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onSelectActividad(actividad)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{actividad.nombre}</h3>
                  <p className="text-gray-600">{actividad.descripcion}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {actividad.horasEstimadas} horas
                  </span>
                  <div className="mt-1 text-sm text-gray-500">
                    {actividad.fechaInicio} - {actividad.fechaFin}
                  </div>
                </div>
              </div>
              <div className="mt-2 flex space-x-2">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  {micro.filter(m => m.estado === 'Finalizado').length} finalizadas
                </span>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                  {micro.filter(m => m.estado === 'Desarrollo').length} en desarrollo
                </span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {micro.filter(m => m.estado === 'Iniciado').length} iniciadas
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Actividades;
