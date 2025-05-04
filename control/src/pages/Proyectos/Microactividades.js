import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

const ESTADOS_MICROACTIVIDAD = {
  INICIADO: 'Iniciado',
  DESARROLLO: 'Desarrollo',
  FINALIZADO: 'Finalizado'
};

const Microactividades = ({
  actividadSeleccionada,
  onCerrarPanel,
  onCambiarEstadoMicroactividad // opcional si ya se actualiza localmente
}) => {
  const [microactividades, setMicroactividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar microactividades de la BD
  useEffect(() => {
    const fetchMicroactividades = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('microactividades')
        .select('*')
        .eq('actividad_id', actividadSeleccionada.id);

      if (error) {
        setError(error.message);
      } else {
        setMicroactividades(data);
      }
      setLoading(false);
    };

    fetchMicroactividades();
  }, [actividadSeleccionada.id]);

  const handleDrop = async (e, nuevoEstado) => {
    e.preventDefault();
    const microId = parseInt(e.dataTransfer.getData('microactividadId'));
    const micro = microactividades.find(m => m.id === microId);
    if (!micro || micro.estado === nuevoEstado) return;

    // Update en la BD
    await supabase
      .from('microactividades')
      .update({ estado: nuevoEstado })
      .eq('id', microId);

    // Update local
    setMicroactividades(prev =>
      prev.map(m =>
        m.id === microId ? { ...m, estado: nuevoEstado } : m
      )
    );
  };

  const handleDragStart = (e, micro) => {
    e.dataTransfer.setData('microactividadId', micro.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const renderColumna = (estado, bgColor, textColor) => (
    <div
      className={`${bgColor} p-4 rounded-lg min-h-[200px]`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => handleDrop(e, estado)}
    >
      <h3 className={`font-semibold ${textColor} mb-4 text-center`}>{estado}</h3>
      {microactividades
        .filter(m => m.estado === estado)
        .map(m => (
          <div
            key={m.id}
            className="bg-white p-3 rounded shadow-sm border border-gray-200 hover:shadow-md cursor-move"
            draggable
            onDragStart={(e) => handleDragStart(e, m)}
          >
            <h4 className="font-medium text-gray-800">{m.nombre}</h4>
            <p className="text-sm text-gray-600">{m.descripcion}</p>
            <div className="text-xs text-right mt-1">{m.horas}h</div>
          </div>
        ))}
    </div>
  );

  if (loading) return <div className="text-center py-10">Cargando microactividades...</div>;
  if (error) return <div className="text-center text-red-500 py-4">Error: {error}</div>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-5xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Microactividades: {actividadSeleccionada.nombre}
          </h2>
          <button
            onClick={onCerrarPanel}
            className="text-gray-500 hover:text-gray-700"
          >
            ✖
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {renderColumna(ESTADOS_MICROACTIVIDAD.INICIADO, 'bg-blue-50', 'text-blue-800')}
          {renderColumna(ESTADOS_MICROACTIVIDAD.DESARROLLO, 'bg-yellow-50', 'text-yellow-800')}
          {renderColumna(ESTADOS_MICROACTIVIDAD.FINALIZADO, 'bg-green-50', 'text-green-800')}
        </div>
      </div>
    </div>
  );
};

export default Microactividades;
