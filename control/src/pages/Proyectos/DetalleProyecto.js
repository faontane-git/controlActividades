import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/Navbar';
import Actividades from './Actividades';
import Novedades from './Novedades';
import Microactividades from './Microactividades';
import Swal from 'sweetalert2';

const DetalleProyecto = () => {
  const ESTADOS_MICROACTIVIDAD = {
    INICIADO: 'Iniciado',
    DESARROLLO: 'Desarrollo',
    FINALIZADO: 'Finalizado'
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [proyecto, setProyecto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actividadSeleccionada, setActividadSeleccionada] = useState(null);

  useEffect(() => {
    const fetchProyectoConDatos = async () => {
      try {
        const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
        const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

        const res = await fetch(
          `${supabaseUrl}/rest/v1/proyectos?id=eq.${id}&select=*,actividades(*,microactividades(*)),novedades(*)`,
          {
            headers: {
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`
            }
          }
        );

        const data = await res.json();
        if (data.length > 0) {
          const proyectoData = data[0];
          setProyecto({
            ...proyectoData,
            actividades: proyectoData.actividades ?? [],
            novedades: proyectoData.novedades ?? []
          });
        } else {
          setProyecto(null);
        }
      } catch (error) {
        console.error("Error al cargar el proyecto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProyectoConDatos();
  }, [id]);

  const handleAddActividad = (nuevaActividad) => {
    setProyecto(prev => ({
      ...prev,
      actividades: [...(prev.actividades ?? []), nuevaActividad]
    }));
  };

  const handleAddNovedad = (nuevaNovedad) => {
    setProyecto(prev => ({
      ...prev,
      novedades: [...(prev.novedades ?? []), nuevaNovedad]
    }));
  };

  const cambiarEstadoMicroactividad = (actividadId, microactividadId, nuevoEstado) => {
    setProyecto(prev => {
      const actividadesActualizadas = (prev.actividades ?? []).map(actividad => {
        if (actividad.id === actividadId) {
          const microActualizadas = (actividad.microactividades ?? []).map(m => {
            if (m.id === microactividadId) {
              return { ...m, estado: nuevoEstado };
            }
            return m;
          });
          return { ...actividad, microactividades: microActualizadas };
        }
        return actividad;
      });

      return { ...prev, actividades: actividadesActualizadas };
    });
  };

  const seleccionarActividad = (actividad) => {
    setActividadSeleccionada(actividad);
  };

  const cerrarPanelMicroactividades = () => {
    setActividadSeleccionada(null);
  };

  const agregarMicroactividad = (actividadId, microactividad) => {
    setProyecto(prev => {
      const actividadesActualizadas = (prev.actividades ?? []).map(actividad => {
        if (actividad.id === actividadId) {
          return {
            ...actividad,
            microactividades: [
              {
                id: Date.now(),
                nombre: microactividad.nombre,
                descripcion: microactividad.descripcion,
                horas: microactividad.horas,
                estado: ESTADOS_MICROACTIVIDAD.INICIADO
              },
              ...(actividad.microactividades ?? [])
            ]
          };
        }
        return actividad;
      });

      return { ...prev, actividades: actividadesActualizadas };
    });
  };

  const handleDeleteNovedad = async (id) => {
    const confirm = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    });

    if (confirm.isConfirmed) {
      try {
        const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
        const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

        const response = await fetch(`${supabaseUrl}/rest/v1/novedades?id=eq.${id}`, {
          method: 'DELETE',
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`
          }
        });

        if (response.ok) {
          setProyecto(prev => ({
            ...prev,
            novedades: prev.novedades.filter(n => n.id !== id)
          }));

          Swal.fire('Eliminado', 'La novedad fue eliminada correctamente.', 'success');
        } else {
          Swal.fire('Error', 'Hubo un problema al eliminar la novedad.', 'error');
        }
      } catch (error) {
        console.error('❌ Error en handleDeleteNovedad:', error);
        Swal.fire('Error', 'No se pudo completar la operación.', 'error');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!proyecto) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded max-w-md mx-auto mt-8">
        <strong>No encontrado:</strong>
        <span> El proyecto solicitado no existe.</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="pt-24 px-4 md:px-12 max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver a proyectos
        </button>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{proyecto.nombre}</h1>
          <p className="text-gray-600">{proyecto.descripcion}</p>
        </div>

        {/* ✅ Asegurarse que actividades existe antes de renderizar */}
        {proyecto.actividades && (
          <Actividades
            actividades={proyecto.actividades}
            onAddActividad={handleAddActividad}
            onSelectActividad={seleccionarActividad}
          />
        )}

        <Novedades
          novedades={proyecto.novedades}
          onAddNovedad={handleAddNovedad}
          onDeleteNovedad={handleDeleteNovedad}
        />

        {actividadSeleccionada && (
          <Microactividades
            actividadSeleccionada={actividadSeleccionada}
            onCerrarPanel={cerrarPanelMicroactividades}
            onCambiarEstadoMicroactividad={cambiarEstadoMicroactividad}
            onAgregarMicroactividad={agregarMicroactividad}
          />
        )}
      </div>
    </div>
  );
};

export default DetalleProyecto;
