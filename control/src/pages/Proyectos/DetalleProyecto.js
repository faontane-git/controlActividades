import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/Navbar';
import Actividades from './Actividades';
import Novedades from './Novedades';
import Microactividades from './Microactividades';
import Swal from 'sweetalert2';
import { 
  FiArrowLeft, 
  FiEdit2, 
  FiTrash2, 
  FiCheck, 
  FiX, 
  FiClock, 
  FiInfo,
  FiSave,
  FiPlus,
  FiRefreshCw
} from 'react-icons/fi';

const DetalleProyecto = () => {
  // Estados del proyecto
  const ESTADOS_MICROACTIVIDAD = {
    INICIADO: 'Iniciado',
    DESARROLLO: 'En Desarrollo',
    FINALIZADO: 'Finalizado',
    BLOQUEADO: 'Bloqueado'
  };

  const ESTADOS_PROYECTO = {
    ABIERTO: 'Abierto',
    CERRADO: 'Cerrado',
    PAUSADO: 'En Pausa'
  };

  // Configuración de colores para los estados
  const COLORES_ESTADO = {
    [ESTADOS_PROYECTO.ABIERTO]: 'bg-green-100 text-green-800',
    [ESTADOS_PROYECTO.CERRADO]: 'bg-red-100 text-red-800',
    [ESTADOS_PROYECTO.PAUSADO]: 'bg-yellow-100 text-yellow-800',
    [ESTADOS_MICROACTIVIDAD.INICIADO]: 'bg-blue-100 text-blue-800',
    [ESTADOS_MICROACTIVIDAD.DESARROLLO]: 'bg-purple-100 text-purple-800',
    [ESTADOS_MICROACTIVIDAD.FINALIZADO]: 'bg-emerald-100 text-emerald-800',
    [ESTADOS_MICROACTIVIDAD.BLOQUEADO]: 'bg-amber-100 text-amber-800'
  };

  // Obtener parámetros de la URL
  const { id } = useParams();
  const navigate = useNavigate();

  // Estados del componente
  const [proyecto, setProyecto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actividadSeleccionada, setActividadSeleccionada] = useState(null);
  const [porcentajeManual, setPorcentajeManual] = useState(0);
  const [editandoPorcentaje, setEditandoPorcentaje] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_estimada: ''
  });

  // Configuración de la API
  const API_CONFIG = {
    url: process.env.REACT_APP_SUPABASE_URL,
    key: process.env.REACT_APP_SUPABASE_ANON_KEY,
    headers: {
      apikey: process.env.REACT_APP_SUPABASE_ANON_KEY,
      Authorization: `Bearer ${process.env.REACT_APP_SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    }
  };

  // Opciones para SweetAlert
  const SWAL_CONFIG = {
    confirmButtonColor: '#4f46e5',
    cancelButtonColor: '#ef4444',
    showCancelButton: true,
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar'
  };

  // Estilos reutilizables
  const styles = {
    card: 'bg-white rounded-xl shadow-sm border border-gray-100 p-6',
    buttonPrimary: 'px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center',
    buttonSecondary: 'px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center',
    buttonDanger: 'px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center',
    buttonSuccess: 'px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center',
    input: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500',
    badge: 'px-2.5 py-0.5 rounded-full text-xs font-medium'
  };

  // Cargar datos del proyecto
  useEffect(() => {
    const fetchProyectoConDatos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await fetch(
          `${API_CONFIG.url}/rest/v1/proyectos?id=eq.${id}&select=*,actividades(*,microactividades(*)),novedades(*)`,
          {
            headers: API_CONFIG.headers
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
          setFormData({
            nombre: proyectoData.nombre,
            descripcion: proyectoData.descripcion,
            fecha_inicio: proyectoData.fecha_inicio,
            fecha_estimada: proyectoData.fecha_estimada
          });
          setPorcentajeManual(proyectoData.porcentaje || 0);
        } else {
          setProyecto(null);
        }
      } catch (error) {
        console.error("Error al cargar el proyecto:", error);
        setError("Error al cargar los datos del proyecto");
      } finally {
        setLoading(false);
      }
    };

    fetchProyectoConDatos();
  }, [id]);

  // Calcular porcentaje automático basado en microactividades
  const calcularPorcentajeAutomatico = () => {
    if (!proyecto?.actividades?.length) return 0;

    let totalMicro = 0;
    let completadas = 0;

    proyecto.actividades.forEach(actividad => {
      actividad.microactividades?.forEach(micro => {
        totalMicro++;
        if (micro.estado === ESTADOS_MICROACTIVIDAD.FINALIZADO) {
          completadas++;
        }
      });
    });

    return totalMicro > 0 ? Math.round((completadas / totalMicro) * 100) : 0;
  };

  // Manejar cambios en el formulario
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Guardar cambios del proyecto
  const guardarCambiosProyecto = async () => {
    try {
      const response = await fetch(`${API_CONFIG.url}/rest/v1/proyectos?id=eq.${id}`, {
        method: 'PATCH',
        headers: API_CONFIG.headers,
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setProyecto(prev => ({ ...prev, ...formData }));
        setModoEdicion(false);
        Swal.fire({
          title: '¡Guardado!',
          text: 'Los cambios se han guardado correctamente.',
          icon: 'success',
          ...SWAL_CONFIG
        });
      } else {
        throw new Error('Error al guardar');
      }
    } catch (error) {
      console.error('Error al guardar proyecto:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudieron guardar los cambios.',
        icon: 'error',
        ...SWAL_CONFIG
      });
    }
  };

  // Actualizar porcentaje del proyecto
  const actualizarPorcentajeProyecto = async (nuevoPorcentaje) => {
    try {
      const response = await fetch(`${API_CONFIG.url}/rest/v1/proyectos?id=eq.${id}`, {
        method: 'PATCH',
        headers: API_CONFIG.headers,
        body: JSON.stringify({ porcentaje: nuevoPorcentaje })
      });

      if (response.ok) {
        setProyecto(prev => ({ ...prev, porcentaje: nuevoPorcentaje }));
        setPorcentajeManual(nuevoPorcentaje);
        setEditandoPorcentaje(false);
        Swal.fire({
          title: 'Actualizado',
          text: 'El porcentaje del proyecto ha sido actualizado.',
          icon: 'success',
          ...SWAL_CONFIG
        });
      } else {
        throw new Error('Error al actualizar');
      }
    } catch (error) {
      console.error('Error al actualizar porcentaje:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo actualizar el porcentaje.',
        icon: 'error',
        ...SWAL_CONFIG
      });
    }
  };

  // Cambiar estado del proyecto
  const toggleEstadoProyecto = async () => {
    const nuevoEstado = proyecto.estado === ESTADOS_PROYECTO.ABIERTO 
      ? ESTADOS_PROYECTO.CERRADO 
      : ESTADOS_PROYECTO.ABIERTO;

    const confirm = await Swal.fire({
      title: nuevoEstado === ESTADOS_PROYECTO.CERRADO 
        ? '¿Cerrar el proyecto?' 
        : '¿Reabrir el proyecto?',
      text: nuevoEstado === ESTADOS_PROYECTO.CERRADO 
        ? 'El proyecto se marcará como finalizado.' 
        : 'El proyecto volverá a estar activo.',
      icon: 'question',
      ...SWAL_CONFIG
    });

    if (confirm.isConfirmed) {
      try {
        const response = await fetch(`${API_CONFIG.url}/rest/v1/proyectos?id=eq.${id}`, {
          method: 'PATCH',
          headers: API_CONFIG.headers,
          body: JSON.stringify({
            estado: nuevoEstado,
            fecha_cierre: nuevoEstado === ESTADOS_PROYECTO.CERRADO ? new Date().toISOString() : null
          })
        });

        if (response.ok) {
          setProyecto(prev => ({
            ...prev,
            estado: nuevoEstado,
            fecha_cierre: nuevoEstado === ESTADOS_PROYECTO.CERRADO ? new Date().toISOString() : null
          }));
          Swal.fire({
            title: nuevoEstado === ESTADOS_PROYECTO.CERRADO ? 'Proyecto cerrado' : 'Proyecto reabierto',
            text: `El proyecto ha sido ${nuevoEstado === ESTADOS_PROYECTO.CERRADO ? 'cerrado' : 'reabierto'} correctamente.`,
            icon: 'success',
            ...SWAL_CONFIG
          });
        } else {
          throw new Error('Error al cambiar estado');
        }
      } catch (error) {
        console.error('Error al cambiar estado del proyecto:', error);
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al cambiar el estado del proyecto.',
          icon: 'error',
          ...SWAL_CONFIG
        });
      }
    }
  };

  // Eliminar proyecto
  const eliminarProyecto = async () => {
    const confirm = await Swal.fire({
      title: '¿Eliminar proyecto?',
      text: 'Esta acción no se puede deshacer y eliminará todas las actividades relacionadas.',
      icon: 'warning',
      ...SWAL_CONFIG,
      confirmButtonColor: '#ef4444'
    });

    if (confirm.isConfirmed) {
      try {
        const response = await fetch(`${API_CONFIG.url}/rest/v1/proyectos?id=eq.${id}`, {
          method: 'DELETE',
          headers: API_CONFIG.headers
        });

        if (response.ok) {
          Swal.fire({
            title: 'Eliminado',
            text: 'El proyecto ha sido eliminado correctamente.',
            icon: 'success',
            ...SWAL_CONFIG
          }).then(() => {
            navigate('/proyectos');
          });
        } else {
          throw new Error('Error al eliminar');
        }
      } catch (error) {
        console.error('Error al eliminar proyecto:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo eliminar el proyecto.',
          icon: 'error',
          ...SWAL_CONFIG
        });
      }
    }
  };

  // Manejar agregar actividad
  const handleAddActividad = (nuevaActividad) => {
    setProyecto(prev => ({
      ...prev,
      actividades: [...(prev.actividades ?? []), nuevaActividad]
    }));
  };

  // Manejar agregar novedad
  const handleAddNovedad = (nuevaNovedad) => {
    setProyecto(prev => ({
      ...prev,
      novedades: [...(prev.novedades ?? []), nuevaNovedad]
    }));
  };

  // Manejar eliminar novedad
  const handleDeleteNovedad = async (id) => {
    const confirm = await Swal.fire({
      title: '¿Eliminar novedad?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      ...SWAL_CONFIG,
      confirmButtonColor: '#ef4444'
    });

    if (confirm.isConfirmed) {
      try {
        const response = await fetch(`${API_CONFIG.url}/rest/v1/novedades?id=eq.${id}`, {
          method: 'DELETE',
          headers: API_CONFIG.headers
        });

        if (response.ok) {
          setProyecto(prev => ({
            ...prev,
            novedades: prev.novedades.filter(n => n.id !== id)
          }));
          Swal.fire({
            title: 'Eliminada',
            text: 'La novedad fue eliminada correctamente.',
            icon: 'success',
            ...SWAL_CONFIG
          });
        } else {
          throw new Error('Error al eliminar');
        }
      } catch (error) {
        console.error('Error al eliminar novedad:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo eliminar la novedad.',
          icon: 'error',
          ...SWAL_CONFIG
        });
      }
    }
  };

  // Calcular porcentaje mostrado
  const porcentajeAutomatico = calcularPorcentajeAutomatico();
  const porcentajeMostrado = proyecto?.porcentaje_manual ? porcentajeManual : porcentajeAutomatico;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        <span className="ml-3 text-gray-700">Cargando proyecto...</span>
      </div>
    );
  }

  if (!proyecto) {
    return (
      <div className="max-w-md mx-auto mt-12 p-4">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <FiInfo className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                El proyecto solicitado no existe o no está disponible.
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate(-1)}
          className={`${styles.buttonSecondary} mt-4 flex items-center`}
        >
          <FiArrowLeft className="mr-2" /> Volver a proyectos
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="pt-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto pb-8">
        {/* Header del proyecto */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className={`${styles.buttonSecondary} flex items-center`}
          >
            <FiArrowLeft className="mr-2" /> Volver
          </button>
           
        </div>

        {/* Tarjeta de información del proyecto */}
        <div className={styles.card}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            {modoEdicion ? (
              <div className="w-full">
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleFormChange}
                  className={`${styles.input} text-2xl font-bold mb-3`}
                  placeholder="Nombre del proyecto"
                />
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleFormChange}
                  className={`${styles.input} min-h-[100px]`}
                  placeholder="Descripción del proyecto"
                />
              </div>
            ) : (
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{proyecto.nombre}</h1>
                <p className="text-gray-600 mt-2">{proyecto.descripcion}</p>
              </div>
            )}
            
            <div className="flex items-center space-x-3">
              {modoEdicion ? (
                <>
                  <button
                    onClick={guardarCambiosProyecto}
                    className={`${styles.buttonSuccess} flex items-center`}
                  >
                    <FiSave className="mr-2" /> Guardar
                  </button>
                  <button
                    onClick={() => setModoEdicion(false)}
                    className={`${styles.buttonDanger} flex items-center`}
                  >
                    <FiX className="mr-2" /> Cancelar
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setModoEdicion(true)}
                    className={`${styles.buttonPrimary} flex items-center`}
                  >
                    <FiEdit2 className="mr-2" /> Editar
                  </button>
                  <button
                    onClick={eliminarProyecto}
                    className={`${styles.buttonDanger} flex items-center`}
                  >
                    <FiTrash2 className="mr-2" /> Eliminar
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Fechas del proyecto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de inicio</label>
              {modoEdicion ? (
                <input
                  type="date"
                  name="fecha_inicio"
                  value={formData.fecha_inicio}
                  onChange={handleFormChange}
                  className={styles.input}
                />
              ) : (
                <p className="text-gray-600">
                  {proyecto.fecha_inicio ? new Date(proyecto.fecha_inicio).toLocaleDateString() : 'No especificada'}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha estimada</label>
              {modoEdicion ? (
                <input
                  type="date"
                  name="fecha_estimada"
                  value={formData.fecha_estimada}
                  onChange={handleFormChange}
                  className={styles.input}
                />
              ) : (
                <p className="text-gray-600">
                  {proyecto.fecha_estimada ? new Date(proyecto.fecha_estimada).toLocaleDateString() : 'No especificada'}
                </p>
              )}
            </div>
          </div>

          {proyecto.estado === ESTADOS_PROYECTO.CERRADO && proyecto.fecha_cierre && (
            <div className="flex items-center text-sm text-gray-500">
              <FiClock className="mr-2" />
              <span>Proyecto cerrado el {new Date(proyecto.fecha_cierre).toLocaleDateString()}</span>
            </div>
          )}
        </div>

        {/* Secciones de actividades y novedades */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="lg:col-span-1">
            <Actividades
              actividades={proyecto.actividades}
              onAddActividad={handleAddActividad}
              onSelectActividad={setActividadSeleccionada}
              proyectoCerrado={proyecto.estado === ESTADOS_PROYECTO.CERRADO}
            />
          </div>
          
          <div className="lg:col-span-1">
            <Novedades
              novedades={proyecto.novedades}
              onAddNovedad={handleAddNovedad}
              onDeleteNovedad={handleDeleteNovedad}
              proyectoCerrado={proyecto.estado === ESTADOS_PROYECTO.CERRADO}
            />
          </div>
        </div>

        {/* Panel de microactividades */}
        {actividadSeleccionada && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <Microactividades
                actividadSeleccionada={actividadSeleccionada}
                onCerrarPanel={() => setActividadSeleccionada(null)}
                estadosMicroactividad={ESTADOS_MICROACTIVIDAD}
                coloresEstado={COLORES_ESTADO}
                proyectoCerrado={proyecto.estado === ESTADOS_PROYECTO.CERRADO}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetalleProyecto;