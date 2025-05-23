import React, { useState } from 'react';

const Novedades = ({ novedades, onAddNovedad, onDeleteNovedad, empleados = [] }) => {
  const [showModal, setShowModal] = useState(false);
  const [editandoNovedad, setEditandoNovedad] = useState(null);
  const [form, setForm] = useState({
    tipo: 'Error',
    descripcion: '',
    fecha: new Date().toISOString().split('T')[0],
    evidencia: null,
    proyecto_id: null,
    responsable_id: ''
  });
  const [imagenAmpliada, setImagenAmpliada] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const convertirACompressBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const scale = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const base64 = canvas.toDataURL('image/jpeg', 0.6);
        callback(base64);
      };
    };
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      convertirACompressBase64(file, (base64) => {
        setForm(prev => ({ ...prev, evidencia: base64 }));
      });
    }
  };

  const handleEditar = (novedad) => {
    setEditandoNovedad(novedad);
    setForm({
      tipo: novedad.tipo,
      descripcion: novedad.descripcion,
      fecha: novedad.fecha,
      evidencia: null,
      id: novedad.id,
      proyecto_id: novedad.proyecto_id,
      responsable_id: novedad.responsable_id || ''
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditandoNovedad(null);
    setForm({
      tipo: 'Error',
      descripcion: '',
      fecha: new Date().toISOString().split('T')[0],
      evidencia: null,
      proyecto_id: null,
      responsable_id: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
    const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

    const payload = {
      tipo: form.tipo,
      descripcion: form.descripcion,
      fecha: form.fecha,
      evidencia: form.evidencia,
      proyecto_id: form.proyecto_id,
      responsable_id: parseInt(form.responsable_id)
    };

    const url = `${supabaseUrl}/rest/v1/novedades${editandoNovedad ? `?id=eq.${form.id}` : ''}`;
    const method = editandoNovedad ? 'PATCH' : 'POST';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: 'return=representation'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (response.ok) onAddNovedad(data[0]);

    closeModal();
  };

  const marcarComoFinalizada = async (novedadId) => {
    const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
    const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

    const response = await fetch(`${supabaseUrl}/rest/v1/novedades?id=eq.${novedadId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: 'return=representation'
      },
      body: JSON.stringify({ tipo: 'Finalizado' })
    });

    if (response.ok) {
      const data = await response.json();
      onAddNovedad(data[0]);
    }
  };

  const getTipoColor = (tipo) => {
    switch (tipo) {
      case 'Error': return 'bg-red-100 text-red-800';
      case 'Fix': return 'bg-green-100 text-green-800';
      case 'Mejora': return 'bg-blue-100 text-blue-800';
      case 'Avance': return 'bg-indigo-100 text-indigo-800';
      case 'Comentario': return 'bg-yellow-100 text-yellow-800';
      case 'Finalizado': return 'bg-emerald-100 text-emerald-800';
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

      {Array.isArray(novedades) && novedades.length > 0 ? (
        <div className="space-y-4">
          {novedades.map((novedad) => (
            <div key={novedad.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow relative">
              <div className="flex items-start">
                <span className={`text-xs px-2 py-1 rounded-full ${getTipoColor(novedad.tipo)} font-medium mr-3`}>
                  {novedad.tipo}
                </span>
                <div className="flex-1">
                  <p className="text-gray-600">{novedad.descripcion}</p>
                  <p className="text-xs text-gray-400 mt-2">📅 {novedad.fecha}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Responsable: {empleados.find(e => e.id === novedad.responsable_id)?.nombre || 'No asignado'}
                  </p>
                  {novedad.evidencia && (
                    <div className="mt-2">
                      {novedad.evidencia.endsWith('.mp4') ? (
                        <video className="mt-1 max-w-xs rounded" controls>
                          <source src={novedad.evidencia} type="video/mp4" />
                        </video>
                      ) : (
                        <img
                          src={novedad.evidencia}
                          alt="Evidencia"
                          className="mt-1 max-w-xs rounded cursor-pointer"
                          onClick={() => setImagenAmpliada(novedad.evidencia)}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="absolute top-2 right-2 flex gap-2">
                <button onClick={() => handleEditar(novedad)} title="Editar" className="text-blue-600 hover:text-blue-800 text-sm">✏️</button>
                <button onClick={() => onDeleteNovedad(novedad.id)} title="Eliminar" className="text-red-600 hover:text-red-800 text-sm">🗑️</button>
                <button onClick={() => marcarComoFinalizada(novedad.id)} title="Finalizar" className="text-green-600 hover:text-green-800 text-sm">✅</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500">No hay novedades registradas</div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <form onSubmit={handleSubmit}>
                <h3 className="text-lg font-bold mb-4">{editandoNovedad ? 'Editar Novedad' : 'Nueva Novedad'}</h3>

                <label className="block mb-2 text-sm font-medium text-gray-700">Tipo</label>
                <select name="tipo" value={form.tipo} onChange={handleChange} className="w-full border rounded p-2 mb-4" required>
                  <option value="Error">Error</option>
                  <option value="Fix">Fix</option>
                  <option value="Mejora">Mejora</option>
                  <option value="Avance">Avance</option>
                  <option value="Comentario">Comentario</option>
                </select>

                <label className="block mb-2 text-sm font-medium text-gray-700">Descripción</label>
                <textarea name="descripcion" value={form.descripcion} onChange={handleChange} className="w-full border rounded p-2 mb-4" required />

                <label className="block mb-2 text-sm font-medium text-gray-700">Fecha</label>
                <input type="date" name="fecha" value={form.fecha} onChange={handleChange} className="w-full border rounded p-2 mb-4" required />

                <label className="block mb-2 text-sm font-medium text-gray-700">Responsable</label>
                <select name="responsable_id" value={form.responsable_id} onChange={handleChange} className="w-full border rounded p-2 mb-4" required>
                  <option value="">Selecciona un responsable</option>
                  {empleados.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.nombre}</option>
                  ))}
                </select>

                <label className="block mb-2 text-sm font-medium text-gray-700">Evidencia</label>
                <input type="file" accept="image/*,video/*" onChange={handleFileChange} className="w-full border rounded p-2 mb-4" />

                <div className="flex justify-end space-x-2">
                  <button type="button" onClick={closeModal} className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50">Cancelar</button>
                  <button type="submit" className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700">{editandoNovedad ? 'Actualizar' : 'Guardar'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Vista ampliada */}
      {imagenAmpliada && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative">
            <button onClick={() => setImagenAmpliada(null)} className="absolute top-0 right-0 text-white p-2 text-xl">✖</button>
            <img src={imagenAmpliada} alt="Vista ampliada" className="max-h-[90vh] max-w-[90vw] rounded shadow-lg" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Novedades;
