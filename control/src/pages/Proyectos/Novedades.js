import React, { useState } from 'react';

const Novedades = ({ novedades, onAddNovedad }) => {
  const [showModal, setShowModal] = useState(false);
  const [nuevaNovedad, setNuevaNovedad] = useState({
    tipo: 'Error',
    descripcion: '',
    fecha: new Date().toISOString().split('T')[0],
    archivos: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaNovedad(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setNuevaNovedad(prev => ({ ...prev, archivos: [...prev.archivos, ...files] }));
  };

  const removeFile = (index) => {
    setNuevaNovedad(prev => ({
      ...prev,
      archivos: prev.archivos.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddNovedad({
      ...nuevaNovedad,
      id: Date.now(),
      archivos: nuevaNovedad.archivos.map(file => ({
        nombre: file.name,
        tipo: file.type,
        url: URL.createObjectURL(file)
      }))
    });
    setShowModal(false);
    setNuevaNovedad({
      tipo: 'Error',
      descripcion: '',
      fecha: new Date().toISOString().split('T')[0],
      archivos: []
    });
  };

  const getTipoColor = (tipo) => {
    switch(tipo) {
      case 'Error': return 'bg-red-100 text-red-800';
      case 'Fix': return 'bg-green-100 text-green-800';
      case 'Mejora': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Novedades del Proyecto</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm flex items-center"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Nueva Novedad
        </button>
      </div>

      {novedades.length > 0 ? (
        <div className="space-y-4">
          {novedades.slice(0, 3).map((novedad) => (
            <div key={novedad.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <span className={`text-xs px-2 py-1 rounded-full ${getTipoColor(novedad.tipo)} font-medium mr-3`}>
                  {novedad.tipo}
                </span>
                <div className="flex-1">
                  <p className="text-gray-600">{novedad.descripcion}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    <svg className="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {novedad.fecha}
                  </p>
                  {novedad.archivos.length > 0 && (
                    <div className="mt-2">
                      <span className="text-xs text-gray-500">
                        <svg className="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        {novedad.archivos.length} archivo(s) adjunto(s)
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500">
          <svg className="w-12 h-12 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="mt-2">No hay novedades registradas</p>
        </div>
      )}

      {/* Modal para agregar novedad */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Nueva Novedad</h3>
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
                  <label className="block text-gray-700 mb-2">Tipo de Novedad</label>
                  <select
                    name="tipo"
                    value={nuevaNovedad.tipo}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  >
                    <option value="Error">Error</option>
                    <option value="Fix">Fix</option>
                    <option value="Mejora">Mejora</option>
                    <option value="Observación">Observación</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Descripción</label>
                  <textarea
                    name="descripcion"
                    value={nuevaNovedad.descripcion}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    rows="3"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Fecha</label>
                  <input
                    type="date"
                    name="fecha"
                    value={nuevaNovedad.fecha}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Evidencia (Fotos/Videos)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      id="file-upload"
                      multiple
                      accept="image/*,video/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer flex flex-col items-center justify-center"
                    >
                      <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span className="text-blue-600 font-medium">Seleccionar archivos</span>
                      <span className="text-xs text-gray-500">Formatos soportados: JPG, PNG, MP4</span>
                    </label>
                  </div>

                  {nuevaNovedad.archivos.length > 0 && (
                    <div className="mt-2">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Archivos seleccionados:</h4>
                      <ul className="space-y-1">
                        {nuevaNovedad.archivos.map((file, index) => (
                          <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                            <span className="text-sm truncate">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
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
                    className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                  >
                    Guardar Novedad
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

export default Novedades;